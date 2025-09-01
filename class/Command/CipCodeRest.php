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

use Intern\CipCodeProvider;

/** REST Controller for handling requests for CIP Codes (Classification of
 * Instruction Programs ).
 */
class CipCodeRest
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
        $provider = new CipCodeProvider();
        $cipCodes = $provider->getCipCodes();

        return json_encode($cipCodes);
    }

    public function post() {}

    public function delete() {}
}
