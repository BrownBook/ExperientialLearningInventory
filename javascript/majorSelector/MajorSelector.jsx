import React from 'react';
import { createRoot } from 'react-dom/client';
import $ from 'jquery';
import classNames from 'classnames';

import MajorsDropDown from './MajorsDropDown.jsx';

class MajorSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      undergrad: false,
      graduate: false,
      availableUndergradMajors: false,
      availableGradMajors: false,
      hasError: false
    };

    this.undergrad = this.undergrad.bind(this);
    this.graduate = this.graduate.bind(this);
    this.anyLevel = this.anyLevel.bind(this);
  }

  componentDidMount() {
    // Fetch list of available undergrad majors
    $.ajax({
      url: 'index.php?module=intern&action=GetUndergradMajors',
      dataType: 'json',
      success: function (data) {
        this.setState({ availableUndergradMajors: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }
    });

    // Fetch list of available graduate majors
    $.ajax({
      url: 'index.php?module=intern&action=GetGraduateMajors',
      dataType: 'json',
      success: function (data) {
        this.setState({ availableGradMajors: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  }

  undergrad() {
    this.setState({ undergrad: true, graduate: false });
  }

  graduate() {
    this.setState({ undergrad: false, graduate: true });
  }

  anyLevel() {
    this.setState({ undergrad: false, graduate: false });
  }

  render() {
    let majorsDropdown;

    if (!this.state.undergrad && !this.state.graduate) {
      majorsDropdown = <MajorsDropDown formStyle="horizontal" />;
    } else if (this.state.undergrad) {
      majorsDropdown = <MajorsDropDown key="undergradMajors" majors={this.state.availableUndergradMajors} level="ugrad" formStyle="horizontal" />;
    } else {
      majorsDropdown = <MajorsDropDown key="gradMajors" majors={this.state.availableGradMajors} level="grad" formStyle="horizontal" />;
    }

    const anyLevelClass = classNames({
      btn: true,
      'btn-outline-secondary': true,
      active: !this.state.undergrad && !this.state.graduate
    });

    const undergradLevelClass = classNames({
      btn: true,
      'btn-outline-secondary': true,
      active: this.state.undergrad
    });

    const graduateLevelClass = classNames({
      btn: true,
      'btn-outline-secondary': true,
      active: this.state.graduate
    });

    return (
      <div>
        <div className="row mb-3">
          <label className="col-lg-3 col-form-label" htmlFor="level">
            Level
          </label>
          <div className="col-lg-8">
            <div className="btn-group">
              <input
                type="radio"
                name="level"
                value="-1"
                style={{ position: 'absolute', clip: 'rect(0, 0, 0, 0)' }}
                onClick={this.anyLevel}
                id="level-btn-any"
                className="btn-check"
              />
              <label htmlFor="level-btn-any" className={anyLevelClass}>
                Any Level
              </label>

              <input
                type="radio"
                name="level"
                value="ugrad"
                style={{ position: 'absolute', clip: 'rect(0, 0, 0, 0)' }}
                onClick={this.undergrad}
                id="level-btn-ugrad"
                className="btn-check"
              />
              <label htmlFor="level-btn-ugrad" className={undergradLevelClass}>
                Undergraduate
              </label>

              <input
                type="radio"
                name="level"
                value="grad"
                style={{ position: 'absolute', clip: 'rect(0, 0, 0, 0)' }}
                onClick={this.graduate}
                id="level-btn-grad"
                className="btn-check"
              />
              <label htmlFor="level-btn-grad" className={graduateLevelClass}>
                Graduate
              </label>
            </div>
          </div>
        </div>

        {majorsDropdown}
      </div>
    );
  }
}

const root = createRoot(document.getElementById('MajorSelector'));
root.render(<MajorSelector />);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, root, 1000);
}
