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

use \Intern\PdoFactory;

class ActivityImportFactory {


    public static function getActivityImport($importId)
    {
        // Get a PDO connection
        $db = PdoFactory::getPdoInstance();

        $importMetadataQuery = 'SELECT * FROM intern_import WHERE id = :id';
        $metadataStmt = $db->prepare($importMetadataQuery);
        $metadataStmt->execute(array('id' => $importId));

        return $metadataStmt->fetchAll(\PDO::FETCH_ASSOC);
    }


    public static function getActivityImportRows($importId)
    {
        // Get a PDO connection
        $db = PdoFactory::getPdoInstance();

        $importDataQuery = 'SELECT * FROM intern_import_activity where import_id = :id';
        $importDataStmt = $db->prepare($importDataQuery);
        $importDataStmt->execute(array('id' => $importId));

        return $importDataStmt->fetchAll(\PDO::FETCH_ASSOC);
    }


    public static function getActivityImportValidRows($importId)
    {
        // Get a PDO connection
        $db = PdoFactory::getPdoInstance();

        $importDataQuery = "SELECT * FROM intern_import_activity WHERE
                                import_id = :id AND
                                validated_on IS NOT NULL AND
                                validation_errors = ''";
        $importDataStmt = $db->prepare($importDataQuery);
        $importDataStmt->execute(array('id' => $importId));

        return $importDataStmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public static function getActivityImportInvalidRows($importId)
    {
        // Get a PDO connection
        $db = PdoFactory::getPdoInstance();

        $importDataQuery = "SELECT * FROM intern_import_activity WHERE
                                import_id = :id AND
                                validation_errors != ''";
        $importDataStmt = $db->prepare($importDataQuery);
        $importDataStmt->execute(array('id' => $importId));

        return $importDataStmt->fetchAll(\PDO::FETCH_ASSOC);
    }

}
