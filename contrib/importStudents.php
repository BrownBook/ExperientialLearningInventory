#!/usr/bin/php
<?php

require_once 'cliCommon.php';
require_once 'dbConnect.php';

ini_set('display_errors', 1);
ini_set('ERROR_REPORTING', E_WARNING);
error_reporting(E_ALL);

$args = array('input_file'=>'');
$switches = array();
check_args($argc, $argv, $args, $switches);

// Open input file
$inputFile = fopen($args['input_file'], 'r');

if($inputFile === FALSE){
    die("Could not open input file.\n");
    exit;
}

$pdo = connectPDO();

$query = "INSERT INTO intern_local_student_data (
                student_id,
                user_name,
                email,
                first_name,
                middle_name,
                last_name,
                preferred_name,
                confidential,
                gender,
                level,
                campus,
                gpa,
                credit_hours,
                major_code,
                major_description,
                grad_date,
                phone,
                address,
                address2,
                city,
                state,
                zip
            ) VALUES (
                :studentId,
                :username,
                :email,
                :firstName,
                :middleName,
                :lastName,
                :preferredName,
                :confidential,
                :gender,
                :level,
                :campus,
                :gpa,
                :creditHours,
                :majorCode,
                :majorDesc,
                :gradDate,
                :phone,
                :address,
                :address2,
                :city,
                :state,
                :zip
            )";
/*
                ON CONFLICT (student_id) DO UPDATE SET
                student_id = :studentId,
                user_name = :username,
                email = :email,
                first_name = :firstName,
                middle_name = :middleName,
                last_name = :lastName,
                preferred_name = :preferredName,
                confidential = :confidential,
                gender = :gender,
                level = :level,
                campus = :campus,
                gpa = :gpa,
                credit_hours = :creditHours,
                major_code = :majorCode,
                major_description = :majorDesc,
                grad_date = :gradDate,
                phone = :phone,
                address = :address,
                address2 = :address2,
                city = :city,
                state = :state,
                zip = :zip
            WHERE intern_local_student_data.student_id = :studentId;";
*/

$stmt = $pdo->prepare($query);

$skipfirst = true;

// Parse CSV input into fields line by line
while(($line = fgetcsv($inputFile)) !== FALSE) {

    if($skipfirst === true){
        $skipfirst = false;
        continue;
    }


    $params = array();

    $params['studentId'] = $line[0];

    $params['email'] = $line[12];
    $emailParts = explode("@", $line[12]);
    $params['username'] = $emailParts[0];

    $params['lastName'] = $line[3];
    $params['firstName'] = $line[1];
    $params['middleName'] = $line[2]; // TODO?
    $params['preferredName'] = ''; // TODO?

    $params['confidential'] = 'N'; // TODO?
    $params['gender'] = $line[4];

    $params['level'] = $line[18];
    $params['campus'] = 'main_campus'; // Hard coded

    $params['gpa'] = $line[21];
    if($params['gpa'] == '') {
        $params['gpa'] = 0;
    }

    $params['creditHours'] = 0; // TODO?

    $params['majorCode'] = $line[14];
    //$params['programDesc'] = $line[3]; // Unused
    $params['majorDesc'] = $line[16];

    $params['gradDate'] = ''; // TODO?
    $params['phone'] = $line[13];

    $params['address'] = $line[5];
    $params['address2'] = $line[6];
    $params['city'] = $line[7];
    $params['state'] = $line[8];
    $params['zip'] = $line[10];

    $stmt->execute($params);
}
