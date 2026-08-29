<?php

/**
 * This file is part of Internship Inventory.
 *
 * Internship Inventory is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * Internship Inventory is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Internship Inventory.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright 2011-2025 Appalachian State University
 */

namespace Intern\Command;

use \Intern\UI\NotifyUI;
use \Intern\ReportsView;

class ShowReports
{
    public function __construct() {}

    public function execute(): ReportsView
    {
        // Check permissions
        if (!\Current_User::allow('intern', 'view_reports')) {
            \NQ::simple('intern', NotifyUI::ERROR, 'You do not have permission to view reports.');
            \NQ::close();
            \PHPWS_Core::home();
        }

        $view = new ReportsView();

        return $view;
    }
}
