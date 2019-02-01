<?php

namespace Intern\WorkflowTransition;
use Intern\WorkflowTransition;

class CoordinatorApprove extends WorkflowTransition {
    const sourceState = 'NewState';
    const destState   = 'CoordinatorApprovedState';
    const actionName  = 'Mark as Coordinator Approved';

    public function getAllowedPermissionList(){
        return array('coordinator_approve');
    }
  }
