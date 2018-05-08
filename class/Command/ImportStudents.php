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
 * Copyright 2018 Brown Book Software
 */

namespace Intern\Command;

use \Intern\PdoFactory;

class ImportStudents {

    public function execute()
    {
        // Check permissions
        if(!\Current_User::allow('intern', 'student_import')){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'You do not have permission to import student data.');
            \NQ::close();
            \PHPWS_Core::home();
            return;
        }

        // Check that a file was selected
        if(sizeof($_FILES) !== 1){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'Please select a file to upload.');
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowStudentImport');
        }

        $fileInfo = $_FILES['studentDataFile'];

        // Check that there wasn't an upload error
        if($fileInfo['error'] == 1){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'There was an error while sending the file to the server. No data was imported.');
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowStudentImport');
        }

        // Check that the type is correct
        if($fileInfo['type'] !== 'text/csv'){

            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, "The file we uploaded appears to be the wrong type ({$fileInfo['type']}). Please select a Comma Separated Values (.csv) file.");
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowStudentImport');
        }

        //var_dump($_FILES);

        $destinationFilePath = PHPWS_SOURCE_DIR . 'files/studentDataImport/';
        $destFileName = 'studentDataImport-' . date('Y-m-d-G-i-s') . '.csv';
        $destinationFullFileName = $destinationFilePath . $destFileName;

        //var_dump($destinationFilePath);

        // Create the studentDataImport directory, if it doesn't exist
        if(!file_exists($destinationFilePath)){
            mkdir($destinationFilePath, 0700);
        }

        // Move file to its save storage location
        move_uploaded_file($fileInfo['tmp_name'], $destinationFullFileName);

        // Open file handle to the file after it has been moved
        $fileHandle = fopen($destinationFullFileName, 'r');

        // Read the first line
        $firstLine = fgetcsv($fileHandle);

        if(!self::checkColumnOrder($firstLine)){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'The file we uploaded appears to have the wrong column order. Please check the columns and try again.');
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowStudentImport');
        }

        // Get a PDO connection
        $db = PdoFactory::getPdoInstance();

        $insertQuery = 'INSERT INTO intern_local_student_data (
                        student_id,
                        user_name,
                        email,
                        first_name,
                        middle_name,
                        last_name,
                        preferred_name,
                        gender,
                        level,
                        campus,
                        gpa,
                        credit_hours,
                        major_code,
                        major_description,
                        phone,
                        address,
                        address2,
                        city,
                        state,
                        zip,
                        confidential
                    ) VALUES (
                        :studentId,
                        :username,
                        :email,
                        :firstName,
                        :middleName,
                        :lastName,
                        :preferredName,
                        :gender,
                        :level,
                        :campus,
                        :gpa,
                        :creditHours,
                        :majorCode,
                        :majorDesc,
                        :phone,
                        :address,
                        :address2,
                        :city,
                        :state,
                        :zip,
                        :confidential
                    )';

        $updateQuery = 'UPDATE intern_local_student_data SET
                            user_name = :username,
                            email = :email,
                            first_name = :firstName,
                            middle_name = :middleName,
                            last_name = :lastName,
                            preferred_name = :preferredName,
                            gender = :gender,
                            level = :level,
                            campus = :campus,
                            gpa = :gpa,
                            credit_hours = :creditHours,
                            major_code = :majorCode,
                            major_description = :majorDesc,
                            phone = :phone,
                            address = :address,
                            address2 = :address2,
                            city = :city,
                            state = :state,
                            zip = :zip,
                            confidential = :confidential
                        WHERE student_id = :studentId';

        $insertStmt = $db->prepare($insertQuery);
        $updateStmt = $db->prepare($updateQuery);

        while(($row = fgetcsv($fileHandle)) !== false) {
            $params = array();

            $params['studentId']    = $row[0];
            $params['firstName']    = $row[1];
            $params['middleName']   = $row[2];
            $params['lastName']     = $row[3];
            $params['gender']       = $row[4];
            $params['address']      = $row[5];
            $params['address2']     = $row[6];
            $params['city']         = $row[7];
            $params['state']        = $row[8];
            //$params['country'] = $row[9];
            $params['zip']          = $row[10];
            $params['email']        = $row[11];

            $emailParts = explode("@", $row[11]);
            $params['username'] = $emailParts[0];

            $params['phone']        = $row[12];
            $params['majorCode']    = $row[13];
            //$params['programDescription']   = $row[14];
            $params['majorDesc']    = $row[15];
            $params['level']        = $row[16];
            //$params['class']        = $row[17];

            $params['gpa']          = $row[18];
            if($params['gpa'] == '') {
                $params['gpa'] = 0;
            }

            // Hard coded vales, these fields not being imported yet
            $params['campus']           = 'main_campus';
            $params['confidential']     = 'N';
            $params['preferredName']    = '';
            $params['creditHours']      = 0;

            try {
                $insertStmt->execute($params);
            } catch(\Exception $e){
                // quietly ignore exceptions, we expect duplicate key violations
            }

            $updateStmt->execute($params);

        }

        \NQ::simple('intern', \Intern\UI\NotifyUI::SUCCESS, 'Student data imported successfully!');
        \NQ::close();
        \PHPWS_Core::reroute('index.php?module=intern&action=ShowStudentImport');
    }


    private function checkColumnOrder($row){
        $expectedRow = array(
            'ID',
            'FIRST NAME',
            'MIDDLE NAME',
            'LAST NAME',
            'GENDER',
            'STREET LINE 1',
            'STREET LINE 2',
            'CITY',
            'STATE',
            'COUNTRY',
            'ZIP',
            'EMAIL ADDRESS',
            'PHONE NUMBER',
            'PROGRAM',
            'PROGRAM DESC',
            'MAJOR DESC',
            'STUDENT LEVEL',
            'STUDENT CLASS',
            'GPA'
        );

        for($i = 0; $i < sizeof($expectedRow); $i++){
            if($expectedRow[$i] !== trim($row[$i])){
                return false;
            }
        }

        return true;
    }
}
