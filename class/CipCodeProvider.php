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
 * Copyright 2025 Brown Book Software
 */

namespace Intern;

use \Intern\PdoFactory;

class CipCodeProvider
{

    /**
     * Returns an array of CIP codes as associative arrays with keys 'cip_family', 'cip_code', and 'cip_title'
     * @return array
     */
    public static function getCipCodes(): array
    {
        $db = PdoFactory::getPdoInstance();

        $cipQuery = 'SELECT cip_family, cip_code, cip_title FROM intern_cip_codes ORDER BY cip_code ASC';
        $cipStmt = $db->prepare($cipQuery);
        $cipStmt->execute();

        $cipCodes = $cipStmt->fetchAll(\PDO::FETCH_ASSOC);

        return $cipCodes;
    }

    /**
     * Returns a single CIP code as an associative array with keys 'cip_family', 'cip_code', and 'cip_title',
     * or null if not found
     * @return array|null
     */
    public static function getCipCodeByCode(string $code): ?array
    {
        $db = PdoFactory::getPdoInstance();

        $cipQuery = 'SELECT cip_family, cip_code, cip_title FROM intern_cip_codes WHERE cip_code = :code';
        $cipStmt = $db->prepare($cipQuery);
        $cipStmt->execute(array('code' => $code));

        $cipCode = $cipStmt->fetch(\PDO::FETCH_ASSOC);

        return $cipCode ?: null;
    }
}
