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

namespace Intern\Command;

use \phpws2\Database;

class LevelRest
{
	////////////////////////////////////
	// TODO: Check permissions on POST/PUT !!!!
	////////////////////////////////////

	public function execute()
	{
		switch ($_SERVER['REQUEST_METHOD']) {
			case 'PUT':
				$this->put();
				exit;
			case 'POST':
				$this->post();
				exit;
			case 'GET':
				$data = $this->get();
				echo (json_encode($data));
				exit;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				exit;
		}
	}

	// Update code
	public function put()
	{
		$cod = $_REQUEST['code'];
		$descri = $_REQUEST['descr'];
		$lev = $_REQUEST['level'];

		if ($lev == '') {
			header('HTTP/1.1 500 Internal Server Error');
			echo ("Edit was missing a level. No changes saved.");
			exit;
		}

		$db = Database::newDB();
		$pdo = $db->getPDO();

		$sql = "UPDATE intern_student_level
		SET level=:lev, description=:descri
		WHERE code=:cod";

		$sth = $pdo->prepare($sql);
		$sth->execute(array('cod' => $cod, 'descri' => $descri, 'lev' => $lev));
	}

	// New code
	public function post()
	{
		$cod = $_REQUEST['code'];
		$descri = $_REQUEST['descr'];
		$lev = $_REQUEST['level'];

		if ($cod == '') {
			header('HTTP/1.1 500 Internal Server Error');
			echo ("Missing a code.");
			exit;
		}

		if ($lev == '') {
			header('HTTP/1.1 500 Internal Server Error');
			echo ("Missing a level.");
			exit;
		}
		$db = Database::newDB();
		$pdo = $db->getPDO();

		$sql = "SELECT code
		FROM intern_student_level
		WHERE code=:cod";

		$sth = $pdo->prepare($sql);
		$sth->execute(array('cod' => $cod));
		$result = $sth->fetchAll(\PDO::FETCH_ASSOC);

		if (sizeof($result) > 0) {
			header('HTTP/1.1 500 Internal Server Error');
			echo ("Code already exist.");
			exit;
		}

		$sql = "INSERT INTO intern_student_level (code, description, level)
		VALUES (:cod, :descri, :lev)";
		$sth = $pdo->prepare($sql);
		$sth->execute(array('cod' => $cod, 'descri' => $descri, 'lev' => $lev));
	}

	// Get code information
	public function get()
	{
		$db = Database::newDB();
		$pdo = $db->getPDO();

		$sql = "SELECT *
		FROM intern_student_level";

		$sth = $pdo->prepare($sql);
		$sth->execute();
		$result = $sth->fetchAll(\PDO::FETCH_ASSOC);

		return $result;
	}
}
