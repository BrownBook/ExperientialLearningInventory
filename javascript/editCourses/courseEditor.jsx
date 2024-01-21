import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import PropTypes from 'prop-types';

/**
 * Notification component used for adding or delete courses.
 **/
class Notifications extends React.Component {
  render() {
    let notification;

    // Determine if the screen should render a notification.
    if (this.props.msg !== '') {
      if (this.props.msgType === 'success') {
        notification = (
          <div className="alert alert-success" role="alert">
            <i className="fa fa-check fa-2x pull-left"></i> {this.props.msg}
          </div>
        );
      } else if (this.props.msgType === 'error') {
        notification = (
          <div className="alert alert-danger" role="alert">
            <i className="fa fa-times fa-2x pull-left"></i> {this.props.msg}
          </div>
        );
      }
    } else {
      notification = '';
    }

    return <div>{notification}</div>;
  }
}

Notifications.propTypes = {
  msg: PropTypes.string,
  msgType: PropTypes.string
};

// Component creates a row for the courses
class CourseRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = this.props.abbr + ' - ' + this.props.name;
    this.props.deleteCourse(this.props.id, name, this.props.cnum);
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.abbr} - {this.props.name} {this.props.cnum}
        </td>
        <td className="text-center">
          <a onClick={this.handleChange}>
            <i className="fa-solid fa-trash-can" aria-label="Delete this course" />
          </a>
        </td>
      </tr>
    );
  }
}

CourseRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  abbr: PropTypes.string.isRequired,
  cnum: PropTypes.number.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

// Component helps create the table
class CourseList extends React.Component {
  render() {
    const deleteCourse = this.props.deleteCourse;
    // Determines if it needs to create a row.
    let cRow = null;
    if (this.props.subjectData != null) {
      cRow = this.props.subjectData.map(function (sub) {
        return <CourseRow key={sub.id} id={sub.id} abbr={sub.abbreviation} name={sub.description} cnum={sub.course_num} deleteCourse={deleteCourse} />;
      });
    } else {
      cRow = null;
    }

    return (
      <table className="table table-condensed table-striped">
        <thead>
          <tr>
            <th>Course</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>{cRow}</tbody>
      </table>
    );
  }
}

CourseList.propTypes = {
  subjectData: PropTypes.array,
  deleteCourse: PropTypes.func.isRequired
};

// Component used to create a course
class CreateCourse extends React.Component {
  constructor(props) {
    super(props);

    this.state = { subject: '_-1' };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.courseNum = React.createRef();
  }

  handleDrop(e) {
    this.setState({ subject: e.target.value });
  }

  handleSubmit() {
    // Trims the value and then determines if its length is = 4 and if it's all numbers.
    const courseNum = this.courseNum.current.value.trim();
    if (courseNum.length === 4 && /^\d+$/.test(courseNum) && this.state.subject !== '_-1') {
      this.props.saveCourse(this.state.subject, courseNum);
    }
  }

  handleKeyPress(e) {
    // Making the Enter button on keyboard work for Create Course button.
    if (e.charCode === 13) {
      this.handleSubmit();
      this.handleFocus();
    }
  }

  handleFocus() {
    //Select text field after Enter used.
    this.courseNum.current.select();
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="subjectDropdown">
                Subjects:
              </label>
              <select id="subjectDropdown" className="form-select" onChange={this.handleDrop}>
                {Object.keys(this.props.subjects).map(
                  function (key) {
                    return (
                      <option key={key} value={key}>
                        {this.props.subjects[key]}
                      </option>
                    );
                  }.bind(this)
                )}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="new-course-number-field">
                Course Number:
              </label>
              <input
                type="text"
                id="new-course-number-field"
                className="form-control"
                placeholder="0000"
                ref={this.courseNum}
                onKeyPress={this.handleKeyPress}
              />
            </div>
          </div>
          <div className="row">
            <br />
            <div className="col-md-12">
              <button type="button" className="btn btn-primary float-end" onClick={this.handleSubmit}>
                Create Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateCourse.propTypes = {
  subjects: PropTypes.object.isRequired,
  saveCourse: PropTypes.func.isRequired
};

class CourseSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectData: null,
      msgNotification: '',
      msgType: ''
    };

    this.getCourseData = this.getCourseData.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentDidMount() {
    this.getCourseData();
  }

  getCourseData() {
    $.ajax({
      url: 'index.php?module=intern&action=NormalCoursesRest',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ subjectData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Failed to grab subject data.');
        console.error(status, err.toString());
      }
    });
  }

  saveCourse(subjectId, courseNum) {
    $.ajax({
      url: 'index.php?module=intern&action=NormalCoursesRest&subjectId=' + subjectId + '&cnum=' + courseNum,
      type: 'POST',
      success: function () {
        this.getCourseData();

        // Create success message.
        const msg = 'Successfully added ' + this.props.subjects[subjectId] + ' ' + courseNum;
        this.setState({ msgNotification: msg, msgType: 'success' });
      }.bind(this),
      error: function (http) {
        // Create error message.
        const msg = 'Could not add ' + this.props.subjects[subjectId] + ' ' + courseNum + ' because ';
        this.setState({ msgNotification: msg + http.responseText, msgType: 'error' });
      }.bind(this)
    });
  }

  deleteCourse(id, name, courseNum) {
    $.ajax({
      url: 'index.php?module=intern&action=NormalCoursesRest&courseId=' + id,
      type: 'DELETE',
      success: function () {
        this.getCourseData();

        // Create success message.
        const msg = 'Successfully deleted ' + name + ' ' + courseNum;
        this.setState({ msgNotification: msg, msgType: 'success' });
      }.bind(this),
      error: function (http) {
        // Create error message.
        const msg = 'Could not delete ' + name + ' ' + courseNum + ' because ';
        this.setState({ msgNotification: msg + http.responseText, msgType: 'error' });
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <Notifications msg={this.state.msgNotification} msgType={this.state.msgType} />

        <div className="row">
          <div className="col-lg-5">
            <CourseList subjectData={this.state.subjectData} deleteCourse={this.deleteCourse} />
          </div>

          <div className="col-lg-5 col-lg-offset-1">
            <CreateCourse subjects={this.props.subjects} saveCourse={this.saveCourse} />
          </div>
        </div>
      </div>
    );
  }
}

CourseSelector.propTypes = {
  subjects: PropTypes.object.isRequired
};

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(<CourseSelector subjects={window.subjects} />, document.getElementById('edit_courses'));
