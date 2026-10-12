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
 * Copyright 2026 Brown Book Software
 */

namespace Intern;

/**
 * Represents the different degree levels.
 * @author Jeremy Booker
 * @author Brown Book Software
 * @package Intern
 */
class DegreeLevel
{
    // TODO: Use an enum for this instead of a class with constants, once PHP 8.1 is available on the server.
    const UNDERGRAD = 'ugrad';
    const GRADUATE  = 'grad';
    const DOCTORAL  = 'doctoral';

    const LEVELS = array(self::UNDERGRAD, self::GRADUATE, self::DOCTORAL);
}
