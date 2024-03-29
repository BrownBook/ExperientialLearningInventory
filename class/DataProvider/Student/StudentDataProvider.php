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

namespace Intern\DataProvider\Student;

/**
 * StudentProvider
 *
 * Abstract class to define the interface for various ways
 * to get Student objects.
 */
abstract class StudentDataProvider {

    /**
     * Returns a Student object corresponding to the given studentId.
     *
     * @abstract
     * @param string studentId
     * @param string term
     * @return Intern\Student
     */
    public abstract function getStudent($studentId);

    /**
     * Returns the number of credit hours the given student is currently
     * enrolled for in the given term
     * @abstract
     * @param string StudentId
     * @param string StudentId
     * @return int
     */
    public abstract function getCreditHours(string $studentId, string $term);

    /**
     * Returns a stdClass object representing a faculty member, or throws an exception if not Found
     *
     * @abstract
     * @param string facultyId
     * @return \stdClass
     */
    public abstract function getFacultyMember($facultyId);
}
