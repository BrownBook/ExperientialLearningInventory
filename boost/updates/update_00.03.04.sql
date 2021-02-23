CREATE TABLE intern_exp_type (
    code varchar NOT NULL,
    short_name varchar NOT NULL,
    description varchar,
    PRIMARY KEY (code)
);

INSERT INTO intern_exp_type VALUES('internship', 'Internship', 'A course requiring students to participate in a partnership, professional employment, work experience or cooperative education with any entity external to the institution, generally under the supervision of an employee of the external entity.');
INSERT INTO intern_exp_type VALUES('student_teaching', 'Student Teaching', 'A course requiring students to instruct or teach at an entity external to the institution, generally as part of the culminating curriculum of a teacher education or certificate program.');
INSERT INTO intern_exp_type VALUES('practicum', 'Practicum', 'A course requiring students to participate in an approved project or proposal that practically applies previously studied theory of the field or discipline under the supervision of an expert or qualified representative of the field or discipline.');
INSERT INTO intern_exp_type VALUES('clinical', 'Clinical', 'A course requiring medical- or healthcare-focused experiential work where students test, observe, experiment, or practice a field or discipline in a hands-on or simulated environment.');
INSERT INTO intern_exp_type VALUES('studyabroad', 'Study Abroad', '');
INSERT INTO intern_exp_type VALUES('research', 'Research', '');
INSERT INTO intern_exp_type VALUES('capstone', 'Capstone', '');
INSERT INTO intern_exp_type VALUES('field_work', 'Field Work', '');
INSERT INTO intern_exp_type VALUES('project', 'Project', '');
INSERT INTO intern_exp_type VALUES('other', 'Other', '');

alter table intern_internship add constraint intern_internship_experience_type_fkey FOREIGN KEY (experience_type) REFERENCES intern_exp_type(code);
