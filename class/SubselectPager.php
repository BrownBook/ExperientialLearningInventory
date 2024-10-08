<?php
/**
 * This file is part of Internship Inventory.
 *
 * Internship Inventory is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * Internship Inventory is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Internship Inventory.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright 2011-2018 Appalachian State University
 */

namespace Intern;
use \PHPWS_Core;
use \PHPWS_Error;
use \PHPWS_DB;
use \Icon;
use \DBPager;
use \PHPWS_Template;
use \Exception;


\PHPWS_Core::initCoreClass('DBPager.php');

// Defines are set in parent class

/**
 * An extension of the DBPager class which supports Subselects.
 *
 * @package Intern
 */
class SubselectPager extends \DBPager {

    public function __construct($table, $class=null)
    {
        parent::__construct($table, $class);

        // Replace the db instance with an instance of SubselectDatabase
        $this->db = new SubselectDatabase($table);
    }

    /**
     * Returns the content of the the pager object
     */
    public function get($return_blank_results=true)
    {
        $template = array();

        if (empty($this->display_rows)) {
            $result = $this->initialize();
            if (PHPWS_Error::isError($result)) {
                throw new \Exception ($result->toString());
                return $result;
            }
        }

        // Report ends the function call
        if ($this->report_type && $this->report_row) {
            $this->createReport();
            exit();
        }

        if (!isset($this->module)) {
            return PHPWS_Error::get(DBPAGER_MODULE_NOT_SET, 'core', 'DBPager::get');
        }

        if (!isset($this->template)) {
            return PHPWS_Error::get(DBPAGER_TEMPLATE_NOT_SET, 'core', 'DBPager::get');
        }

        $rows = $this->getPageRows();

        if (PHPWS_Error::isError($rows)) {
            throw new \Exception($rows);
            return $rows;
        }

        if (isset($this->toggles)) {
            $max_tog = count($this->toggles);
        }

        $count = 0;
        $this->getNavigation($template);
        $this->getSortButtons($template);

        if (isset($rows)) {
            foreach ($rows as $rowitem) {
                if (isset($max_tog)) {
                    if ($max_tog == 1) {
                        if ($count % 2) {
                            $rowitem['TOGGLE'] = $this->toggles[0];
                        } else {
                            $rowitem['TOGGLE'] = null;
                        }
                        $count++;
                    } else {
                        $rowitem['TOGGLE'] = $this->toggles[$count];
                        $count++;

                        if ($count >= $max_tog) {
                            $count = 0;
                        }
                    }
                } else {
                    $rowitem['TOGGLE'] = null;
                }

                $template['listrows'][] = $rowitem;
            }
        } elseif (!$return_blank_results) {
            return null;
        } else {
            $template['EMPTY_MESSAGE'] = $this->empty_message;
        }

        DBPager::plugPageTags($template);
        $this->final_template = & $template;
        return PHPWS_Template::process($template, $this->module, $this->template);
    }

    /**
     * Pulls the appropriate rows from the database.
     *
     * This function pulls the database information then plugs
     * the data it gets into the object.
     * @modified Eloi George
     */
    public function initialize($load_rows=true)
    {
        $order_set = false;
        $this->table_columns = $this->db->getTableColumns();

        if (!empty($this->needed_columns)) {
            if(isset($this->table_columns)){
                $this->table_columns = array_merge($this->table_columns, $this->needed_columns);
            }else{
                $this->table_columns = $this->needed_columns;
            }
        }

        // If true, determine which report type to use
        if ($this->report_type) {
            $report = true;
            if ($this->report_type == XML_FULL || $this->report_type == CSV_FULL) {
                $full_report = true;
            } else {
                $full_report = false;
            }
        } else {
            // No report requested
            $report = false;
            $full_report = false;
        }


        if (empty($this->cache_identifier)) {
            $this->cache_identifier = $this->template;
        }

        if (empty($this->limit) && empty($this->orderby) &&
                empty($this->search) && isset($_SESSION['DB_Cache'][$this->module][$this->cache_identifier])) {
            extract($_SESSION['DB_Cache'][$this->module][$this->cache_identifier]);
            $this->limit = $limit;
            $this->orderby = $orderby;
            $this->orderby_dir = $orderby_dir;
            $this->search = $search;
            $this->current_page = $current_page;
        }

        // What would be setting $this->error??
        if (isset($this->error)) {
            return $this->error;
        }

        // Repalce space characters in search string with pipes?
        if ($this->search) {
            $search = preg_replace('/\s/', '|', $this->search);
        } else {
            $search = null;
        }

        /*
        if (!empty($this->sub_result)) {
            foreach ($this->sub_result as $sub_table => $sub) {
                if (!$sub['tbl']) {
                    //$this->db->addTable($sub['jt'], $sub_table);
                    //$this->db->addJoin('left', $this->table, $sub_table, $sub['sc'], $sub['jc']);
                }

                if (!empty($search)) {
                    if ($sub['srch']) {
                        $col = $sub_table . '.' . $sub['cc'];
                        $this->db->addWhere($col, $search, 'regexp', 'or', 1);
                    }
                }
            }
        }
        */

        // Add a 'where' clause to the application for search string
        if (!$full_report && !empty($search) && isset($this->searchColumn)) {
            foreach ($this->searchColumn as $column_name) {
                $this->db->addWhere($column_name, $search, 'regexp', 'or', 1);
            }
        }

        $count = $this->getTotalRows();

        //**************************************/
        //$this->db->setTestMode();
    	//var_dump($this->db->select());exit;
    	//**************************************/

        if (PHPWS_Error::isError($count)) {
            throw new \Exception($count->toString());
        }

        /*
        $this->db->setDistinct(true);
        if (!empty($this->sub_result)) {
            $this->db->addColumn('*');
            foreach ($this->sub_result as $sub_table => $sub) {
                if ($sub['tbl']) {
                    $this->db->addColumn($sub['tbl'] . '.' . $sub['cc'], null, $sub['nn']);
                } else {
                    $this->db->addColumn($sub_table . '.' . $sub['cc'], null, $sub['nn']);
                }
            }
        }
        */

        if (empty($this->limit)) {
            if ($this->default_limit) {
                $this->limit = $this->default_limit;
            } else {
                $this->limit = DBPAGER_DEFAULT_LIMIT;
            }
        }

        if (!$full_report && $this->limit > 0) {
            $this->db->setLimit($this->getLimit());
        }

        if (!$full_report) {
            $this->total_rows = & $count;
            $this->total_pages = ceil($this->total_rows / $this->limit);

            if ($this->current_page > $this->total_pages || $this->current_page == 'last') {
                $this->current_page = $this->total_pages;
                $this->db->setLimit($this->getLimit());
            }
        }

        // If a column name to order by has been set, then add the 'order by' clause
        if (isset($this->orderby)) {

            // Find the column name
            if ($pos = strpos($this->orderby, '.')) {
                $col_name = substr($this->orderby, $pos + 1);
            } else {
                $col_name = $this->orderby;
            }

            // Check for "sub order" (??)
            if (isset($this->sub_order[$col_name]) && !empty($this->sub_order[$col_name])) {
                $orderby = implode('.', $this->sub_order[$col_name]);
            } else {
                $orderby = $this->orderby;
            }

            $orderby = $this->orderby;

            $this->db->resetOrder();
            $this->db->addOrder($orderby . ' ' . $this->orderby_dir);
            $order_set = true;
        }

        if (!$order_set && isset($this->default_order)) {
            $this->db->addOrder($this->default_order . ' ' . $this->default_order_dir);
        }

        if (!$load_rows) {
            return true;
        }

        if (empty($this->class)) {
            $result = $this->db->select();
        } else {
            $result = $this->db->getObjects($this->class);
        }
        $this->row_query = $this->db->lastQuery();
        if (PHPWS_Error::isError($result)) {
            return $result;
        }
        $this->display_rows = & $result;

        if ($this->cache_queries) {
            $cache['limit'] = $this->limit;
            $cache['orderby'] = $this->orderby;
            $cache['orderby_dir'] = $this->orderby_dir;
            $cache['search'] = $this->search;
            $cache['current_page'] = $this->current_page;

            $_SESSION['DB_Cache'][$this->module][$this->cache_identifier] = $cache;
        } else {
            $this->clearQuery();
        }

        return true;
    }

    //TODO: Why is this recursive?
    public function getTotalRows()
    {
        /**
         * if total_column is set, use it to get total rows
         */
        if ($this->total_column) {
            // Save the order, columns, groupby
            $order = $this->db->order;
            $columns = $this->db->columns;
            $group_by = $this->db->group_by;

            // Reset them
            $this->db->group_by = null;
            $this->db->order    = null;
            $this->db->columns  = null;

            // Add the $total_column and get a count
            $this->db->addColumn($this->total_column, null, null, true, true);
            $result = $this->db->count();

            // Restore the columns, order, and groupby
            $this->db->columns = $columns;
            $this->db->order = $order;
            $this->db->group_by = $group_by;

            return $result;
        } else {
            /**
             * If total_column is not set check number of tables
             */
            if (count($this->db->tables) > 1) {
                /**
                 * if more than one table, go through each and look for an index.
                 * if an index is found, set it as the total_column and recursively
                 * call this function.
                 */
                foreach ($this->db->tables as $table) {
                    if ($index = $this->db->getIndex($table)) {
                        $this->total_column = $table . '.' . $index;
                        return $this->getTotalRows();
                    }
                }

                /**
                 * An index could not be found, use full count method to return
                 * row count.
                 */
                return $this->fullRowCount();
            } else {
                return $this->fullRowCount();
            }
        }
    }

    public function getError()
    {
        return $this->error;
    }

    public function disableSearchLabel()
    {
        $this->search_label = false;
    }

    /**
     * This function allows you to join the results of two tables in db pager.
     * Example: I want to join the title in table2 to the results of table_1. I also want
     * the column to be named 't1_title'.
     *
     * table_1             table2
     * ---------------      ----------------
     * t2_id               id    title
     *
     * $pager->joinResult('t2_id', 'table2', 'id', 'title', 't2_title');
     *
     * You do not need to give a new name or make it searchable. You DO need to make sure
     * your source object contains the variable your are joining. (e.g. $this->t2_title must exist)
     *
     */
    public function joinResult($source_column, $join_table, $join_column, $content_column, $new_name=null, $searchable=false)
    {
        // TODO: this will break if you have more than one db pager at a time
        // TODO: make this a private member variable
        static $join_match = null;
        static $index = 1;
        $copy = null;

        // If this join was done previously, don't repeat it.
        // We store the last table used from the copy
        if (isset($join_match[$join_table])) {
            $join_array = & $join_match[$join_table];

            if ($join_array['jt'] == $join_table &&
                    $join_array['sc'] == $source_column &&
                    $join_array['jc'] == $join_column) {
                $tbl_idx = $join_array['tbl_idx'];
                $copy = 'dbp' . $tbl_idx;
            }
        } else {
            $tbl_idx = $index;
        }

        if ($searchable) {
            $this->sub_search = true;
        }

        if (empty($new_name)) {
            $new_name = $content_column;
        }

        $this->sub_result['dbp' . $index] = array('sc' => $source_column,
            'jt' => $join_table,
            'jc' => $join_column,
            'cc' => $content_column,
            'nn' => $new_name,
            'srch' => (bool) $searchable,
            'tbl' => $copy);

        $this->sub_order[$new_name] = array('dbp' . $tbl_idx, $content_column);
        $this->needed_columns[$new_name] = $new_name;

        $join_match[$join_table] = array('jt' => $join_table,
            'sc' => $source_column,
            'jc' => $join_column,
            'idx' => $index,
            'tbl_idx' => $tbl_idx);
        $index++;
    }

    public function loadSearch($search)
    {
        if (UTF8_MODE) {
            $preg = '/[^\w\s\pL]/u';
        } else {
            $preg = '/[^\w\s]/u';
        }
        $search = preg_replace($preg, '', trim($search));
        $search = preg_replace('/\s{2,}/', ' ', $search);
        $this->search = & $search;
    }

    public function loadLink()
    {
        $this->link = \PHPWS_Core::getCurrentUrl(true, false);
    }

    public function setAnchor($anchor)
    {
        $this->anchor = $anchor;
    }

    public function getAnchor()
    {
        if (empty($this->anchor)) {
            return null;
        } else {
            return '#' . $this->anchor;
        }
    }

    /**
     * Sets the default order for the pager. If only_if_empty is true
     * then a sort can overwrite the direction.
     */
    public function setOrder($column, $direction='asc', $only_if_empty=false)
    {
        if ($only_if_empty && !empty($this->orderby)) {
            return;
        }
        $this->orderby = preg_replace('/[^\w\.]/', '', $column);
        if (!preg_match('/asc|desc/i', $direction)) {
            $direction = 'asc';
        }
        $this->orderby_dir = $direction;
    }

    public function setDefaultOrder($default_order, $direction='asc')
    {
        if (preg_match('/\W/', $default_order)) {
            return false;
        }
        $this->default_order = $default_order;
        if ($direction != 'asc' && $direction != 'desc') {
            return false;
        }
        $this->default_order_dir = $direction;
        return true;
    }

    public function setDefaultLimit($limit)
    {
        $this->default_limit = (int) $limit;
    }

    public function setSearch()
    {
        $args = func_get_args();

        if (sizeof($args) == 1 && is_array($args[0])) {
            $col_list = $args[0];
        } else {
            $col_list = $args;
        }

        foreach ($col_list as $column) {
            if (UTF8_MODE) {
                $preg = '/[^\.\w\pL]/u';
            } else {
                $preg = '/[^\.\w]/u';
            }

            if (!preg_match($preg, $column) && $this->db->isTableColumn($column)) {
                $this->searchColumn[] = $column;
            }
        }
    }

    public function setPageTurnerLeft($turner)
    {
        $this->page_turner_left = $turner;
    }

    public function setPageTurnerRight($turner)
    {
        $this->page_turner_right = $turner;
    }

    public function setLimitList($list)
    {
        if (!is_array($list)) {
            return false;
        }

        $this->limitList = $list;
    }

    public function addToggle($toggle)
    {
        $this->toggles[] = $toggle;
    }

    public function setLink($link)
    {
        $this->link = $link;
    }

    public function getLinkQuery()
    {
        return substr(strstr($this->link, '?'), 1);
    }

    public function getLinkBase()
    {
        return str_replace(strstr($this->link, '?'), '', $this->link);
    }

    public function setModule($module)
    {
        $this->module = $module;
    }

    public function setTemplate($template)
    {
        $this->template = $template;
    }

    /**
     * Allows the developer to add extra or processes row tags
     *
     */
    public function addRowTags()
    {
        $method = func_get_arg(0);

        if (empty($this->class)) {
            return false;
        }

        if (func_num_args() < 1) {
            return false;
        }

        if (version_compare(phpversion(), '5.0.0', '<')) {
            $method = strtolower($method);
        }

        if (func_num_args() > 1) {
            $variables = func_get_args();
            //strip the method
            array_shift($variables);
        } else {
            $variables = null;
        }

        $this->row_tags = array('method' => $method, 'variable' => $variables);
    }

    public function setReportRow($report_row)
    {
        $this->report_row = $report_row;
    }

    public function setEmptyMessage($message)
    {
        $this->empty_message = $message;
    }

    public function addToggleFunction($function, $toggle=2)
    {
        if (empty($function) || $toggle < 2) {
            return false;
        }

        $this->toggle_func_number = (int) $toggle;

        if (is_string($function) && function_exists($function)) {
            $this->toggle_function = $function;
            return true;
        } elseif (is_array($function) && class_exists($function[0])) {
            if (version_compare(phpversion(), '5.0.0', '<')) {
                $method = strtolower($function[1]);
            } else {
                $method = & $function[1];
            }

            if (in_array($method, get_class_methods($function[0]))) {
                $this->toggle_function = $function;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * Adds a function or static method call to pager
     */
    public function addRowFunction($function)
    {
        if (is_string($function) && function_exists($function)) {
            $this->run_function = $function;
            return true;
        } elseif (is_array($function) && class_exists($function[0])) {
            if (version_compare(phpversion(), '5.0.0', '<')) {
                $method = strtolower($function[1]);
            } else {
                $method = & $function[1];
            }

            if (in_array($method, get_class_methods($function[0]))) {
                $this->run_function = $function;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function addRunMethod($method)
    {
        if (!in_array(strtolower($method), $this->_methods)) {
            return;
        }

        $this->run_methods[] = $method;
    }

    public function addWhere($column, $value, $operator=null, $conj=null, $group=null)
    {
        return $this->db->addWhere($column, $value, $operator, $conj, $group);
    }

    public function addPageTags($tags)
    {
        $this->page_tags = $tags;
    }

    public function getLimit()
    {
        if (empty($this->limit) || !in_array($this->limit, $this->limitList)) {
            $this->limit = $this->limitList[sizeof($this->limitList)-1];
        }

        $start = ($this->current_page - 1) * $this->limit;

        return array((int) $this->limit, (int) $start);
    }

    public function setTotalColumn($column)
    {
        if (!strstr($column, '.')) {
            $table = $this->db->getTable();
            if ($table) {
                $this->total_column = $table . '.' . trim($column);
            }
        } else {
            $this->total_column = trim($column);
        }
    }

    /**
     * Calls a count on *. Less reliable than counting on one column.
     * A fallback method for getTotalRows
     */
    public function fullRowCount()
    {
        $this->db->setDistinct(true);
        $order = $this->db->order;
        $columns = $this->db->columns;
        $group_by = $this->db->group_by;
        $this->db->columns = null;
        $result = $this->db->select('count');
        $this->db->columns = $columns;
        $this->db->order = $order;
        $this->db->group_by = $group_by;
        return $result;
    }

    public function getRows()
    {
        return $this->display_rows;
    }


    public function getPageLinks()
    {
        if ($this->total_pages < 1) {
            $current_page = $total_pages = 1;
        } else {
            $current_page = $this->current_page;
            $total_pages = $this->total_pages;
        }

        if ($total_pages == 1) {
            return '[1]';
        }

        $values = $this->getLinkValues();
        unset($values['pg']);

        $module = $values['module'];
        unset($values['module']);

        $anchor = $this->getAnchor();
        if ($anchor) {
            $values['#'] = $anchor;
        }

        // page one
        if ($current_page != 1) {
            if ($total_pages > 500 && $current_page > 50) {
                $values['pg'] = $current_page - 50;
                $pageList = array();
                $pageList[] = \PHPWS_Text::moduleLink('&lt;&lt;&lt;', $module, $values, null, _('Back 50 pages'));
            }

            if ($total_pages > 100 && $current_page > 10) {
                $values['pg'] = $current_page - 10;
                $pageList[] = \PHPWS_Text::moduleLink('&lt;&lt;', $module, $values, null, _('Back 10 pages'));
            }
            $values['pg'] = $current_page - 1;
            $pageList[] = \PHPWS_Text::moduleLink('&lt;', $module, $values, null, _('Back one page'));
            $values['pg'] = 1;
            $pageList[] = \PHPWS_Text::moduleLink('1', $module, $values, null, _('First page'));
        } else {
            $pageList[] = '[1]';
        }


        if ($total_pages > DBPAGER_PAGE_LIMIT) {
            // break up pages
            $divider = floor(DBPAGER_PAGE_LIMIT / 2);
            if ($current_page <= $divider) {
                $divider = DBPAGER_PAGE_LIMIT - 2;
                if ($current_page != 1) {
                    $divider--;
                    for ($i = 2; $i < $current_page; $i++) {
                        if ($i != $current_page) {
                            $values['pg'] = 1;
                            $pageList[] = \PHPWS_Text::moduleLink($i, $module, $values, null, sprintf(_('Go to page %s'), $i));
                        } else {
                            $pageList[] = "[$current_page]";
                        }
                        $divider--;
                    }
                }
                $remaining_pages = $total_pages - $current_page;
                $skip = floor($remaining_pages / $divider);

                for ($i = 0, $j = $current_page + $skip; $i < $divider; $i++, $j += $skip) {
                    $values['pg'] = $j;
                    $pageList[] = \PHPWS_Text::moduleLink($j, $module, $values, null, sprintf(_('Go to page %s'), $j));
                }
            } else {
                $beginning_pages = $current_page - 1;
                $remaining_pages = $total_pages - $current_page;

                if ($remaining_pages < $divider) {
                    if (!$remaining_pages) {
                        $divider *= 2;
                        $front_skip = floor($total_pages / (DBPAGER_PAGE_LIMIT - 1));
                        $back_skip = 0;
                    } else {
                        $divider += $remaining_pages;
                        $front_skip = floor($beginning_pages / $divider);
                        $back_skip = 1;
                    }
                } else {
                    $front_skip = round($beginning_pages / $divider);
                    $back_skip = round($remaining_pages / $divider);
                }
                for ($i = 0, $j = 1 + $front_skip; $i < $divider - 1 && $j < $current_page; $i++, $j += $front_skip) {
                    $values['pg'] = $j;
                    $pageList[] = \PHPWS_Text::moduleLink($j, $module, $values, null, sprintf(_('Go to page %s'), $j));
                }

                $pageList[] = "[$current_page]";

                if ($back_skip) {
                    for ($i = 0, $j = $current_page + $back_skip; $i < $divider - 1 && $j < $total_pages; $i++, $j += $back_skip) {
                        $values['pg'] = $j;
                        $pageList[] = \PHPWS_Text::moduleLink($j, $module, $values, null, sprintf(_('Go to page %s'), $j));
                    }
                }
            }
        } else {
            for ($i = 2; $i < $total_pages; $i++) {
                if ($i == $current_page) {
                    $pageList[] = "[$i]";
                } else {
                    $values['pg'] = $i;
                    $pageList[] = \PHPWS_Text::moduleLink($i, $module, $values, null, sprintf(_('Go to page %s'), $i));
                }
            }
        }

        if ($total_pages != $current_page) {
            $values['pg'] = $total_pages;
            $pageList[] = \PHPWS_Text::moduleLink($total_pages, $module, $values, null, _('Last page'));

            $values['pg'] = $current_page + 1;
            $pageList[] = \PHPWS_Text::moduleLink('&gt;', $module, $values, null, _('Forward one page'));

            if ($total_pages > 100 && ($total_pages - 10) >= $current_page) {
                $values['pg'] = $current_page + 10;
                $pageList[] = \PHPWS_Text::moduleLink('&gt;&gt;', $module, $values, null, _('Forward 10 pages'));
            }

            if ($total_pages > 500 && ($total_pages - 50) >= $current_page) {
                $values['pg'] = $current_page + 50;
                $pageList[] = \PHPWS_Text::moduleLink('&gt;&gt;&gt;', $module, $values, null, _('Forward 50 pages'));
            }
        } else {
            $pageList[] = "[$current_page]";
        }

        return implode(' ', $pageList);
    }

    /**
     * Returns the sorting buttons for table columns
     */
    public function getSortButtons(&$template)
    {
        if (empty($this->table_columns)) {
            return null;
        }

        if ($this->auto_sort) {
            $sort_columns = & $this->table_columns;
        } else {
            $sort_columns = array_keys($this->sort_headers);
        }

        //test($sort_columns);

        foreach ($sort_columns as $varname) {
            $values = $this->getLinkValues();

            if (isset($this->sort_headers[$varname])) {
                if (!empty($this->sort_headers[$varname]['hover'])) {
                    $alt = strip_tags($this->sort_headers[$varname]['hover']) . ' - ';
                } else {
                    $alt = strip_tags($this->sort_headers[$varname]['title']) . ' - ';
                }
            } else {
                $alt = '';
            }

            if (isset($values['module'])) {
                $module = $values['module'];
                unset($values['module']);
            } else {
                $module = & $this->module;
            }

            $anchor = $this->getAnchor();
            if ($anchor) {
                $values['#'] = $anchor;
            }

            $buttonname = str_replace('.', '_', $varname) . '_SORT';

            $values['orderby'] = $varname;

            if ($this->orderby == $varname) {
                if ($this->orderby_dir == 'desc') {
                    unset($values['orderby_dir']);
                    unset($values['orderby']);
                    $alt .= _('Sorted in descending order');
                    $button = Icon::get('sort-down');
                } elseif ($this->orderby_dir == "asc") {
                    $alt .= _('Sorted in ascending order');
                    $values['orderby_dir'] = 'desc';
                    $button = Icon::get('sort-up');
                } else {
                    $alt .= _('Unsorted');
                    $button = Icon::get('sort');
                    $values['orderby_dir'] = 'asc';
                }
                $button->setStyle('margin-right : 5px');
                $button->setAlt($alt);
            } else {
                $alt .= _('Unsorted');
                $button = Icon::get('sort');
                $button->setStyle('margin-right : 5px');
                $button->setAlt($alt);
                $values['orderby_dir'] = 'asc';
            }

            $button_string = $button->__toString();

            if (isset($this->sort_headers[$varname])) {
                $button_string .= $this->sort_headers[$varname]['title'];
            }

            $link = \PHPWS_Text::moduleLink($button_string, $module, $values, null, $alt);

            $template[strtoupper($buttonname)] = $link;
        }

        //var_dump($template);exit;

        return $template;
    }

    public function addSortHeader($header, $title, $hover=null)
    {
        $this->sort_headers[$header]['title'] = $title;
        $this->sort_headers[$header]['hover'] = $hover;
    }

    public function getLinkValues()
    {
        $output = null;
        if (isset($GLOBALS['DBPager_Link_Values'])) {
            return $GLOBALS['DBPager_Link_Values'];
        }

        if (empty($this->limit)) {
            $this->limit = DBPAGER_DEFAULT_LIMIT;
        }

        $values = array();
        $values['pg'] = $this->current_page;
        $values['limit'] = $this->limit;

        if (!empty($this->search)) {
            $values['pager_search'] = $this->search;
        }

        if (isset($this->orderby)) {
            $values['orderby'] = $this->orderby;
            if (isset($this->orderby_dir))
                $values['orderby_dir'] = $this->orderby_dir;
        }

        // pull get values from link setting
        if (!empty($this->link)) {
            $url = parse_url($this->link);
            if (isset($url['query'])) {
                parse_str(str_replace('&amp;', '&', $url['query']), $output);
            }
        }

        // pull any extra values in current url
        $extra = \PHPWS_Text::getGetValues();
        $search_val = & $extra['search'];
        if (UTF8_MODE) {
            $preg = '/[^\w\s\pL]/u';
        } else {
            $preg = '/[^\w\s]/u';
        }

        $search_val = preg_replace($preg, '', is_null($search_val) ? '' : $search_val);
        $search_val = preg_replace('/\s/', '+', is_null($search_val) ? '' : $search_val);

        // if extra values exist, add them to the values array
        // ignore matches in the output and other values
        if (!empty($extra)) {
            if ($output) {
                $diff = array_diff_key($extra, $output);
            } else {
                $diff = $extra;
            }

            $diff = array_diff_assoc($diff, $values);

            $values = array_merge($diff, $values);
        }

        if ($output) {
            $values = array_merge($output, $values);
        }

        // prevents a doubling of the value in the page form
        unset($values['change_page']);
        unset($values['pager_c_search']);
        // Don't need the Go button from search to be carried along
        unset($values['go']);

        if (empty($values['module'])) {
            $values['module'] = $this->module;
        }

        $GLOBALS['DBPager_Link_Values'] = $values;

        return $values;
    }

    function getReportLink()
    {
        $values = $this->getLinkValues();
        $module = $values['module'];
        unset($values['module']);

        if ($this->allow_partial_report) {
            $values['dbprt'] = 'csva';
            $all = \PHPWS_Text::moduleLink(_('All'), $module, $values, null, _('Download a complete CSV file'));

            $values['dbprt'] = 'csvp';
            $part = \PHPWS_Text::moduleLink(_('Partial'), $module, $values, null, _('Download a partial CSV file'));

            return sprintf(_('CSV Report - %s | %s'), $all, $part);
        } else {
            $values['dbprt'] = 'csva';
            return \PHPWS_Text::moduleLink(_('CSV Report'), $module, $values, null, _('Download a complete CSV file'));
        }
    }

    public function getLimitList()
    {
        $values = $this->getLinkValues();
        unset($values['limit']);

        if (isset($values['module'])) {
            $module = $values['module'];
            unset($values['module']);
        } else {
            $module = & $this->module;
        }

        $anchor = $this->getAnchor();
        if ($anchor) {
            $values['#'] = $anchor;
        }

        $links = array();
        foreach ($this->limitList as $limit) {
            if ($limit == $this->limit) {
                $links[] = $limit;
            } else {
                $values['limit'] = & $limit;
                $links[] = \PHPWS_Text::moduleLink($limit, $module, $values, null, sprintf(_('Limit results to %s rows'), $limit));
            }
        }

        return implode(' ', $links);
    }

    /**
     * Pulls variables from the object results. Calls object's formatting function if
     * specified.
     */
    public function getPageRows()
    {
        $template = null;
        $count = 0;

        if (!isset($this->display_rows)) {
            return null;
        }

        foreach ($this->display_rows as $disp_row) {
            if (!empty($this->convert_date)) {
                foreach ($this->convert_date as $key => $format) {
                    if ($this->class && isset($disp_row->$key)) {
                        $disp_row->$key = date($format, $disp_row->$key);
                    } elseif (isset($disp_row[$key])) {
                        $disp_row[$key] = date($format, $disp_row[$key]);
                    }
                }
            }
            if (isset($this->class) && isset($this->run_methods)) {
                foreach ($this->run_methods as $run_function) {
                    call_user_func(array($disp_row, $run_function));
                }
            }

            if (isset($this->class)) {
                foreach ($this->_class_vars as $varname) {
                    $template[$count][strtoupper($varname)] = $disp_row->$varname;
                }

                if (!empty($this->row_tags)) {
                    if (!in_array($this->row_tags['method'], $this->_methods)) {
                        return PHPWS_Error::get(DBPAGER_NO_METHOD, 'core', 'DBPager::getPageRows', $this->class . ':' . $this->row_tags['method']);
                    }

                    if (empty($this->row_tags['variable'])) {
                        $row_result = call_user_func(array($disp_row, $this->row_tags['method']));
                    } else {
                        $row_result = call_user_func_array(array($disp_row, $this->row_tags['method']), $this->row_tags['variable']);
                    }

                    if (!empty($row_result) && is_array($row_result)) {
                        $template[$count] = array_merge($template[$count], $row_result);
                    }
                }
            } else {
                foreach ($disp_row as $key => $value) {
                    $template[$count][strtoupper($key)] = $value;
                }

                if (isset($this->run_function)) {
                    $row_result = call_user_func($this->run_function, $disp_row);
                    if (!empty($row_result) && is_array($row_result)) {
                        $template[$count] = array_merge($template[$count], $row_result);
                    }
                }
            }

            if (isset($this->toggle_function)) {
                if (!($count % $this->toggle_func_number)) {
                    $row_result = call_user_func($this->toggle_function, $disp_row);
                    if (!empty($row_result)) {
                        $template[$count] = array_merge($template[$count], $row_result);
                    }
                }
            }

            $count++;
        }

        return $template;
    }

    /*
    public function getPageDrop()
    {
        if (empty($this->total_pages)) {
            $page_list[1] = 1;
        } else {
            for ($i = 1; $i <= $this->total_pages; $i++) {
                $page_list[$i] = $i;
            }
        }

        $form = new PHPWS_Form('page_list');
        $form->setMethod('get');
        $values = $this->getLinkValues();
        $form->addHidden($values);
        $form->addSelect('change_page', $page_list);
        $form->setExtra('change_page', 'onchange="this.form.submit()"');
        $form->setMatch('change_page', $this->current_page);

        if (!function_exists('javascriptEnabled') || !javascriptEnabled()) {
            $form->addSubmit('go', _('Go'));
        }

        $template = $form->getTemplate();

        if (PHPWS_Error::isError($template)) {
            PHPWS_Error::log($template);
            return null;
        }

        return implode("\n", $template);
    }*/

    public function getSearchBox()
    {
        static $id_count = 0;

        if ($id_count) {
            $id = 'search_list_' . $id_count;
        } else {
            $id = 'search_list';
            $id_count++;
        }

        $form = new \PHPWS_Form($id);
        $form->setMethod('get');
        $values = $this->getLinkValues();
        unset($values['pager_search']);
        unset($values['go']);
        $form->addHidden($values);
        $form->addText('pager_c_search', $this->search);
        $form->setSize('pager_c_search', 20);
        if ($this->search_label) {
            $form->setLabel('pager_c_search', _('Search'));
        }

        if ($this->clear_button) {
            $form->addButton('clear', _('Clear'));
            $form->setExtra('clear', 'onclick="this.form.search_list_pager_c_search.value=\'\'"');
        }

        if ($this->search_button) {
            $form->addSubmit('go', _('Search'));
        }

        $template = $form->getTemplate();
        if (PHPWS_Error::isError($template)) {
            PHPWS_Error::log($template);
            return null;
        }

        return implode("\n", $template);
    }

    function createReport()
    {
        if ($this->class) {
            $methods = get_class_methods($this->class);
            if (in_array($this->report_row, $methods)) {
                $func_type = 'method';
            }
        }

        if (!isset($func_type)) {
            if (function_exists($this->report_row)) {
                $func_type = 'function';
            } else {
                $func_type = 'none';
            }
        }

        $index_set = false;
        $tmp_file = \PHPWS_Text::randomString(10) . time();
        $directory = CACHE_DIRECTORY;
        $file_path = sprintf('%s/%s', $directory, $tmp_file);
        ;
        $fp = fopen($file_path, 'w');

        foreach ($this->display_rows as $foo) {
            if ($func_type == 'method') {
                $result = call_user_func(array($foo, $this->report_row));
            } elseif ($func_type == 'function') {
                $result = call_user_func($this->report_row, $foo);
            } else {
                if (is_object($foo)) {
                    $result = PHPWS_Core::stripObjValues($foo);
                } else {
                    $result = & $foo;
                }
            }

            if (!$index_set) {
                $index_keys = array_keys($result);
                $row = fputcsv($fp, $index_keys);
                $index_set = true;
            }
            fputcsv($fp, $result);
            //$row = self::formatCSVRow($result);
            //fwrite($fp, $row);
        }

        fclose($fp);

        $new_file = time() . '_pager.csv';
        require_once 'HTTP/Download.php';
        $dl = new \HTTP_Download;
        $dl->setFile($file_path);
        $dl->setContentDisposition(HTTP_DOWNLOAD_ATTACHMENT, $new_file);
        $dl->setContentType('text/csv');
        $dl->send();
        exit();
    }

    public function getFinalTemplate()
    {
        return $this->final_template;
    }

    public function plugPageTags(&$template)
    {
        if (isset($this->page_tags)) {
            foreach ($this->page_tags as $key => $value)
                $template[$key] = $value;
        }
    }

    public function saveLastView()
    {
        $_SESSION['DBPager_Last_View'][$this->table] = PHPWS_Core::getCurrentUrl();
    }

    public static function getLastView($table)
    {
        if (isset($_SESSION['DBPager_Last_View'][$table])) {
            return $_SESSION['DBPager_Last_View'][$table];
        } else {
            return null;
        }
    }

    public function convertDate($column_name, $format='%c')
    {
        $this->convert_date[$column_name] = $format;
    }

    public function clearQuery()
    {
        if (isset($_SESSION['DB_Cache'])) {
            unset($_SESSION['DB_Cache'][$this->module][$this->template]);
        }
    }

    public function cacheQueries($cache=true)
    {
        $this->cache_queries = (bool) $cache;
    }

    public function setCacheIdentifier($str)
    {
        $this->cache_identifier = $str;
    }

    // What is auto sort??
    public function setAutoSort($auto)
    {
        $this->auto_sort = (bool) $auto;
    }

    public function allowPartialReport($val)
    {
        $this->allow_partial_report = (bool) $val;
    }

}
