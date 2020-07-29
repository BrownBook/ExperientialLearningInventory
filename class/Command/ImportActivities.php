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
use \Intern\ActivityImportFactory;
use \Intern\DepartmentFactory;
use \Intern\Internship;
use \Intern\StudentFactory;
use \Intern\DatabaseStorage;
use \Intern\Agency;
use \Intern\WorkflowStateFactory;

class ImportActivities {

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

        // Get all of the *validated* rows we're attempting to import based on the import id
        $importRows = ActivityImportFactory::getActivityImportValidRows($importId);

        if(sizeof($importRows) === 0){
            //var_dump('no valid rows');
            \NQ::simple('intern', \Intern\UI\NotifyUI::WARNING, 'There were no valididated activities to import. No activities could be imported from this upload.');
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ViewActivityImport&id=' . $importId);
        }

        //var_dump('Importing rows', $importRows);

        $db = PdoFactory::getPdoInstance();

        // Get the full list of all departments (to avoid querying over and over)
        $departments = DepartmentFactory::getAllDepartments();
        $deptObjects = array(); // Accumulate the DB objects we've used so far

        // Start a transaction
        $beginStmt = $db->beginTransaction();

        $count = 0;

        foreach($importRows as $row){
            // Create each new activity

            // Create the Student object
            $student = StudentFactory::getStudent($row['student_id'], $row['term']);

            // Set the term
            $term = $row['term'];

            // Create and save the new agency object
            $agency = new Agency($row['host_name']);
            DatabaseStorage::save($agency);

            // Get the location - Domestic vs international
            $location = 'domestic'; //TODO: handle importing international locations

            // Get the state
            $state = $row['host_state'];

            // Get the country
            $country = '';

            // Get the department object
            $deptIndex =  array_search($row['department_name'], array_column($departments, 'name')); // Search the array of associative arrays for the dept name we want
            $deptId = $departments[$deptIndex]['id']; // Use the array index to find the database id of the department for this activity

            if(isset($deptObjects[$deptId])){
                // We've already fetched this department object, just use the existing one
                $department = $deptObjects[$deptId];
            } else {
                // We don't have this dept yet, so go query the database
                $department = DepartmentFactory::getDepartmentById($deptId);
                $deptObjects[$deptId] = $department; // Store it for next time
            }

            // Create the new internship object
            $intern = new Internship($student, $term, $location, $state, $country, $department, $agency);

            $intern->setExperienceType($row['experience_type']);
            $intern->setLocationZipCode($row['host_zip_code']);

            // Set other defaults
            $intern->co_op = 0;
            $intern->background_check = 0;
            $intern->drug_check = 0;

            // Set the import ID on the internship, so we know where it came from
            $intern->setImportId($importId);

            // Setup the workflow state
            $workflowState = WorkflowStateFactory::getState('CompletedState');
            $intern->setState($workflowState);

            // Save it to the database
            $intern->save();

            // Update the imported activity with this internship id, so we can show its status
            // TODO


            $count++;
        }

        // Save the timestamp when we imported this dataset
        $updateImportQuery = 'UPDATE intern_import SET imported_timestamp = :unixTime WHERE id = :importId';
        $updateImportStmt = $db->prepare($updateImportQuery);
        $updateImportStmt->execute(array('unixTime'=> time(), 'importId' => $importId));

        // Commit the database transaction
        $commitStmt = $db->commit();

        // Redirect to the view page
        \NQ::simple('intern', \Intern\UI\NotifyUI::SUCCESS, "Successfully imported $count activities.");
        \NQ::close();
        \PHPWS_Core::reroute('index.php?module=intern&action=ViewActivityImport&id=' . $importId);
    }
}
