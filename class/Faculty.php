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
 * Faculty
 *
 * Represents a faculty member for a department.
 *
 * @author Jeremy Booker jbooker@tux.appstate.edu
 * @package Hms
*/

class Faculty extends Model implements DbStorable {

    public $id;
    public $username;

    public $first_name;
    public $last_name;

    public $phone;

    public $street_address1;
    public $street_address2;
    public $city;
    public $state;
    public $zip;

    /**
     * Constructor
     */
    public function __construct($id, $username, $firstName, $lastName, $phone, $streetAddress1, $streetAddress2, $city, $state, $zip)
    {
        $this->setId($id);
        $this->setUsername($username);

        $this->setFirstName($firstName);
        $this->setLastName($lastName);

        $this->setPhone($phone);

        $this->setStreetAddress1($streetAddress1);
        $this->setStreetAddress2($streetAddress2);
        $this->setCity($city);
        $this->setState($state);
        $this->setZip($zip);
    }

    public function extractVars()
    {
        $vars = array();
        $vars['id']                 = $this->getId();
        $vars['username']           = $this->getUsername();

        $vars['first_name']         = $this->getFirstName();
        $vars['last_name']          = $this->getLastName();

        $vars['phone']              = $this->getPhone();

        $vars['street_address1']    = $this->getStreetAddress1();
        $vars['street_address2']    = $this->getStreetAddress2();
        $vars['city']               = $this->getCity();
        $vars['state']              = $this->getState();
        $vars['zip']                = $this->getZip();

        return $vars;
    }

    /**
     * @Override Model::getDb
     */
    public static function getDb(){
        return new \PHPWS_DB('intern_faculty');
    }

    /**
     * Returns the database table name for this class.
     * @see DbStorable::getTableName()
     */
    public static function getTableName(){
        return 'intern_faculty';
    }

    /**
     * Returns an array of columns to be used in a CSV export.
     * @return Array
     */
    public function getCSV()
    {
        $csv = array();

        $csv['Faculty Super. First Name'] = $this->getFirstName();
        $csv['Faculty Super. Last Name']  = $this->getLastName();
        $csv['Faculty Super. Phone']      = $this->getPhone();
        $csv['Faculty Super. Email']      = $this->getUsername();

        return $csv;
    }

    /**
     * Shortcut method for getting first and last name
     * concatenated together with a space
     * @return string
     */
    public function getFullName()
    {
        return $this->getFirstName() . ' ' . $this->getLastName();
    }

    /***************************
     * Getter / Setter Methods *
    */

    /**
     * Returns this objects database id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Sets this objects database id.
     * @param integer $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * Returns the username portion of the faculty member's
     * email address.
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Sets the username portion of the faculty member's
     * email addres.
     * @param string $user
     */
    public function setUsername($user)
    {
        $this->username = $user;
    }

    /**
     * Returns the first name
     * @return string
     */
    public function getFirstName()
    {
        return $this->first_name;
    }

    /**
     * Sets the first name
     * @param string $first
     */
    public function setFirstName($first)
    {
        $this->first_name = $first;
    }

    /**
     * Returns the last name
     * @return string
     */
    public function getLastName()
    {
        return $this->last_name;
    }

    /**
     * Sets the last name
     * @param string $last
     */
    public function setLastName($last)
    {
        $this->last_name = $last;
    }

    /**
     * Returns the faculty member's phone number.
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Sets the faculty member's phone number.
     * @param string $phone
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
    }

    /**
     * Returns line 1 of this faculty member's address.
     * @return string
     */
    public function getStreetAddress1()
    {
        return $this->street_address1;
    }

    /**
     * Sets line 1 of this faculty member's address.
     * @param string $addr
     */
    public function setStreetAddress1($addr)
    {
        $this->street_address1 = $addr;
    }

    /**
     * Returns line 2 of this faculty member's address.
     * @return string
     */
    public function getStreetAddress2()
    {
        return $this->street_address2;
    }

    /**
     * Sets line 2 of this faculty member's address.
     * @param string $addr
     */
    public function setStreetAddress2($addr)
    {
        $this->street_address2 = $addr;
    }

    /**
     * Returns the city portion of this faculty member's address.
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Sets the city portion of this faculty member's address.
     * @param string $city
     */
    public function setCity($city)
    {
        $this->city = $city;
    }

    /**
     * Retunrs the state portion of this faculty member's address.
     * @return string
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Sets the state portion of this faculty member's address.
     * @param string $state
     */
    public function setState($state)
    {
        $this->state = $state;
    }

    /**
     * Returns the zip code portion of this faculty member's address.
     * @return string
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * Sets the zip code portion of this faculty member's address.
     * @param integer $zip
     */
    public function setZip($zip)
    {
        $this->zip = $zip;
    }
}
