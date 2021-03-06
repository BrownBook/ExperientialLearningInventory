<?php

namespace Intern\WorkflowTransition;
use Intern\WorkflowTransition;
use Intern\Internship;

class Complete extends WorkflowTransition {
    const sourceState = 'NewState';
    const destState   = 'CompletedState';
    const actionName  = 'Mark as Complete';

    public function getAllowedPermissionList(){
        return array('complete');
    }
}
