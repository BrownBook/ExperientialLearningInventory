import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
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

class AddData extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);

    this.newCodeRef = React.createRef();
    this.newDescRef = React.createRef();
    this.newLevelRef = React.createRef();
  }

  handleClick() {
    const textCode = this.newCodeRef.current.value.trim();
    const textDes = this.newDescRef.current.value.trim();
    const textLev = this.newLevelRef.current.value.trim();

    this.props.onCreate(textCode, textDes, textLev);
  }

  render() {
    return (
      <div className="col-md-5 col-md-offset-1">
        <br />
        <br />
        <br />
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <div className="col-md-10">
                <label htmlFor="codeName">Code:</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <input id="codeName" type="text" className="form-control" ref={this.newCodeRef} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <label htmlFor="desName">Description:</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <input id="desName" type="text" className="form-control" ref={this.newDescRef} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <label htmlFor="levName">Level:</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="forCodem-group">
                  <input id="levName" type="text" className="form-control" ref={this.newLevelRef} />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <button className="btn btn-default btn-md" onClick={this.handleClick}>
                    Create Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddData.propTypes = {
  onCreate: PropTypes.func.isRequired
};

class DisplayData extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { editMode: false };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.descriptionRef = React.createRef();
    this.levelRef = React.createRef();
  }

  handleEdit() {
    this.setState({ editMode: true });
  }

  handleSave() {
    this.setState({ editMode: false });

    // Grabs the value in the textbox
    const newCode = this.props.code;
    const newDescription = this.descriptionRef.current.value.trim();
    const newLevel = this.levelRef.current.value.trim();

    this.props.onSave(newCode, newDescription, newLevel);
  }

  render() {
    let textDes = null;
    let textLev = null;
    let eButton = null;
    const textName = <span className="text-muted"> {this.props.code} </span>;
    const desName = <span className="text-muted"> {this.props.description} </span>;
    const levelName = <span className="text-muted">{this.props.level} </span>;

    if (this.state.editMode) {
      textDes = (
        <div id={this.props.description}>
          <input type="text" className="form-control" aria-label="Level Description" defaultValue={this.props.description} ref={this.descriptionRef} />
        </div>
      );
      textLev = (
        <div id={this.props.level}>
          <input type="text" className="form-control" aria-label="Level Code" defaultValue={this.props.level} ref={this.levelRef} />
        </div>
      );
      eButton = (
        <button className="btn btn-default btn-xs" type="submit" onClick={this.handleSave}>
          {' '}
          Save{' '}
        </button>
      );
    } else {
      textDes = desName;
      textLev = levelName;
      eButton = (
        <button className="btn btn-default btn-xs" type="submit" onClick={this.handleEdit}>
          {' '}
          Edit{' '}
        </button>
      );
    }
    return (
      <tr>
        <td>{textName}</td>
        <td>{textDes}</td>
        <td>{textLev}</td>
        <td>{eButton}</td>
      </tr>
    );
  }
}

DisplayData.propTypes = {
  code: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
};

class StudentLevelManager extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { mainData: null, errorWarning: '', success: '' };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getData = this.getData.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    $.ajax({
      url: 'index.php?module=intern&action=levelRest',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ mainData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('There was a problem fetching data from the server.');
        console.error(status, err.toString());
      }
    });
  }

  onSave(newCode, newDes, newLev) {
    // Saves the value into the database
    $.ajax({
      url: 'index.php?module=intern&action=levelRest&code=' + newCode + '&descr=' + newDes + '&level=' + newLev,
      type: 'PUT',
      success: function (data) {
        $('#success').show();
        const added = 'Updated ' + newCode + '.';
        this.setState({ success: added });
        this.getData();
        $('#warningError').hide();
      }.bind(this),
      error: function (http) {
        const errorMessage = http.responseText;
        this.setState({ errorWarning: errorMessage });
        $('#warningError').show();
        $('#success').hide();
      }.bind(this)
    });
  }

  onCreate(code, descrip, level) {
    // Creates a new value
    $.ajax({
      url: 'index.php?module=intern&action=levelRest&code=' + code + '&descr=' + descrip + '&level=' + level,
      type: 'POST',
      success: function (data) {
        // Shows a success message for the new value being added.
        $('#success').show();
        const added = 'Added ' + code + '.';
        this.setState({ success: added });
        this.getData();
        $('#warningError').hide();
      }.bind(this),
      error: function (http) {
        const errorMessage = http.responseText;
        this.setState({ errorWarning: errorMessage });
        $('#warningError').show();
        $('#success').hide();
      }.bind(this)
    });
  }

  render() {
    let data = null;
    if (this.state.mainData != null) {
      const onSave = this.onSave;
      data = this.state.mainData.map(function (data) {
        return <DisplayData key={data.code} code={data.code} description={data.description} level={data.level} onSave={onSave} />;
      });
    } else {
      data = (
        <tr>
          <td></td>
        </tr>
      );
    }

    return (
      <div className="data">
        <div id="success" className="alert alert-success alert-dismissible" role="alert" hidden>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Success!</strong> {this.state.success}
        </div>

        <div id="warningError" className="alert alert-warning alert-dismissible" role="alert" hidden>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Warning!</strong> {this.state.errorWarning}
        </div>

        <div className="row">
          <div className="col-md-5">
            <h1> Student Levels</h1>
            <table className="table table-condensed table-striped">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Description</th>
                  <th>Level</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </table>
          </div>
          <AddData onCreate={this.onCreate} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<StudentLevelManager />, document.getElementById('level'));

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}
