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
use Intern\CipCodeProvider;
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

        try {
            $majorsProvider->createMajor($major);
        } catch (\PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(array('errorMessage' => 'Database error: ' . $e->getMessage()));
            exit;
        } catch (\Exception $e) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(array('errorMessage' => $e->getMessage()));
            exit;
        }

        return json_encode($major);
    }

    // NB: Does not support updating the 'code' field, as this is the primary key
    // TODO: Check for invalid CIP codes and handle appropriately since we don't (yet) use a dropdown menu
    public function patch()
    {
        if (!\Current_User::isDeity()) {
            header('HTTP/1.1 403 Forbidden');
            echo json_encode(array('errorMessage' => 'You do not have permission to update majors.'));
            exit;
        }

        $inputJSON = json_decode(file_get_contents('php://input'), true);

        $majorsProvider = MajorsProviderFactory::getProvider();

        // Fetch the existing major to ensure it exists
        $existingMajor = $majorsProvider->getMajorByCode($inputJSON['code']);

        if ($existingMajor === null) {
            header('HTTP/1.1 404 Not Found');
            echo json_encode(array('errorMessage' => 'No major found with that code.'));
            exit;
        }

        // Check that the CIP code exists
        if (!isset($inputJSON['cip_code'])) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(array('errorMessage' => 'The CIP code field is required.'));
            exit;
        }

        $cipCode = CipCodeProvider::getCipCodeByCode($inputJSON['cip_code']);
        if ($cipCode === null && !empty($inputJSON['cip_code'])) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(array('errorMessage' => 'Invalid CIP code.'));
            exit;
        }

        $updatedMajor = new AcademicMajor(
            $inputJSON['code'],
            $inputJSON['description'],
            $inputJSON['level'],
            $inputJSON['cip_code'],
            '',
            $inputJSON['hidden']
        );

        try {
            $majorsProvider->updateMajor($updatedMajor);
        } catch (\PDOException $e) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(array('errorMessage' => 'Database error: ' . $e->getMessage()));
            exit;
        } catch (\Exception $e) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(array('errorMessage' => $e->getMessage()));
            exit;
        }

        return json_encode($updatedMajor);
    }

    public function delete() {}
}
