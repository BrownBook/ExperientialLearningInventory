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
 * Copyright 2025-2026 Brown Book Software
 */

namespace Intern\Command;

use Intern\DataProvider\Major\MajorsProviderFactory;
use Intern\TermFactory;
use Intern\Level;

/**
 * GetUndergradMajors
 *
 * This class is responsible for fetching the list of undergraduate majors from the database.
 * It uses the MajorsProviderFactory to get the available majors and returns them in JSON format.
 *
 * @package Intern\Command
 */
class GetUndergradMajors
{

    public function execute()
    {
        $terms = TermFactory::getAvailableTerms();

        // If no terms are available, return an empty array
        if (empty($terms)) {
            echo json_encode(array());
            exit;
        }

        $majorsList = MajorsProviderFactory::getProvider()->getMajorsByDegreeLevel(Level::UNDERGRAD);

        $majorsArray = $majorsList->getAllMajors();

        $defaultValue = new \StdClass();
        $defaultValue->code = '-1';
        $defaultValue->description = 'Select Undergradate Major';

        $majorsList = array_merge(array($defaultValue), $majorsArray);

        echo json_encode($majorsList);
        exit;
    }
}
