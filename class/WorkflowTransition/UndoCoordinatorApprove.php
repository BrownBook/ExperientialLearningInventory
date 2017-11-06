<?php

namespace Intern\WorkflowTransition;
use Intern\WorkflowTransition;

class UndoCoordinatorApprove extends WorkflowTransition {
    const sourceState = 'CoordinatorApprovedState';
    const destState   = 'NewState';
    const actionName  = 'Return for Coordinator Approval';

    public function getAllowedPermissionList(){
        return array('coordinator_approve', 'dept_approve');
    }
  }
