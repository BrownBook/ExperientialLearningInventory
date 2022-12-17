import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

class Message extends Component {
  render() {
    let icon = '';
    switch (this.props.type) {
      case 'danger':
        icon = 'fa fa-exclamation-triangle';
        break;

      case 'success':
        icon = 'fa fa-thumbs-o-up';
        break;

      case 'info':
        icon = 'fa fa-info-circle';
        break;

      case 'warning':
        icon = 'fa fa-hand-paper-o';
        break;

      default:
        icon = 'fa fa-info-circle';
    }

    const messageType = 'alert alert-dismissible alert-' + this.props.type;

    return (
      <div className={messageType} role="alert">
        <button type="button" onClick={this.props.onClose} className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <i className={icon}></i>&nbsp;
        {this.props.children}
      </div>
    );
  }
}

Message.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClose: PropTypes.func
};

Message.defaultProps = {
  type: 'info'
};

export default Message;
