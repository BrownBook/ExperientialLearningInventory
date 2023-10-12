import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';

class ErrorMessagesBlock extends Component {
  render() {
    // if(this.props.errorSet == null){
    //     return '';
    // }

    //var errors = this.props.errorSet;

    return (
      <div className="row">
        <div className="col-sm-12 col-md-6 col-md-push-3">
          <div className={'alert alert-' + this.props.stat} role="alert">
            <p>
              <i className="fa fa-exclamation-circle fa-2x"></i> Success: {this.props.notif}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ErrorMessagesBlock.propTypes = {
  stat: PropTypes.string,
  notif: PropTypes.string
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      submitted: false,
      notification: null,
      notificationStatus: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      systemName: this.systemNameInput.value,
      registrarEmail: this.registrarEmailInput.value,
      gradSchoolEmail: this.gradSchoolEmailInput.value,
      backgroundCheckEmail: this.backgroundCheckEmailInput.value,
      graduateRegEmail: this.gradRegistrarEmailInput.value,
      internationalRegEmail: this.internationalRegistrarEmailInput.value,
      distanceEdEmail: this.distanceEdEmailInput.value,
      emailDomain: this.emailDomainInput.value,
      internationalOfficeEmail: this.internationalOfficeEmailInput.value,
      wsdlUri: this.wsdlUriInput.value,
      fromEmail: this.fromEmailInput.value,
      unusualCourseEmail: this.unusualCourseEmailInput.value,
      uncaughtExceptionEmail: this.uncaughtExceptionEmailInput.value,
      helpEmailAddress: this.helpEmailAddress.value
    };

    this.setState({ submitted: true }, function () {
      $.ajax({
        url: 'index.php?module=intern&action=settingsRest',
        type: 'POST',
        data,
        dataType: 'json',
        success: function () {
          const message = 'Settings have been updated.';
          const notifStatus = 'success';
          this.setState({ data, submitted: false, notification: message, notificationStatus: notifStatus });
        }.bind(this),
        error: function (xhr, status, err) {
          const message = 'Settings did not save.';
          const notifStatus = 'danger';
          this.setState({ notification: message, notificationStatus: notifStatus });
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });

    console.log(data);
  }

  componentDidMount() {
    $.ajax({
      url: 'index.php?module=intern&action=settingsRest',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ data });
      }.bind(this),
      error: function (xhr, status, err) {
        const message = 'Failed to load settings.';
        const notifStatus = 'danger';
        this.setState({ errorMessage: message, notificationStatus: notifStatus });
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    if (this.state.data === null) {
      return <div></div>;
    }

    let button = null;
    if (this.state.submitted) {
      button = (
        <button type="submit" className="btn btn-lg btn-primary pull-right" id="create-btn" disabled>
          <i className="fa fa-spinner fa-spin"></i> Saving...
        </button>
      );
    } else {
      button = (
        <button type="submit" className="btn btn-lg btn-primary pull-right" id="create-btn" onClick={this.handleSubmit}>
          Save Settings
        </button>
      );
    }

    let errorSet;
    if (this.state.notification === null) {
      errorSet = '';
    } else {
      errorSet = <ErrorMessagesBlock key="notification" notif={this.state.notification} stat={this.state.notificationStatus} />;
    }

    return (
      <div className="container">
        {errorSet}
        <h1> Admin Settings </h1>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group col-md-6">
            <label htmlFor="systemName">System Name:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.systemName}
              id="systemName"
              name="systemName"
              ref={input => (this.systemNameInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="wsdlUri">wsdlUri:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.wsdlUri}
              id="wsdlUri"
              name="wsdlUri"
              ref={input => (this.wsdlUriInput = input)}
            ></input>
          </div>
          <div className="col-md-12">
            <h2>Email Settings</h2>
            <br />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="emailDomain">Email Domain:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.emailDomain}
              id="emailDomain"
              name="emailDomain"
              ref={input => (this.emailDomainInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="registrarEmail">Registrar Email:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.registrarEmail}
              id="registrarEmail"
              name="registrarEmail"
              ref={input => (this.registrarEmailInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="gradSchoolEmail">Grad School Email:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.gradSchoolEmail}
              id="gradSchoolEmail"
              name="gradSchoolEmail"
              ref={input => (this.gradSchoolEmailInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="backgroundCheckEmail">Background Check Email:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.backgroundCheckEmail}
              id="backgroundCheckEmail"
              name="backgroundCheckEmail"
              ref={input => (this.backgroundCheckEmailInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="gradRegistrarEmail">Graduate Registrar Email:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.graduateRegEmail}
              id="gradRegistrarEmail"
              name="gradRegistrarEmail"
              ref={input => (this.gradRegistrarEmailInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="internationalRegistrarEmail">International Registrar Email:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.internationalRegEmail}
              id="internationalRegistrarEmail"
              name="internationalRegistrarEmail"
              ref={input => (this.internationalRegistrarEmailInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="distanceEdEmail">Distance Education Email:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.distanceEdEmail}
              id="distanceEdEmail"
              name="distanceEdEmail"
              ref={input => (this.distanceEdEmailInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="internationalOfficeEmail">International Office Email:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.internationalOfficeEmail}
              id="internationalOfficeEmail"
              name="internationalOfficeEmail"
              ref={input => (this.internationalOfficeEmailInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="fromEmail">From Email:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.fromEmail}
              id="fromEmail"
              name="fromEmail"
              ref={input => (this.fromEmailInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="unusualCourseEmail">Unusual Course Email:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.unusualCourseEmail}
              id="unusualCourseEmail"
              name="unusualCourseEmail"
              ref={input => (this.unusualCourseEmailInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="uncaughtExceptionEmail">Uncaught Exception Email:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.uncaughtExceptionEmail}
              id="uncaughtExceptionEmail"
              name="uncaughtExceptionEmail"
              ref={input => (this.uncaughtExceptionEmailInput = input)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="helpEmail">Get Help Button Sends to:</label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.data.helpEmailAddress}
              id="uncaughtExceptionEmail"
              name="uncaughtExceptionEmail"
              ref={input => (this.helpEmailAddress = input)}
            ></input>
          </div>
        </form>

        <div className="row">
          <div className="col-sm-12 col-md-2 ">{button}</div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  url: PropTypes.string
};

ReactDOM.render(<Settings />, document.getElementById('content'));

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}
