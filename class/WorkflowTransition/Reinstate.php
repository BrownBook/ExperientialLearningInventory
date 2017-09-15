<?php

namespace Intern\WorkflowTransition;
use Intern\WorkflowTransition;
use Intern\Internship;

class Reinstate extends WorkflowTransition {
    const sourceState = 'CancelledState';
    const destState   = 'NewState';
    const actionName  = 'Reinstate';

    public function getAllowedPermissionList(){
        return array('reinstate');
    }

    public function doNotification(Internship $i, $note = null)
    {
        if($i->isInternational()){
            $email = new \Intern\Email\IntlInternshipReinstateNotice(\Intern\InternSettings::getInstance(), $i);
            $email->send();
        }
    }
}
