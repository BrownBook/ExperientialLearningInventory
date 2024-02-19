import React from 'react';
import { createRoot } from 'react-dom/client';
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap';
import Message from './Message.jsx';
import PropTypes from 'prop-types';

// !!The internshipId variable is important!!

// It's being used as a global variable from the head.js where this file is located
// to determine which internship is loaded so it can grab the emergency contacts.

/****************************
 * Modal Form
 * This uses ReactBoostrap!!
 ****************************/
class ModalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
      warningMsg: '',
      isInternational: false
    };

    this.formatPhone = this.formatPhone.bind(this);
    this.formatEmail = this.formatEmail.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // Setup refs
    this.emg_name = React.createRef();
    this.emg_relation = React.createRef();
    this.emg_phone = React.createRef();
    this.emg_email = React.createRef();
  }

  componentDidMount() {
    let cChecked;
    if (this.props.phone !== undefined && this.props.phone.charAt(0) !== '(') {
      cChecked = true;
    } else {
      cChecked = false;
    }
    this.setState({
      isInternational: cChecked
    });
  }

  formatPhone(event) {
    let input = event.target.value;
    // Strip all characters from the input except digits
    input = input.replace(/\D/g, '');

    if (!this.state.isInternational) {
      // Trim the remaining input to ten characters, to preserve phone number format
      input = input.substring(0, 10);

      // Based upon the length of the string, we add formatting as necessary
      const size = input.length;
      if (size === 0) {
        input = '';
      } else if (size < 4) {
        input = '(' + input;
      } else if (size < 7) {
        input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
      } else {
        input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + ' - ' + input.substring(6, 10);
      }
    }
    event.target.value = input;
  }

  formatEmail(input) {
    const exp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return exp.test(input);
  }

  handleSave(e) {
    e.stopPropagation();

    if (this.emg_name.current.value === '' || this.emg_relation.current.value === '' || this.emg_phone.current.value === '') {
      // If any field is left empty, it will display an error message in the modal form.
      this.setState({ showError: true, warningMsg: 'Please check to ensure all fields have been filled in.' });
      return;
    }

    // format is (111) 111 - 1111 (16 chars)
    if (!this.state.isInternational && this.emg_phone.current.value.length !== 16) {
      this.setState({ showError: true, warningMsg: 'Please use a valid phone number.' });
      return;
    }

    // If it fails the format check, show error
    if (!this.formatEmail(this.emg_email.current.value)) {
      this.setState({ showError: true, warningMsg: 'Please use a valid email.' });
      return;
    }

    this.setState({ showError: false, warningMsg: '' });

    const contact = {
      id: this.props.id,
      name: this.emg_name.current.value,
      relation: this.emg_relation.current.value,
      phone: this.emg_phone.current.value,
      email: this.emg_email.current.value
    };

    // Call parent's save handler
    this.props.handleSaveContact(contact);
  }

  handleExit(e) {
    //resets state so any warnings previously are reset.
    // e.stopPropagation();
    this.setState({
      showError: false,
      warningMsg: ''
    });
    this.props.hide();
  }

  handleChange() {
    this.setState({
      isInternational: !this.state.isInternational
    });
  }

  captureClick(e) {
    // Capture click events from the containing div so that click events
    // don't make it back to the <EmergencyContact> list item element,
    // where they can cause unexpected behavior.
    e.stopPropagation();
  }

  render() {
    return (
      <div onClick={this.captureClick}>
        <Modal show={this.props.show} onHide={this.handleExit} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Emergency Contact</Modal.Title>
            {this.state.showError ? <Message type="warning">{this.state.warningMsg}</Message> : null}
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row mb-2">
                <label className="col-lg-3 col-form-label" htmlFor="emg-name">
                  Name
                </label>
                <div className="col-lg-9">
                  <input type="text" className="form-control" id="emg-name" ref={this.emg_name} defaultValue={this.props.name} />
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-lg-3 col-form-label" htmlFor="emg-relation">
                  Relation
                </label>
                <div className="col-lg-9">
                  <input type="text" className="form-control" id="emg-relation" ref={this.emg_relation} defaultValue={this.props.relation} />
                </div>
              </div>

              <div className="row mb-2">
                <div className="offset-sm-3 col-sm-10">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="emg-international"
                      ref={this.emg_international}
                      checked={this.state.isInternational}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="emg-international" className="form-check-label">
                      International Number
                    </label>
                  </div>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-lg-3 col-form-label">Phone</label>
                <div className="col-lg-9">
                  <input type="text" className="form-control" id="emg-phone" ref={this.emg_phone} defaultValue={this.props.phone} onChange={this.formatPhone} />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-lg-3 col-form-label">Email</label>
                <div className="col-lg-9">
                  <input type="text" className="form-control" id="emg-email" ref={this.emg_email} defaultValue={this.props.email} />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSave}>Save</Button>
            <Button onClick={this.handleExit}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalForm.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  relation: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  handleSaveContact: PropTypes.func.isRequired
};

/*********************
 * Emergency Contact *
 *********************/
class EmergencyContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleSaveContact = this.handleSaveContact.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  handleSaveContact(contact) {
    this.closeModal(); // Close the modal box
    this.props.handleSave(contact); // Call parent's handleSave method
  }

  handleRemove(event) {
    // Prevents the modal trigger from occuring when presing
    // the remove button.
    event.stopPropagation();
    this.props.onContactRemove(this.props.id);
  }

  render() {
    const contactInfo = (
      <span>
        {this.props.name} {'\u2022'} {this.props.relation} {'\u2022'} {this.props.phone} {'\u2022'} {this.props.email}
      </span>
    );
    return (
      <li className="list-group-item" onClick={this.openModal} style={{ cursor: 'pointer' }}>
        {contactInfo}
        <button
          type="button"
          className="btn-close float-end"
          style={{ width: '0.5em', height: '0.5em', marginTop: '0.25em' }}
          aria-label="Remove"
          onClick={this.handleRemove}
        ></button>

        <ModalForm show={this.state.showModal} hide={this.closeModal} edit={true} handleSaveContact={this.handleSaveContact} {...this.props} />
      </li>
    );
  }
}

EmergencyContact.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  relation: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  onContactRemove: PropTypes.func.isRequired
};

class EmergencyContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emgConData: null,
      showAddModal: false
    };

    this.handleNewContact = this.handleNewContact.bind(this);
    this.onContactRemove = this.onContactRemove.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  closeAddModal() {
    this.setState({ showAddModal: false });
  }

  openAddModal() {
    this.setState({ showAddModal: true });
  }

  handleNewContact(contact) {
    this.closeAddModal(); // Close the modal box
    this.handleSave(contact); // Call parent's handleSave method
  }

  getData() {
    // Grabs the emergency contact data
    $.ajax({
      url: 'index.php?module=intern&action=emergencyContactRest&internshipId=' + this.props.internshipId,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ emgConData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Failed to load emergency contact data.');
        console.error(status, err.toString());
      }
    });
  }

  handleSave(contact) {
    // Event handler to save the comments.

    // Updates or adds a new emergency contact
    $.ajax({
      url: 'index.php?module=intern&action=emergencyContactRest',
      type: 'POST',
      dataType: 'json',
      data: {
        internshipId: this.props.internshipId,
        contactId: contact.id,
        emergency_contact_name: contact.name,
        emergency_contact_relation: contact.relation,
        emergency_contact_phone: contact.phone,
        emergency_contact_email: contact.email
      },
      success: function (data) {
        // Grabs the new data
        this.setState({ emgConData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Failed to save emergency contact data.');
        console.error(status, err.toString());
      }
    });
  }

  onContactRemove(contactId) {
    // Deletes the emergency contact.
    $.ajax({
      url: 'index.php?module=intern&action=emergencyContactRest&contactId=' + contactId + '&internshipId=' + this.props.internshipId,
      type: 'DELETE',
      dataType: 'json',
      success: function (data) {
        this.setState({ emgConData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Failed to DELETE data.');
        console.error(status, err.toString());
      }
    });
  }

  render() {
    let eData = null;
    if (this.state.emgConData != null) {
      eData = this.state.emgConData.map(
        function (conData) {
          return (
            <EmergencyContact
              key={conData.id}
              id={conData.id}
              name={conData.name}
              relation={conData.relation}
              phone={conData.phone}
              email={conData.email}
              handleSave={this.handleSave}
              onContactRemove={this.onContactRemove}
              getData={this.getData}
            />
          );
        }.bind(this)
      );
    } else {
      eData = (
        <p className="text-muted">
          <i className="fa fa-spinner fa-2x fa-spin"></i> Loading Emergency Contacts...
        </p>
      );
    }

    return (
      <div>
        <ul className="list-group mb-2">{eData}</ul>

        <div className="row mb-2">
          <div className="col-lg-12 offset-lg-9">
            <div className="form-group">
              <button type="button" className="btn btn-secondary" onClick={this.openAddModal}>
                <i className="fa-solid fa-plus"></i> Add Contact
              </button>

              <ModalForm show={this.state.showAddModal} hide={this.closeAddModal} edit={false} handleSaveContact={this.handleNewContact} id={-1} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmergencyContactList.propTypes = { internshipId: PropTypes.number.isRequired };

const root = createRoot(document.getElementById('emergency-contact-list'));
root.render(<EmergencyContactList internshipId={window.internshipId} />);

// if (process.env.NODE_ENV !== 'production') {
//   const axe = require('@axe-core/react');
//   axe(React, ReactDOM, 1000);
// }
