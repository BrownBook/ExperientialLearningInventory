import React from 'react';

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
 * Copyright 2011-2018 Appalachian State University
 */

class ErrorMessagesBlock extends React.Component {
    render() {
        if (this.props.errors === null) {
            return '';
        }

        var errors = this.props.errors; // The error or success message.

        // If this is an error notification.
        if (this.props.messageType === "error") {
            return (
                <div className="row">
                    <div className="alert alert-warning" role="alert">
                        <strong>Warning! </strong> {errors}
                    </div>
                </div>
            );
        }
        // If this is a succes notification.
        else if (this.props.messageType === "success") {
            return (
                <div className="row">
                    <div className="alert alert-success alert-dismissable" role="alert">
                        <strong>Success! </strong> {errors}
                        <button type="button" className="close close-alert" data-dismiss="alert" aria-hidden="true">x</button>
                    </div>
                </div>
            );
        }
    }
}

export default ErrorMessagesBlock;
