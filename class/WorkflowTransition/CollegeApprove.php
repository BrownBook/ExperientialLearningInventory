<?php

namespace Intern\WorkflowTransition;
use Intern\WorkflowTransition;
use Intern\Internship;
use Intern\ExpectedCourseFactory;
use Intern\Exception\MissingDataException;
use Intern\Email\UnusualCourseEmail;
use Intern\InternSettings;

class CollegeApprove extends WorkflowTransition {
    const sourceState = 'DepartmentApprovedState';
    const destState   = 'CollegeApprovedState';
    const actionName  = 'Mark as College Approved';

    public function getAllowedPermissionList(){
        return array('college_approve');
    }

    public function checkRequiredFields(Internship $i){
        // Course number is required so we can check against the expected insurance list in doNotification()
        if($i->getCourseNumber() === null || $i->getCourseNumber() === ''){
            throw new MissingDataException("Please enter a course number.");
        }
    }

    public function doNotification(Internship $i, $note = null)
    {
        // If the subject and course number are not registered with InternshipInventory,
        // send an email to the appropriate receiver.
        if (!ExpectedCourseFactory::isExpectedCourse($i->getSubject(), $i->getCourseNumber())) {
            $email = new UnusualCourseEmail(InternSettings::getInstance(), $i);
            $email->send();
        }
    }
  }
