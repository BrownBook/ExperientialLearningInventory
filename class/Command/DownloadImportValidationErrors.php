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

use \Intern\ActivityImportFactory;

class DownloadImportValidationErrors {

    public function execute()
    {
        // Check permissions
        if(!\Current_User::allow('intern', 'internship_import')){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'You do not have permission to import student data.');
            \NQ::close();
            \PHPWS_Core::home();
            return;
        }

        if(!isset($_REQUEST['import_id'])){
            \NQ::simple('intern', \Intern\UI\NotifyUI::ERROR, 'The import id was missing. Try selecting an import from the import list below.');
            \NQ::close();
            \PHPWS_Core::reroute('index.php?module=intern&action=ShowImportActivitiesStart');
            return;
        }

        // Get the import ID
        $importId = $_REQUEST['import_id'];

        // Get all of the *invalid* rows we're attempting to import based on the import id
        $invalidRows = ActivityImportFactory::getActivityImportInvalidRows($importId);

        //var_dump($invalidRows);exit;

        // Get the metadata to generate a filename from the import name
        $metaData = ActivityImportFactory::getActivityImport($importId);
        $filename = preg_replace('/\s+/', '-', $metaData[0]['name']) . '-validation-errors.csv';

        header('Content-Type: application/csv');
        header('Content-Disposition: attachment; filename="'.$filename.'";');

        // open the "output" stream
        // see http://www.php.net/manual/en/wrappers.php.php#refsect2-wrappers.php-unknown-unknown-unknown-descriptioq
        $f = fopen('php://output', 'w');

        foreach ($invalidRows as $line) {
            unset($line['validated_on']);
            fputcsv($f, $line);
        }

        exit;
    }
}
