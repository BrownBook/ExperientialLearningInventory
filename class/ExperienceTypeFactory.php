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
 * Copyright 2020 Brown Book Software
 */

namespace Intern;
use \phpws2\Database;

class ExperienceTypeFactory {

    public static function getExperienceByCode($key)
    {

    }

    public static function getExperienceTypesAssoc()
    {
        $db = Database::newDB();
        $pdo = $db->getPDO();

        $stmt = $pdo->prepare("SELECT * FROM intern_exp_type");
        $stmt->setFetchMode(\PDO::FETCH_ASSOC);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    public static function getExperienceTypesKeyPair()
    {
        $db = Database::newDB();
        $pdo = $db->getPDO();

        $stmt = $pdo->prepare("SELECT code, short_name FROM intern_exp_type");
        $stmt->setFetchMode(\PDO::FETCH_KEY_PAIR);
        $stmt->execute();

        return $stmt->fetchAll();
    }
}
