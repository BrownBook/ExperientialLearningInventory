<?php

namespace Intern;

use \Intern\DataProvider\Student\StudentDataProviderFactory;

use \phpws2\Database;

class FacultyFactory {

    public static function getFacultyById($id)
    {
        $db = Database::newDB();
        $pdo = $db->getPDO();

        $sql = "SELECT intern_faculty.* FROM intern_faculty WHERE intern_faculty.id = :id";

        $sth = $pdo->prepare($sql);
        $sth->execute(array('id' => $id));

        $result = $sth->fetch(\PDO::FETCH_ASSOC);

        // If no results from database, try to lookup the faculty member in Banner
        if(!$result){
            $provider = StudentDataProviderFactory::getProvider();
            $result = $provider->getFacultyMember($id);
            if($result !== null){
                $result->id = $result->banner_id;
                $result->username = $result->user_name;
            } else {
                return null;
            }
        }

        return $result;
    }

    public static function getFacultyObjectById($id)
    {

        if(!isset($id)) {
            throw new \InvalidArgumentException('Missing faculty id.');
        }

        $sql = "SELECT intern_faculty.* FROM intern_faculty WHERE intern_faculty.id = {$id}";

        $row = \PHPWS_DB::getRow($sql);

        if (\PHPWS_Error::logIfError($row)) {
            throw new Exception($row);
        }

        $faculty = new FacultyDB();

        $faculty->setId($row['id']);
        $faculty->setUsername($row['username']);
        $faculty->setFirstName($row['first_name']);
        $faculty->setLastName($row['last_name']);
        $faculty->setPhone($row['phone']);
        $faculty->setFax($row['fax']);
        $faculty->setStreetAddress1($row['street_address1']);
        $faculty->setStreetAddress2($row['street_address2']);
        $faculty->setCity($row['city']);
        $faculty->setState($row['state']);
        $faculty->setZip($row['zip']);

        return $faculty;
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
                            fax = :fax,
                            street_address1 = :streetAddress1,
                            street_address2 = :streetAddress2,
                            city = :city,
                            state = :state,
                            zip = :zip
                        WHERE id = :facultyId';
        } else {
            // Faculty member does not exist yet, do an INSERT
            $query = 'INSERT INTO intern_faculty (id, username, first_name, last_name, phone, fax, street_address1, street_address2, city, state, zip)
                       VALUES (:facultyId, :username, :firstName, :lastName, :phone, :fax, :streetAddress1, :streetAddress2, :city, :state, :zip)';
        }

        $params = array(
            'facultyId'     => $faculty->getId(),
            'username'      => $faculty->getUsername(),
            'firstName'     => $faculty->getFirstName(),
            'lastName'      => $faculty->getLastName(),
            'phone'         => $faculty->getPhone(),
            'fax'           => $faculty->getFax(),
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
