<?php

namespace Intern\WorkflowTransition;
use Intern\WorkflowTransition;
use Intern\Internship;

class UndoDepartmentApprove extends WorkflowTransition {
    const sourceState = 'DepartmentApprovedState';
    const destState   = 'CoordinatorApprovedState';
    const actionName  = 'Return for Department Approval';

    const sortIndex = 6;

    public function getAllowedPermissionList(){
        return array('dept_approve','college_approve');
    }
}
