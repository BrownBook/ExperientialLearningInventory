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
                        class,
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
                        country,
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
                        :class,
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
                        :country
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
                            class = :class,
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
                            country = :country,
                            confidential = :confidential
                        WHERE student_id = :studentId';

        $insertStmt = $db->prepare($insertQuery);
        $updateStmt = $db->prepare($updateQuery);

        while(($row = fgetcsv($fileHandle)) !== false) {
            $params = array();

            $params['studentId']    = $row[0];
            $params['firstName']    = $row[1];
            $params['preferredName'] = $row[2];
            $params['middleName']   = $row[3];
            $params['lastName']     = $row[4];
            $params['gender']       = $row[5];
            //$params['statusDesc']   = $row[6];

            if(trim($row[6]) === ''){
                $creditHours = 0;
            } else {
                $creditHours = $row[6];
            }
            $params['creditHours']  = $creditHours;

            $params['address']      = $row[7];
            $params['address2']     = $row[8];
            $params['city']         = $row[9];
            $params['state']        = $row[10];
            $params['country']      = $row[11];
            $params['zip']          = $row[12];
            $params['email']        = $row[13];

            $emailParts = explode("@", $row[13]);
            $params['username'] = $emailParts[0];

            $params['phone']        = '';
            $params['majorCode']    = $row[14];
            //$params['programDescription']   = $row[15];
            $params['majorDesc']    = $row[16];
            $params['level']        = $row[17];
            $params['class']        = $row[18];

            $params['gpa']          = $row[19];
            if($params['gpa'] == '') {
                $params['gpa'] = 0;
            }

            // Hard coded vales, these fields not being imported yet
            $params['campus']           = 'main_campus';
            $params['confidential']     = 'N';

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
            'First Name',
            'Preferred First Name',
            'Middle Name',
            'Last Name',
            'Gender',
            //'Status Desc',
            'Registered Credits',
            'Street Line 1',
            'Street Line 2',
            'City',
            'State',
            'Country',
            'ZIP',
            'Email Address',
            //'PHONE_NUMBER_COMBINED',
            'Program',
            'Program Desc',
            'Major Desc',
            'Student Level',
            'Student Classification',
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
