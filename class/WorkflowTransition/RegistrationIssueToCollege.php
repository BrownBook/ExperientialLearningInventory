<?php

namespace Intern\WorkflowTransition;
use Intern\WorkflowTransition;
use Intern\Internship;

class RegistrationIssueToCollege extends WorkflowTransition {
    const sourceState = 'RegistrationIssueState';
    const destState   = 'CollegeApprovedState';
    const actionName  = 'Return for College Approval';

    const sortIndex = 6;

    public function getAllowedPermissionList(){
        return array('register');
    }

/*
    public function allowed(Internship $i)
    {
        if($i->isDistanceEd()){
            if(\Current_User::allow('intern', 'distance_ed_register')){
                return true;
            }else{
                return false;
            }
        }else{
            return parent::allowed($i);
        }

        return false;
    }
*/

}
