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

namespace Intern\UI;

use Intern\InternSettings;

/**
 * TopUI
 *
 * @author Robert Bost <bostrt at tux dot appstate dot edu>
 */
class TopUI implements UI
{
    public function display(){
    }

    public static function plug()
    {
        $settings = InternSettings::getInstance();

        $tpl = array();
        $tpl['HOME_LINK']    = \PHPWS_Text::moduleLink('Menu', 'intern');
        $tpl['ADD_LINK']     = \PHPWS_Text::moduleLink('Add Student', 'intern', array('action' => 'ShowInternship'));
        $tpl['SEARCH_LINK']  = \PHPWS_Text::moduleLink('Search', 'intern', array('action' => 'search'));

        $tpl['SYSTEM_NAME'] = $settings->getSystemName();

        $tpl['HELP_ADDRESS'] = $settings->getHelpEmailAddress();

        $auth = \Current_User::getAuthorization();

        // If the user is a local user, show the dropdown with link to "my page" so they can change their password
        if($auth->user->auth_script == 'local.php'){
            $tpl['PASSWORD_DROPDOWN_NAME'] = \Current_User::getDisplayName();;
        }else {
            // Otherwise, it's just their name with no dropdown menu
            $tpl['USER_FULL_NAME'] = \Current_User::getDisplayName();
        }

        $tpl['LOGOUT_URI'] = $auth->logout_link;


        $adminOptions = array();

        // Edit list of majors
        if(\Current_User::allow('intern', 'edit_major')){
            $adminOptions['EDIT_MAJORS_LINK'] = \PHPWS_Text::secureLink('Edit Majors','intern',array('action' => 'showEditMajors'), null, null, 'dropdown-item');
        }

        // Edit departments
        if(\Current_User::allow('intern', 'edit_dept')){
            $adminOptions['EDIT_DEPARTMENTS_LINK'] = \PHPWS_Text::secureLink('Edit Departments','intern',array('action' => 'showEditDept'), null, null, 'dropdown-item');
        }

        // Edit list of states
        if(\Current_User::allow('intern', 'edit_states')){
            $adminOptions['EDIT_STATES_LINK'] = \PHPWS_Text::secureLink('Edit States','intern',array('action' => 'edit_states'), null, null, 'dropdown-item');
        }

        // Edit list of student levels
        if(\Current_User::allow('intern', 'edit_level')){
            $adminOptions['EDIT_STUDENT_LEVEL'] = \PHPWS_Text::secureLink('Edit Student Levels','intern',array('action' => 'edit_level'), null, null, 'dropdown-item');

        }
        // Edit terms
        if(\Current_User::allow('intern', 'edit_terms')){
            $adminOptions['EDIT_TERMS_LINK'] = \PHPWS_Text::secureLink('Edit Terms','intern',array('action' => 'edit_terms'), null, null, 'dropdown-item');
        }

        // Link to the Affiliation Agreements
        if(\Current_User::allow('intern', 'affiliation_agreement')){
            $adminOptions['AFFIL_AGREE_LINK'] = \PHPWS_Text::secureLink('Affiliation Agreements','intern',array('action' => 'showAffiliateAgreement'), null, null, 'dropdown-item');
        }

        // Edit list of 'normal' courses
        if(\Current_User::allow('intern', 'edit_courses')){
            $adminOptions['EDIT_COURSES_LINK'] = \PHPWS_Text::secureLink('Edit Course List','intern',array('action' => 'edit_courses'), null, null, 'dropdown-item');
        }

        if(\Current_User::allow('intern', 'student_import')){
            $adminOptions['STUDENT_IMPORT'] = \PHPWS_Text::secureLink('Import Student Data', 'intern', array('action' => 'ShowStudentImport'), null, null, 'dropdown-item');
        }

        if(\Current_User::allow('intern', 'internship_import')){
            $adminOptions['ACTIVITY_IMPORT'] = \PHPWS_Text::secureLink('Import Activities', 'intern', array('action' => 'ShowImportActivitiesStart'), null, null, 'dropdown-item');
        }

        if(\Current_User::isDeity()){
            $adminOptions['CONTROL_PANEL']         = \PHPWS_Text::secureLink('Control Panel','controlpanel', null, null, null, 'dropdown-item');
            $adminOptions['ADMIN_SETTINGS']        = \PHPWS_Text::secureLink('Admin Settings','intern',array('action' => 'showAdminSettings'), null, null, 'dropdown-item');
            $adminOptions['EDIT_ADMINS_LINK']      = \PHPWS_Text::secureLink('Edit Administrators','intern',array('action' => 'showEditAdmins'), null, null, 'dropdown-item');
        }

        // If any admin options were added, them show the dropdown and merge those
        // links into the main set of template tags
        if(sizeof($adminOptions) > 0){
            $tpl['ADMIN_OPTIONS'] = ''; // dummy var to show dropdown menu in template
            $tpl = array_merge($tpl, $adminOptions);
        }

        \Layout::plug(\PHPWS_Template::process($tpl, 'intern', 'top.tpl'), 'NAV_LINKS');
    }
}
