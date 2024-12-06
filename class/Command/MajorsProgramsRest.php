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
 * Copyright 2024 Brown Book Software
 */

namespace Intern\Command;

use Intern\DataProvider\Major\MajorsProviderFactory;
use Intern\TermFactory;
use Intern\AcademicMajor;

class MajorsProgramsRest
{

    public function execute()
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                echo $this->get();
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

    public function post() {}

    public function patch() {}

    public function delete() {}
}
