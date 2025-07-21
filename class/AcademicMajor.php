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
 * Copyright 2024-2025 Brown Book Software
 */

namespace Intern;

/**
 * Represents an academic major from an external source.
 * @author Jeremy Booker
 * @package Intern
 */
class AcademicMajor
{

    // Fields must be public for json_encode()
    public $code;
    public $description;
    public $level;
    public $hidden;
    public $cip_code;
    public $cip_title;

    // TODO: Deprecate these. They're stored in the separate DB table
    // Still used in the MajorSelector react component on the search UI
    const LEVEL_UNDERGRAD   = 'U';
    const LEVEL_GRADUATE    = 'G';

    public function __construct(string $code, string $description, string $level, string|null $cip_code, string|null $cip_title, int $hidden)
    {
        $this->code = $code;
        $this->description = $description;
        $this->level = $level;
        $this->hidden = $hidden;
        $this->cip_code = $cip_code;
        $this->cip_title = $cip_title;
    }

    public function getCode(): string
    {
        return $this->code;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getLevel(): string
    {
        return $this->level;
    }

    public function isHidden(): bool
    {
        if ($this->hidden == 0) {
            return false;
        }

        return true;
    }

    public function getCipCode(): string
    {
        return $this->cip_code;
    }
}
