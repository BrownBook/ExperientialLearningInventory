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

use \Intern\PdoFactory;
use \Intern\ActivityImportView;

use \Intern\ActivityImportFactory;
use \Intern\TermFactory;
use \Intern\Internship;
use \Intern\State;
use \Intern\DepartmentFactory;
use \Intern\Student;
use \Intern\StudentFactory;

use \Intern\Exception\StudentNotFoundException;



class ValidateActivityImport {

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
        if(!isset($_REQUEST['import_id'])){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'The import id was missing. Try selecting an import from the import list below.');
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowImportActivitiesStart');
            return;
        }

        // Get the import ID
        $importId = $_REQUEST['import_id'];

        // Get all the rows we're attempting to import based on the import id
        $importRows = ActivityImportFactory::getActivityImportRows($importId);

        $unixTimestamp = time();

        $db = PdoFactory::getPdoInstance();

        // Get the set of valid terms
        $terms = array_keys(TermFactory::getTermsAssoc());

        // Get the set of valid experiences types
        $expTypes = array_keys(Internship::getTypesAssoc());

        // Get the lsit of host states
        $states = array_keys(State::$UNITED_STATES);
        array_shift($states); // Remove the -1 => "Select..." option

        // Get the list of department names
        $departments = DepartmentFactory::getAllDepartments();
        // Extract just the department name
        $departmentNames = array();
        foreach ($departments as $dept) {
            $departmentNames[] = $dept['name'];
        }


        // Check each row in this import
        foreach($importRows as $row){
            //var_dump($row);

            $validationIssues = array();

            // Check the student ID
            $student = null;
            try {
                $student = StudentFactory::getStudent($row['student_id'], $row['term']);
            }catch(StudentNotFoundException $e){
                $validationIssues[] = "Unknown student ID: {$row['student_id']}";
            }

            // Check term code
            if(!in_array($row['term'], $terms)){
                $validationIssues[] = "Unknown/invalid term code: {$row['term']}";
            }

            // Check level
            if(!in_array($row['level'], Student::LEVELS)){
                $validationIssues[] = "Unknown/invalid level: {$row['level']}";
            }

            // Check experience type
            if(!in_array($row['experience_type'], $expTypes)){
                $validationIssues[] = "Unknown/invalid experience type: {$row['experience_type']}";

            }

            // Check host name (not empty)
            if($row['host_name'] === ''){
                $validationIssues[] = 'Missing host name';
            }

            // Check host state (is valid state abbreviation)
            if(!in_array($row['host_state'], $states)){
                $validationIssues[] = 'Invalid host state abbreviation. Should be two upper-case letters.';
            }

            // Department Name (Is a valid department name)
            if(!in_array($row['department_name'], $departmentNames)){
                $validationIssues[] = 'Unknown department name: ' . $row['department_name'];
            }

            // Set the row as validated or list the issues
            if(sizeof($validationIssues) == 0){
                // Row is valid
                // Will clear any previous validation errors, if any
                $validRowStmt = $db->prepare('UPDATE intern_import_activity SET validated_on = :now, validation_errors = \'\' WHERE id = :id AND import_id = :import_id');
                $validRowStmt->execute(array('id' => $row['id'], 'import_id' => $row['import_id'], 'now' => $unixTimestamp));
            } else {
                // Row is invalid
                $validationString = implode(', ', $validationIssues);

                $invalidRowStmt = $db->prepare('UPDATE intern_import_activity SET validation_errors = :validationError WHERE id = :id AND import_id = :import_id');
                $invalidRowStmt->execute(array('id' => $row['id'], 'import_id' => $row['import_id'], 'validationError' => $validationString));
            }
        }


        $importUpdateStmt = $db->prepare('UPDATE intern_import SET validated_on = :currTime where id = :id');
        $importUpdateStmt->execute(array('id' => $importId, 'currTime' => $unixTimestamp));

        \PHPWS_Core::reroute('index.php?module=intern&action=ViewActivityImport&id=' . $_REQUEST['import_id']);
    }
}
