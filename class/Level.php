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
 */
 
namespace Intern;

/**
* Level
*
* Represents a level for student.
*
* @author Cydney Caldwell
*/

class Level {
    public $code;
    public $description;
    public $level;

    const UNDERGRAD = 'ugrad';
    const GRADUATE  = 'grad';

    /**
    * Returns this objects database code
    * @return varchar
    */
    public function getCode()
    {
        return $this->code;
    }
    /**
    * Sets this objects database code.
    * @param varchar $code
    */
    public function setCode($code)
    {
        $this->code = $code;
    }
    /**
    * Returns this objects database description
    * @return varchar
    */
    public function getDesc()
    {
        return $this->description;
    }
    /**
    * Sets this objects database description.
    * @param varchar $description
    */
    public function setDesc($description)
    {
        $this->description = $description;
    }
    /**
    * Returns this objects database level
    * @return varchar
    */
    public function getLevel()
    {
        return $this->level;
    }
    /**
    * Sets this objects database level.
    * @param varchar $level
    */
    public function setLevel($level)
    {
        $this->level = $level;
    }
}
