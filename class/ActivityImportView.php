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

namespace Intern;

class ActivityImportView {

    private $importMetadata;
    private $importData;

    public function __construct(Array $importMetadata, Array $importData)
    {
        $this->importMetadata = $importMetadata;
        $this->importData = $importData;
    }

    public function display()
    {
        $tpl = array();

        $tpl['IMPORT_NAME'] = $this->importMetadata['name'];
        $tpl['UPLOADED_DATE'] = date('F j, Y g:i a', $this->importMetadata['uploaded_timestamp']);
        $tpl['UPLOADED_BY'] = $this->importMetadata['uploaded_by'];
        $tpl['IMPORT_ID'] = $this->importMetadata['id'];

        $rows = array();

        $numValidRows = 0;

        foreach($this->importData as $rowData) {

            if($rowData['validation_errors'] == ''){
                $numValidRows++;
            }

            $rowTags = array(
                'ROW_NUM' => $rowData['row_num'],
                'STUDENT_ID' => $rowData['student_id'],
                'FIRST_NAME' => $rowData['first_name'],
                'LAST_NAME' => $rowData['last_name'],
                'TERM' => $rowData['term'],
                'LEVEL' => $rowData['level'],
                'EXPERIENCE_TYPE' => $rowData['experience_type'],
                'HOST_NAME' => $rowData['host_name'],
                'HOST_STATE' => $rowData['host_state'],
                'DEPARTMENT_NAME' => $rowData['department_name'],
                'VALIDATION_ERRORS' => $rowData['validation_errors']
            );

            if($rowData['validation_errors'] === ''){
                $rowTags['VALIDATION_GREEN_CHECK'] = '';
            }

            $rows[] = $rowTags;
        }

        $tpl['uploaded_rows'] = $rows;

        if($this->importMetadata['validated_on'] !== null && $numValidRows > 0){
            $tpl['SHOW_IMPORT_BUTTON'] = '';
        }

        // If there were errors, show the download button
        if($numValidRows < sizeof($this->importData)){
            $tpl['SHOW_DOWNLOAD_BUTTON'] = '';
        }

        return \PHPWS_Template::process($tpl, 'intern', 'activityImport.tpl');
    }
}
