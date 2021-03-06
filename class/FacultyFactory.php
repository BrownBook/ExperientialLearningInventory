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

use \Intern\DataProvider\Student\StudentDataProviderFactory;

use \phpws2\Database;
use Intern\PdoFactory;
use Intern\FacultyDB;

class FacultyFactory {

    public static function getFacultyById($id)
    {
        $pdo = PdoFactory::getPdoInstance();

        $sql = "SELECT intern_faculty.* FROM intern_faculty WHERE intern_faculty.id = :id";

        $sth = $pdo->prepare($sql);
        $sth->execute(array('id' => $id));

        $result = $sth->fetch(\PDO::FETCH_ASSOC);

        // If no results from database, try to lookup the faculty member in Banner
        if(!$result){
            $provider = StudentDataProviderFactory::getProvider();
            $result = $provider->getFacultyMember($id);
            if(isset($result) && isset($result->bannerId)){
                $result->id = $result->banner_id;
                $result->username = $result->user_name;
            } else {
                $result = null;
            }
        }

        return $result;
    }

    public static function getFacultyObjectById($id)
    {

        if(!isset($id)) {
            throw new \InvalidArgumentException('Missing faculty id.');
        }

        $pdo = PdoFactory::getPdoInstance();

        $sql = "SELECT intern_faculty.* FROM intern_faculty WHERE intern_faculty.id = :id";

        $stmt = $pdo->prepare($sql);
        $stmt->setFetchMode(\PDO::FETCH_CLASS, 'Intern\FacultyDB');
        $stmt->execute(array('id'=>$id));

        $result = $stmt->fetch();

        return $result;
    }

    /**
     * Returns an array of Faculty objects for the given department.
     * @param Department $department
     * @return Array List of faculty for requested department.
     */
    public static function getFacultyByDepartmentAssoc(Department $department)
    {
        $db = Database::newDB();
        $pdo = $db->getPDO();

        $sql = "SELECT intern_faculty.* FROM intern_faculty JOIN intern_faculty_department ON intern_faculty.id = intern_faculty_department.faculty_id WHERE intern_faculty_department.department_id = :departmentId ORDER BY last_name ASC";

        $sth = $pdo->prepare($sql);
        $sth->execute(array('departmentId' => $department->getId()));

        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);

        return $result;
    }

    public static function saveFaculty(Faculty $faculty)
    {
        $db = PdoFactory::getPdoInstance();

        $query = 'SELECT * FROM intern_faculty WHERE id = :facultyId';

        $stmt = $db->prepare($query);
        $stmt->execute(array('facultyId'=>$faculty->getId()));
        $result = $stmt->fetchAll();

        if(count($result) > 0){
            // Faculty member exists, so update info
            $query = 'UPDATE intern_faculty SET
                            username = :username,
                            first_name = :firstName,
                            last_name = :lastName,
                            phone = :phone,
                            street_address1 = :streetAddress1,
                            street_address2 = :streetAddress2,
                            city = :city,
                            state = :state,
                            zip = :zip
                        WHERE id = :facultyId';
        } else {
            // Faculty member does not exist yet, do an INSERT
            $query = 'INSERT INTO intern_faculty (id, username, first_name, last_name, phone, street_address1, street_address2, city, state, zip)
                       VALUES (:facultyId, :username, :firstName, :lastName, :phone, :streetAddress1, :streetAddress2, :city, :state, :zip)';
        }

        $params = array(
            'facultyId'     => $faculty->getId(),
            'username'      => $faculty->getUsername(),
            'firstName'     => $faculty->getFirstName(),
            'lastName'      => $faculty->getLastName(),
            'phone'         => $faculty->getPhone(),
            'streetAddress1' => $faculty->getStreetAddress1(),
            'streetAddress2' => $faculty->getStreetAddress2(),
            'city'          => $faculty->getCity(),
            'state'         => $faculty->getState(),
            'zip'           => $faculty->getZip()
        );

        $stmt = $db->prepare($query);
        $stmt->execute($params);
    }
}
