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

class UploadActivities {

    const expectedRowOrder = array(
        'Student ID',
        'First Name',
        'Last Name',
        'Term',
        'Level',
        'Experience Type',
        'Host State',
        'Department',
        'Host Agency',
        'Host Agency Zip Code'
    );

    public function execute()
    {
        // Check permissions
        if(!\Current_User::allow('intern', 'internship_import')){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'You do not have permission to import student data.');
            \NQ::close();
            \PHPWS_Core::home();
            return;
        }

        // Check that a file was selected
        if(sizeof($_FILES) !== 1){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'Please select a file to upload.');
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowImportActivitiesStart');
        }

        $fileInfo = $_FILES['internshipDataFile'];

        // Check that there wasn't an upload error
        if($fileInfo['error'] == 1){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'There was an error while sending the file to the server. No data was imported.');
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowImportActivitiesStart');
        }

        // Check that the type is correct
        if($fileInfo['type'] !== 'text/csv'){

            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, "The file we uploaded appears to be the wrong type ({$fileInfo['type']}). Please select a Comma Separated Values (.csv) file.");
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowImportActivitiesStart');
        }

        $destinationFilePath = PHPWS_SOURCE_DIR . 'files/activityDataImport/';
        $destFileName = 'activityDataImport-' . date('Y-m-d-G-i-s') . '.csv';
        $destinationFullFileName = $destinationFilePath . $destFileName;

        // Create the activityDataImport directory, if it doesn't exist
        if(!file_exists($destinationFilePath)){
            mkdir($destinationFilePath, 0700);
        }

        // Move file to its save storage location
        move_uploaded_file($fileInfo['tmp_name'], $destinationFullFileName);

        // Open file handle to the file after it has been moved
        $fileHandle = fopen($destinationFullFileName, 'r');

        // Read the first line
        $firstLine = fgetcsv($fileHandle);

        // Check that the column order matches
        if(!self::checkColumnOrder($firstLine)){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'The file we uploaded appears to have the wrong column order. Please check the columns and try again.');
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'Columns in uploaded file: ' . implode(',', $firstLine));
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'Expected column order: ' . implode(',', self::expectedRowOrder));
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowImportActivitiesStart');
        }

        $db = PdoFactory::getPdoInstance();

        // Start a transaction
        $beginStmt = $db->beginTransaction();

        // Create the import table entry
        $insertQuery = 'INSERT INTO intern_import (id, name, uploaded_timestamp, uploaded_by)
                            VALUES (
                                nextval(\'intern_import_seq\'),
                                :name,
                                :uploaded_timestamp,
                                :uploaded_by
                            )';
        $insertStmt = $db->prepare($insertQuery);
        $params = array('name' => $_REQUEST['uploadName'],
                        'uploaded_timestamp' => time(),
                        'uploaded_by' => \Current_User::getUsername());
        $insertStmt->execute($params);

        // Get the ID of the row we just created
        $importId = $db->lastInsertId();

        $insertQuery = 'INSERT INTO intern_import_activity (
                            id,
                            import_id,
                            row_num,
                            student_id,
                            first_name,
                            last_name,
                            term,
                            level,
                            experience_type,
                            host_name,
                            host_state,
                            department_name,
                            host_zip_code
                        )
                        VALUES (
                            nextval(\'intern_import_activity_seq\'),
                            :import_id,
                            :row_num,
                            :student_id,
                            :first_name,
                            :last_name,
                            :term,
                            :level,
                            :experience_type,
                            :host_name,
                            :host_state,
                            :department_name,
                            :host_zip_code
                        )';
        $insertStmt = $db->prepare($insertQuery);

        // This row counter is intended to match the actual row number
        // from the source csv file that was uploaded
        $rowNumber = 2;
        while(($row = fgetcsv($fileHandle)) !== false) {
            $params = array();

            $params['import_id']    = $importId;
            $params['row_num']      = $rowNumber;
            $params['student_id']   = trim($row[0]);
            $params['first_name']   = trim($row[1]);
            $params['last_name']    = trim($row[2]);
            $params['term']         = trim($row[3]);
            $params['level']        = trim($row[4]);
            $params['experience_type']  = trim($row[5]);
            $params['host_state']       = trim($row[6]);
            $params['department_name']  = trim($row[7]);
            $params['host_name']        = trim($row[8]);
            $params['host_zip_code']    = trim($row[9]);

            $rowNumber++;

            $insertStmt->execute($params);
        }

        // Commit the database transaction
        $commitStmt = $db->commit();

        // Add a success message
        \NQ::simple('intern', \Intern\UI\NotifyUI::SUCCESS, 'Student data uploaded successfully!');
        \NQ::close();

        // Redirect to the controller for viewing the uploaded data
        \PHPWS_Core::reroute('index.php?module=intern&action=ViewActivityImport&id=' . $importId);
    }

    private function checkColumnOrder(Array $row){

        for($i = 0; $i < sizeof(self::expectedRowOrder); $i++){
            if(self::expectedRowOrder[$i] !== trim($row[$i])){
                return false;
            }
        }

        return true;
    }
}
