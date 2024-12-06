<?php

$outputSql = array();

if(($handle = fopen($argv[1], "r")) !== FALSE){
    while(($data = fgetcsv($handle, 0, ",")) !== FALSE){
        $escapedTitle = str_replace("'", "''", $data[4]);
        $escapedDefinition = str_replace("'", "''", $data[5]);
        $escapedCrossReferences = str_replace("'", "''", $data[6]);
        $escapedExamples = str_replace("'", "''", $data[7]);

        $outputSql[] = "INSERT INTO intern_cip_codes VALUES ({$data[0]}, '{$data[1]}', '{$data[2]}', '{$data[3]}', '{$escapedTitle}', '{$escapedDefinition}', '{$escapedCrossReferences}', '{$escapedExamples}');\n";
    }
}

file_put_contents('CipCodes2020.sql', $outputSql);