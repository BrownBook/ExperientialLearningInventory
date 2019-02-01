<?php

namespace Intern\WorkflowTransition;
use Intern\WorkflowTransition;
use Intern\Internship;

class UndoCollegeApproval extends WorkflowTransition {
    const sourceState = 'CollegeApprovedState';
    const destState   = 'DepartmentApprovedState';
    const actionName  = 'Return for College Approval';

    const sortIndex = 4;

    public function getAllowedPermissionList(){
        return array('college_approve','register');
    }
}
