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

namespace Intern\Command;

use Intern\DataProvider\Major\MajorsProviderFactory;
use Intern\AcademicMajor;
use \Intern\PdoFactory;

class MajorsProgramsRest
{

    public function execute()
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                echo $this->get();
                exit;
            case 'POST':
                echo $this->post();
                exit;
            case 'PATCH':
                echo $this->patch();
                exit;
            default:
                header('HTTP/1.1 405 Method Not Allowed');
                throw new \Exception('Unsupported Method');
                exit;
        }
    }

    public function get()
    {
        $majorsList = MajorsProviderFactory::getProvider()->getMajors();
        $majors = $majorsList->getAllMajors();

        return json_encode($majors);
    }

    public function post()
    {
        if (!\Current_User::isDeity()) {
            header('HTTP/1.1 403 Forbidden');
            echo json_encode(array('error' => 'You do not have permission to create majors.'));
            exit;
        }

        $input = file_get_contents('php://input');
        $inputJSON = json_decode($input, TRUE); //convert JSON into array

        $majorsProvider = MajorsProviderFactory::getProvider();

        $major = new AcademicMajor($inputJSON['code'], $inputJSON['name'], $inputJSON['level'], $inputJSON['cipCode'], null, 0);

        $majorsProvider->createMajor($major);

        return json_encode($major);
    }

    // NB: Does not support updating the 'code' field, as this is the primary key
    // TODO: Maybe this should be in the MajorsProvider class instead?
    public function patch()
    {
        if (!\Current_User::isDeity()) {
            header('HTTP/1.1 403 Forbidden');
            echo json_encode(array('error' => 'You do not have permission to update majors.'));
            exit;
        }

        $db = PdoFactory::getPdoInstance();

        $data = json_decode(file_get_contents('php://input'), true);

        $values = array(
            'description' => $data['description'],
            'level' => $data['level']['code'],
            'cipCode' => $data['cip_code'],
            'code' => $data['code'],
        );

        $updateQuery = 'UPDATE intern_major SET description = :description, level = :level, cip_code = :cipCode WHERE code = :code';
        $updateStmt = $db->prepare($updateQuery);

        try {
            $updateStmt->execute($values);
        } catch (\PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
            exit;
        }
    }

    public function delete() {}
}
