CREATE TABLE intern_import (
    id INT NOT NULL,
    name character varying NOT NULL,
    uploaded_timestamp INT NOT NULL,
    uploaded_by character varying NOT NULL,
    imported_timestamp INT,
    validated_on INT,
    PRIMARY KEY(id)
);

CREATE SEQUENCE intern_import_seq;

CREATE TABLE intern_import_activity (
    id          INT NOT NULL,
    import_id   INT NOT NULL REFERENCES intern_import(id),
    row_num     INT NOT NULL,
    student_id   character varying,
    first_name  character varying,
    last_name   character varying,
    term        character varying,
    level       character varying,
    experience_type character varying,
    host_name       character varying,
    host_state      character varying,
    department_name character varying,
    validation_errors character varying,
    validated_on INT,
    PRIMARY KEY(id)
);

CREATE SEQUENCE intern_import_activity_seq;

ALTER TABLE intern_internship ADD COLUMN import_id INT NULL REFERENCS intern_import(id);
