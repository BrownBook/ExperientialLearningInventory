import React from 'react';
import { createRoot } from 'react-dom/client';
import classNames from 'classnames';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import StudentSearch from './StudentSearch.jsx';
import TermBlock from './TermBlock.jsx';
import LocationBlock from './LocationBlock.jsx';
import Department from './DepartmentBlock.jsx';
import PropTypes from 'prop-types';

/*********************
 * Host Agency Field *
 *********************/
class HostAgency extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  setError(status) {
    this.setState({ hasError: status });
  }

  render() {
    const fgClasses = classNames({
      'form-group': true,
      'has-error': this.state.hasError
    });

    return (
      <div className="row mb-4">
        <div className="col-sm-12 col-md-8">
          <div className={fgClasses} id="agency">
            <label htmlFor="agency2" className="form-label">
              Experiential Learning Host
            </label>
            <input type="text" id="agency2" name="agency" className="form-control" placeholder="Acme, Inc." />
          </div>
        </div>
      </div>
    );
  }
}

/*****************
 * Submit Button *
 *****************/
class CreateInternshipButton extends React.Component {
  render() {
    let button = null;
    if (this.props.submitted) {
      button = (
        <button type="submit" className="btn btn-lg btn-primary float-end" id="create-btn" disabled>
          <i className="fa fa-spinner fa-spin"></i> Saving...
        </button>
      );
    } else {
      button = (
        <button type="submit" className="btn btn-lg btn-primary float-end" id="create-btn" onClick={this.handleClick}>
          Create Activity
        </button>
      );
    }
    return (
      <div className="row">
        <div className="col-sm-12 col-md-10">{button}</div>
      </div>
    );
  }
}

CreateInternshipButton.propTypes = {
  submitted: PropTypes.bool.isRequired
};

class ErrorMessagesBlock extends React.Component {
  render() {
    if (this.props.errors === null) {
      return '';
    }

    const errors = this.props.errors.map(function (message, i) {
      return <li key={i}>{message}</li>;
    });

    return (
      <div className="row">
        <div className="col-sm-12 col-md-10">
          <div className="alert alert-danger" role="alert">
            <p>
              <i className="fa-solid fa-exclamation-circle"></i> Please select values for the following fields:{' '}
            </p>
            <ul>{errors}</ul>
          </div>
        </div>
      </div>
    );
  }
}

ErrorMessagesBlock.propTypes = {
  errors: PropTypes.array.isRequired
};

/*********************************
 * Top level Interface Component *
 *********************************/
class CreateInternshipInterface extends React.Component {
  constructor(props) {
    super(props);

    this.state = { submitted: false, errorMessages: null };

    this.handleSubmit = this.handleSubmit.bind(this);

    this.studentSearchRef = React.createRef();
    this.termBlockRef = React.createRef();
    this.locationBlockRef = React.createRef();
    this.departmentRef = React.createRef();
    this.hostAgencyRef = React.createRef();
  }

  // Top-level onSubmit handler for the creation form
  handleSubmit(e) {
    // Stop the browser from immediately sending the post
    e.preventDefault();

    // Set submitted=true on the state to disable submit button and prevent double-submission
    const thisComponent = this; // Save a reference to 'this' for later use
    const formElement = e.target; // Save a reference to the form DOM nodes that were submitted

    this.setState({ submitted: true, errorMessages: null }, function () {
      // After disabling submit buttons, use callback to validate the data
      if (!this.validate(formElement, thisComponent)) {
        // If the data doesn't validate, wait a second before re-enabling the submit button
        // This makes sure the user sees the "Creating..." spinner, instead of it re-rendering
        // so fast that they don't think it did anything
        setTimeout(function () {
          thisComponent.setState({ submitted: false });
        }, 1000);

        return;
      }

      // If we get here, then validation was successful
      formElement.submit();
    });
  }

  validate(form, thisComponent) {
    // Assume everything is valid, change this if we detect otherwise
    let valid = true;
    const errors = [];

    // Check the student Component
    if (form.elements.studentId.value === '' || !thisComponent.studentSearchRef.current.studentFound()) {
      thisComponent.studentSearchRef.current.setError(true);
      errors.push('Student ID');
      valid = false;
    } else {
      thisComponent.studentSearchRef.current.setError(false);
    }

    // Check the term
    if (form.elements.term.value === '') {
      thisComponent.termBlockRef.current.setError(true);
      errors.push('Term');
      valid = false;
    } else {
      thisComponent.termBlockRef.current.setError(false);
    }

    // Check the location
    if (form.elements.location.value === '') {
      thisComponent.locationBlockRef.current.setError(true);
      errors.push('Location');
      valid = false;
    } else {
      thisComponent.locationBlockRef.current.setError(false);
    }

    // Check the location's state/internal drop down's value
    if (form.elements.location.value === 'domestic') {
      if (form.elements.state.value === '-1') {
        thisComponent.locationBlockRef.current.stateDropDown.setError(true);
        errors.push('State');
        valid = false;
      } else {
        thisComponent.locationBlockRef.current.stateDropDown.setError(false);
      }
    } else if (form.elements.location.value === 'international') {
      if (form.elements.country.value === '-1') {
        thisComponent.locationBlockRef.current.countryDropDown.setError(true);
        errors.push('Country');
        valid = false;
      } else {
        thisComponent.locationBlockRef.current.countryDropDown.setError(false);
      }
    }

    // Check the department
    if (form.elements.department.value === '_-1') {
      thisComponent.departmentRef.current.setError(true);
      valid = false;
      errors.push('Department');
    } else {
      thisComponent.departmentRef.current.setError(false);
    }

    // Check the host agency
    if (form.elements.agency.value === '') {
      thisComponent.hostAgencyRef.current.setError(true);
      valid = false;
      errors.push('Host Agency');
    } else {
      thisComponent.hostAgencyRef.current.setError(false);
    }

    if (errors.length !== 0) {
      thisComponent.setErrorMessages(errors);
    }

    return valid;
  }

  setErrorMessages(messages) {
    this.setState({ errorMessages: messages });
  }

  render() {
    let errors;
    if (this.state.errorMessages == null) {
      errors = null;
    } else {
      errors = (
        <CSSTransition timeout={{ enter: 500, exit: 0 }} classNames="example">
          <ErrorMessagesBlock key="errorSet" errors={this.state.errorMessages} />
        </CSSTransition>
      );
    }

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form id="newInternshipForm" className="form-protected" action="index.php" method="post" onSubmit={this.handleSubmit}>
            <input type="hidden" name="module" value="intern" />
            <input type="hidden" name="action" value="AddInternship" />

            <TransitionGroup>{errors}</TransitionGroup>

            <StudentSearch ref={this.studentSearchRef} />

            <TermBlock ref={this.termBlockRef} />

            <LocationBlock ref={this.locationBlockRef} />

            <Department ref={this.departmentRef} />

            <HostAgency ref={this.hostAgencyRef} />

            <CreateInternshipButton submitted={this.state.submitted} />
          </form>
        </div>
      </div>
    );
  }
}

const root = createRoot(document.getElementById('createInternshipInterface'));
root.render(<CreateInternshipInterface />);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, root, 1000);
}
