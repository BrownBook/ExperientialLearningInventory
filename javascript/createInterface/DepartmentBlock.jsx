import React from 'react';
import $ from 'jquery';
import classNames from 'classnames';

/***********************
 * Department Dropdown *
 ***********************/
class Department extends React.Component {
  constructor(props) {
    super(props);

    this.state = { departments: null, hasError: false };
  }

  setError(status) {
    this.setState({ hasError: status });
  }

  componentDidMount() {
    $.ajax({
      url: 'index.php?module=intern&action=GetDepartments',
      dataType: 'json',
      success: function (data) {
        this.setState({ departments: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  }

  render() {
    const departments = this.state.departments;

    if (departments === null) {
      return <div></div>;
    }

    const fgClasses = classNames({
      'form-group': true,
      'has-error': this.state.hasError
    });

    return (
      <div className="row mb-2">
        <div className="col-sm-12 col-md-8">
          <div className={fgClasses} id="department">
            <label htmlFor="department2" className="form-label">
              Department
            </label>
            <select id="department2" name="department" className="form-select" defaultValue="-1">
              {Object.keys(departments).map(function (key) {
                return (
                  <option key={key} value={key}>
                    {departments[key]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Department;
