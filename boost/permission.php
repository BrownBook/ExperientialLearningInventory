<?php
/**
 * @author Robert Bost <bostrt at tux dot appstate dot edu>
 */

$use_permissions  = true;

$permissions['edit_major']              = _('Add/Edit/Hide majors.');
$permissions['delete_major']            = _('Add/Edit/Hide/Delete majors.');
$permissions['delete_dept']             = _('Add/Edit/Hide/Delete departments.');
$permissions['edit_dept']               = _('Add/Edit/Hide departments.');
$permissions['edit_states']             = _('Add/Edit/Hide states.');
$permissions['affiliation_agreement']   = _('Add/Edit Affiliation Agreements');
$permissions['edit_courses']            = _('Edit Standard Internship Course List.');
$permissions['student_import']          = _('Import Student Data');

// Permissions for workflow transitions
$permissions['create_internship']= _('Create Internships');

$permissions['coordinator_approve'] = 'Coordinator Approve';
$permissions['dept_approve']     = _('Department Approve');
$permissions['college_approve']  = "College Approve";

//$permissions['sig_auth_approve'] = _('Signature Authority Approve');
//$permissions['dean_approve']     = _('Dean Approve');

$permissions['register']         = _('Register');
$permissions['complete']         = "Mark as Complete";
$permissions['cancel']           = _('Cancel');
$permissions['reinstate']        = _('Reinstate');


// Special workflow transitions
$permissions['oied_certify']         = _('OIED Certification');
$permissions['distance_ed_register'] = _('Distance Ed Registration');
$permissions['grad_school_approve']  = _('Graduate School Approval');

// Access to all departments
$permissions['all_departments']      = _('Access All Departments');
