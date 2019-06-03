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
 * Copyright 2019 Brown Book Software
 */

namespace Intern\Command;

use \Intern\ActivityImportView;
use \Intern\ActivityImportFactory;

class ViewActivityImport {

    public function execute()
    {
        // Check permissions
        if(!\Current_User::allow('intern', 'internship_import')){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'You do not have permission to import student data.');
            \NQ::close();
            \PHPWS_Core::home();
            return;
        }

        // Check that an import id was supplied
        if(!isset($_REQUEST['id'])){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'The import id was missing. Try selecting an import from the import list below.');
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowImportActivitiesStart');
            return;
        }

        $importId = $_REQUEST['id'];

        $importMetadata = ActivityImportFactory::getActivityImport($importId);

        $importData = ActivityImportFactory::getActivityImportRows($importId);

        if(sizeof($importData) <= 0){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'The import id was not found. Try selecting an import from the import list below.');
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowImportActivitiesStart');
            return;
        }

        $view = new ActivityImportView($importMetadata[0], $importData);

        return $view;
    }

}
