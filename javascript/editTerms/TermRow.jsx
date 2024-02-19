import React from 'react';
import classNames from 'classnames';
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
 * Copyright 2020 Brown Book Software, LLC
 */

class TermRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.timestampToDate = this.timestampToDate.bind(this);
    this.onCancelSave = this.onCancelSave.bind(this);

    this.termCodeRef = React.createRef();
    this.semesterTypeRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.censusDateRef = React.createRef();
    this.availableDateRef = React.createRef();
    this.startDateRef = React.createRef();
    this.endDateRef = React.createRef();
    this.undergradOverloadRef = React.createRef();
    this.gradOverloadRef = React.createRef();
  }

  timestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = month + '/' + day + '/' + year;

    return formattedDate;
  }

  handleEdit() {
    this.setState({ editMode: true });
  }

  handleSave() {
    this.setState({ editMode: false });

    let newTcode = this.termCodeRef.current.value.trim();
    let newStype = this.semesterTypeRef.current.value.trim();
    let newDescr = this.descriptionRef.current.value.trim();
    let newCensusDate = this.censusDateRef.current.value.trim();
    let newAvailDate = this.availableDateRef.current.value.trim();
    let newStartDate = this.startDateRef.current.value.trim();
    let newEndDate = this.endDateRef.current.value.trim();
    let newUgradOverload = this.undergradOverloadRef.current.value.trim();
    let newGradOverload = this.gradOverloadRef.current.value.trim();

    if (newTcode === '') {
      newTcode = this.props.tcode;
    }
    if (newStype === '') {
      newStype = this.props.stype;
    }
    if (newDescr === '') {
      newDescr = this.props.descr;
    }
    if (newCensusDate === '') {
      newCensusDate = this.timestampToDate(this.props.census);
    }
    if (newAvailDate === '') {
      newAvailDate = this.timestampToDate(this.props.available);
    }
    if (newStartDate === '') {
      newStartDate = this.timestampToDate(this.props.start);
    }
    if (newEndDate === '') {
      newEndDate = this.timestampToDate(this.props.end);
    }
    if (newUgradOverload === '') {
      newUgradOverload = this.props.ugradOver;
    }
    if (newGradOverload === '') {
      newGradOverload = this.props.gradOver;
    }

    this.props.onTermSave(
      newTcode,
      newStype,
      newDescr,
      newCensusDate,
      newAvailDate,
      newStartDate,
      newEndDate,
      newUgradOverload,
      newGradOverload,
      this.props.tcode
    );
  }

  onCancelSave() {
    this.setState({ editMode: false });
  }

  render() {
    let mainButton = null;

    const availDate = this.timestampToDate(this.props.available);
    const censusDate = this.timestampToDate(this.props.census);
    const startDate = this.timestampToDate(this.props.start);
    const endDate = this.timestampToDate(this.props.end);

    const availDateObj = new Date(this.props.available * 1000);
    const censusDateObj = new Date(this.props.census * 1000);
    const today = new Date();

    const active = availDateObj < today && today < censusDateObj;

    const rowClasses = classNames({
      'table-primary': active
    });

    // if you are not editing
    if (this.state.editMode) {
      // Edit mode enabled
      mainButton = (
        <a onClick={this.handleSave} title="Save Changes">
          <i className="fa-solid fa-floppy-disk" />
        </a>
      );
      return (
        <tr>
          <td>
            <input type="text" className="form-control" ref={this.termCodeRef} aria-label="Term Code" defaultValue={this.props.tcode} />
          </td>
          <td>
            <input type="text" className="form-control" ref={this.descriptionRef} aria-label="Term Description" defaultValue={this.props.descr} />
          </td>
          <td>
            <select className="form-select" ref={this.semesterTypeRef} aria-label="Semester Type" defaultValue={this.props.stype}>
              <option value="1">Spring</option>
              <option value="2">Summer 1</option>
              <option value="3">Summer 2</option>
              <option value="4">Fall</option>
            </select>
          </td>
          <td>
            <input type="text" className="form-control" ref={this.availableDateRef} aria-label="Available On Date" defaultValue={availDate} />
          </td>
          <td>
            <input type="text" className="form-control" ref={this.censusDateRef} aria-label="Census Date" defaultValue={censusDate} />
          </td>
          <td>
            <input type="text" className="form-control" ref={this.startDateRef} aria-label="Term Start Date" defaultValue={startDate} />
          </td>
          <td>
            <input type="text" className="form-control" ref={this.endDateRef} aria-label="Term End Date" defaultValue={endDate} />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              ref={this.undergradOverloadRef}
              aria-label="Undergradudate Overload Hours"
              defaultValue={this.props.ugradOver}
            />
          </td>
          <td>
            <input type="text" className="form-control" ref={this.gradOverloadRef} aria-label="Graduate Overload Hours" defaultValue={this.props.gradOver} />
          </td>
          <td style={{ verticalAlign: 'middle' }}>{mainButton}</td>
          <td style={{ verticalAlign: 'middle' }}>
            <a onClick={this.onCancelSave} title="Cancel Changes">
              <i className="glyphicon glyphicon-remove" />
            </a>
          </td>
        </tr>
      );
    } else {
      // Not editing
      mainButton = (
        <a onClick={this.handleEdit} data-toggle="tooltip" title="Edit">
          <i className="fa-solid fa-pencil" />
        </a>
      );

      let semesterType = '';
      switch (this.props.stype) {
        case 1:
          semesterType = 'Spring';
          break;
        case 2:
          semesterType = 'Summer 1';
          break;
        case 3:
          semesterType = 'Summer 2';
          break;
        case 4:
          semesterType = 'Fall';
          break;
        default:
          semesterType = 'Unknown Semester Type Code';
      }

      return (
        <tr className={rowClasses}>
          <td>{this.props.tcode}</td>
          <td>{this.props.descr}</td>
          <td>{semesterType}</td>
          <td>{availDate}</td>
          <td>{censusDate}</td>
          <td>{startDate}</td>
          <td>{endDate}</td>
          <td>{this.props.ugradOver}</td>
          <td>{this.props.gradOver}</td>
          <td>{mainButton}</td>
        </tr>
      );
    }
  }
}

TermRow.propTypes = {
  onTermSave: PropTypes.func.isRequired,
  stype: PropTypes.number.isRequired,
  tcode: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  available: PropTypes.number.isRequired,
  census: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  ugradOver: PropTypes.number.isRequired,
  gradOver: PropTypes.number.isRequired
};

export default TermRow;
