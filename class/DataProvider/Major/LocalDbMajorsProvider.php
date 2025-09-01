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
 * Copyright 2011-2018 Appalachian State University
 * Copyright 2025 Brown Book Software
 */

namespace Intern\DataProvider\Major;

use Intern\AcademicMajorList;
use Intern\AcademicMajor;
use Intern\PdoFactory;

class LocalDbMajorsProvider extends MajorsProvider
{

    /**
     * Returns an array of AcademicMajor objects for the given term.
     *
     * @return AcademicMajorList
     */
    public function getMajors(): AcademicMajorList
    {
        $db = PdoFactory::getPdoInstance();

        $stmt = $db->prepare('SELECT * FROM intern_major LEFT OUTER JOIN intern_cip_codes ON intern_major.cip_code = intern_cip_codes.cip_code ORDER BY description ASC');
        $stmt->execute();
        $stmt->setFetchMode(\PDO::FETCH_ASSOC);

        $results = $stmt->fetchAll();

        $majorsList = new AcademicMajorList();

        foreach ($results as $row) {
            $majorsList->addMajor(new AcademicMajor($row['code'], $row['description'], $row['level'], $row['cip_code'], $row['cip_title'], $row['hidden']));
        }

        return $majorsList;
    }

    /**
     * Returns a single AcademicMajor object for the given major code, or null if not found
     * @return AcademicMajor|null
     */
    public function getMajorByCode(string $code): ?AcademicMajor
    {
        $db = PdoFactory::getPdoInstance();

        $stmt = $db->prepare('SELECT * FROM intern_major LEFT OUTER JOIN intern_cip_codes ON intern_major.cip_code = intern_cip_codes.cip_code WHERE code = :code');
        $stmt->execute(['code' => $code]);
        $stmt->setFetchMode(\PDO::FETCH_ASSOC);

        $row = $stmt->fetch();

        if ($row) {
            return new AcademicMajor($row['code'], $row['description'], $row['level'], $row['cip_code'], $row['cip_title'], $row['hidden']);
        } else {
            return null;
        }
    }

    /**
     * Creates a new major
     */
    public function createMajor(AcademicMajor $major)
    {
        $db = PdoFactory::getPdoInstance();

        // Check for existing major with same code
        $stmt = $db->prepare("SELECT count(*) FROM intern_major WHERE code = :code");
        $stmt->execute(array('code' => $major->getCode()));
        $count = $stmt->fetchColumn();
        if ($count > 0) {
            throw new \Exception('A major with that code already exists.');
        }

        // Check for existing major with same description and level
        $stmt = $db->prepare("SELECT count(*) FROM intern_major WHERE description = :description AND level = :level");
        $stmt->execute(array('description' => $major->getDescription(), 'level' => $major->getLevel()));
        $count = $stmt->fetchColumn();
        if ($count > 0) {
            throw new \Exception('A major with that description and level already exists.');
        }

        $stmt = $db->prepare("INSERT INTO intern_major VALUES (
                                            nextval('intern_major_seq'),
                                            :code,
                                            :description,
                                            :level,
                                            :isHidden,
                                            :cipCode
                                        )");

        $values = array(
            "code" => $major->getCode(),
            "description" => $major->getDescription(),
            "level" => $major->getLevel(),
            "isHidden" => $major->isHidden() ? 1 : 0,
            "cipCode" => $major->getCipCode()
        );

        $stmt->execute($values);
    }

    /**
     * Updates an existing major
     * NB: Does not allow updating the major code
     * TODO: Check that the major code exists before trying to update
     * @throws \Exception if a major with the same description and level already exists
     */
    public function updateMajor(AcademicMajor $major)
    {
        $db = PdoFactory::getPdoInstance();

        // Check for existing major with same description and level, but *not* a matching code
        $stmt = $db->prepare("SELECT count(*) FROM intern_major WHERE code != :code AND description = :description AND level = :level");
        $stmt->execute(array('code' => $major->getCode(), 'description' => $major->getDescription(), 'level' => $major->getLevel()));
        $count = $stmt->fetchColumn();
        if ($count > 0) {
            throw new \Exception('A major with that description and level already exists.');
        }

        $stmt = $db->prepare("UPDATE intern_major SET
                                        description = :description,
                                        level = :level,
                                        hidden = :isHidden,
                                        cip_code = :cipCode
                                    where code = :code");

        $values = array(
            "code" => $major->getCode(),
            "description" => $major->getDescription(),
            "level" => $major->getLevel(),
            "isHidden" => $major->isHidden() ? 1 : 0,
            "cipCode" => $major->getCipCode()
        );

        // var_dump($values);
        // exit;

        $stmt->execute($values);

        return $major;
    }
}
