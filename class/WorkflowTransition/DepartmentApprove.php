<?php

namespace Intern\WorkflowTransition;
use Intern\WorkflowTransition;
use Intern\Internship;

class DepartmentApprove extends WorkflowTransition {
    const sourceState = 'CoordinatorApprovedState';
    const destState   = 'DepartmentApprovedState';
    const actionName  = 'Mark as Depatment Approved';

    public function getAllowedPermissionList(){
        return array('dept_approve');
    }
}
