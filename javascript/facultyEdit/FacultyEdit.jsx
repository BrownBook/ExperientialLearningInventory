import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';

import { Button, Modal } from 'react-bootstrap';

/**
 * Search form for looking up faculty by banner id.
 */
class BannerSearch extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.bannerIdRef = React.createRef();
  }

  handleSearch() {
    const bannerId = this.bannerIdRef.current.value.trim();

    // TODO: Not all schools use nine character bannerIDs, so may need to reconsider this
    if (bannerId.length === 9) {
      this.props.handleSearch(bannerId);
    } else {
      // TODO: show an error alert for invalid format (banner ID must be nine digits)
      this.props.showNotification('Invalid banner ID format: ID must be nine digits');
    }
  }

  onKeyPress(event) {
    // Capture the enter key and activate searching
    if (event.charCode === 13) {
      this.handleSearch();
    }
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="bannerId-search">Faculty Member&apos;s ID Number</label>
          <input type="text" id="bannerId-search" className="form-control" ref={this.bannerIdRef} placeholder="Banner ID" onKeyPress={this.onKeyPress} />
        </div>
        <div className="form-group pull-right">
          <Button onClick={this.handleSearch}>Search</Button>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

BannerSearch.propTypes = {
  handleSearch: PropTypes.func,
  showNotification: PropTypes.func
};

/**
 * Form for editing faculty details
 */
class FacultyForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);

    this.facultyEditIdRef = React.createRef();
    this.facultyEditUsernameRef = React.createRef();
    this.facultyEditFirstNameRef = React.createRef();
    this.facultyEditLastNameRef = React.createRef();
    this.facultyEditPhoneRef = React.createRef();
    this.facultyEditStreetAddress1Ref = React.createRef();
    this.facultyEditStreetAddress2Ref = React.createRef();
    this.facultyEditCityRef = React.createRef();
    this.facultyEditStateRef = React.createRef();
    this.facultyEditZipRef = React.createRef();
  }

  // Event handler for Save button. Captures the data and passes
  // it as an object to the parent's handleSave() method.
  handleSave() {
    this.props.handleSave({
      id: this.facultyEditIdRef.current.value,
      username: this.facultyEditUsernameRef.current.value,
      first_name: this.facultyEditFirstNameRef.current.value,
      last_name: this.facultyEditLastNameRef.current.value,
      phone: this.facultyEditPhoneRef.current.value,
      street_address1: this.facultyEditStreetAddress1Ref.current.value,
      street_address2: this.facultyEditStreetAddress2Ref.current.value,
      city: this.facultyEditCityRef.current.value,
      state: this.facultyEditStateRef.current.value,
      zip: this.facultyEditZipRef.current.value
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="faculty-edit-id">Banner ID:&nbsp;</label>
                <input type="text" className="form-control" id="faculty-edit-id" ref={this.facultyEditIdRef} defaultValue={this.props.facultyData.id} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label" htmlFor="faculty-edit-username">
                  Username:&nbsp;
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ffaculty-edit-username"
                  ref={this.facultyEditUsernameRef}
                  defaultValue={this.props.facultyData.username}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="faculty-edit-first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="faculty-edit-first_name"
                ref={this.facultyEditFirstNameRef}
                defaultValue={this.props.facultyData.first_name}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="faculty-edit-last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="faculty-edit-last_name"
                ref={this.facultyEditLastNameRef}
                defaultValue={this.props.facultyData.last_name}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="faculty-edit-phone">Phone</label>
              <input type="text" className="form-control" id="faculty-edit-phone" ref={this.facultyEditPhoneRef} defaultValue={this.props.facultyData.phone} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="faculty-edit-street_address1">Address</label>
            <input
              type="text"
              className="form-control"
              id="faculty-edit-street_address1"
              ref={this.facultyEditStreetAddress1Ref}
              defaultValue={this.props.facultyData.street_address1}
            />
          </div>

          <div className="form-group">
            <label htmlFor="faculty-edit-street_address2">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              id="faculty-edit-street_address2"
              ref={this.facultyEditStreetAddress2Ref}
              defaultValue={this.props.facultyData.street_address2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="faculty-edit-city">City</label>
            <input type="text" className="form-control" id="faculty-edit-city" ref={this.facultyEditCityRef} defaultValue={this.props.facultyData.city} />
          </div>

          <div className="form-group">
            <label htmlFor="faculty-edit-state">State</label>
            <input type="text" className="form-control" id="faculty-edit-state" ref={this.facultyEditStateRef} defaultValue={this.props.facultyData.state} />
          </div>

          <div className="form-group">
            <label htmlFor="faculty-edit-zip">Zip</label>
            <input type="text" className="form-control" id="faculty-edit-zip" ref={this.facultyEditZipRef} defaultValue={this.props.facultyData.zip} />
          </div>

          <Button bsStyle="primary" onClick={this.handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    );
  }
}

FacultyForm.propTypes = {
  handleSave: PropTypes.func,
  facultyData: PropTypes.object
};

// Modal Pop-up for adding/editing faculty members
// !This uses ReactBoostrap!
class FacultyModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    this.handleSave = this.handleSave.bind(this);
    this.clearStateAndHide = this.clearStateAndHide.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  getInitialState() {
    return {
      errorWarning: '',
      showModalNotification: false,
      showModalForm: false,
      showModalSearch: true
    };
  }

  componentDidMount() {
    // Used for editing a user (see edit handler).
    // Disables/enables modal form and then grabs and displays the data.
    if (this.props.edit === true) {
      this.setState({ showModalForm: true, showModalSearch: false });
      this.props.getFacultyDetails(this.props.id);
    }
  }

  clearStateAndHide() {
    this.setState(this.getInitialState());
    this.props.hide();
  }

  addFacultyToDept(facultyData) {
    // Connects the faculty member and the department together.

    const idNum = facultyData.id;
    const departNum = this.props.deptNum;

    $.ajax({
      url: 'index.php?module=intern&action=facultyDeptRest&faculty_id=' + idNum + '&department_id=' + departNum,
      type: 'POST',
      success: function () {
        this.props.getDeptFaculty(departNum);
      }.bind(this),
      error: function (xhr, status, err) {
        alert("Sorry, looks like something went wrong. We couldn't save your changes.");
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleSearch(bannerId) {
    this.setState({ errorWarning: '' });
    this.props.getFacultyDetails(bannerId);
  }

  handleSave(facultyData) {
    // Saves the faculty data.
    $.ajax({
      url: 'index.php?module=intern&action=restFacultyById',
      type: 'PUT',
      processData: false,
      dataType: 'json',
      data: JSON.stringify(facultyData),
      success: function (data) {
        // Calls addFacultyToDept() and then closes the Modal Form.

        // If we're not editing this faculty, then we're adding a new faculty
        // So we need to create the faculty -> department association
        if (!this.props.edit) {
          this.addFacultyToDept(data);
        }

        if (this.props.edit) {
          const departNum = this.props.deptNum;
          this.props.getDeptFaculty(departNum);

          this.props.hide();
        } else {
          this.clearStateAndHide();
        }
      }.bind(this),
      error: function (xhr, status, err) {
        alert("Sorry, looks like something went wrong. We couldn't save your changes.");
        console.error(status, err.toString());
      }
    });
  }

  showNotification(msg) {
    this.setState({ errorWarning: msg });
  }

  render() {
    // Warning notification for invalid Banner size or Banner ID
    const notification = (
      <div className="alert alert-warning" role="alert">
        {this.state.errorWarning !== '' ? this.state.errorWarning : this.props.errorWarning}
      </div>
    );

    // Search bar for inputting the Banner ID
    const searchBanner = <BannerSearch handleSearch={this.handleSearch} showNotification={this.showNotification} />;

    // Modal Form used to show and update the data. This could look better...
    const modalForm = <FacultyForm facultyData={this.props.facultyData} handleSave={this.handleSave} />;

    let title = null;
    let onHideMethod = null;
    if (this.props.edit) {
      title = 'Edit Faculty Details';
      onHideMethod = this.props.hide;
    } else {
      title = 'Add a Facutly Member';
      onHideMethod = this.clearStateAndHide;
    }

    return (
      <Modal show={this.props.show} onHide={onHideMethod} animation={true} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.state.errorWarning !== '' || this.props.errorWarning !== '' ? notification : null}
          {this.props.showModalSearch ? searchBanner : null}
          {this.props.showModalForm ? modalForm : null}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.clearStateAndHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

FacultyModal.propTypes = {
  id: PropTypes.string,
  showModalSearch: PropTypes.bool,
  showModalForm: PropTypes.bool,
  errorWarning: PropTypes.string,
  edit: PropTypes.bool,
  show: PropTypes.bool,
  hide: PropTypes.func,
  facultyData: PropTypes.any,
  url: PropTypes.string,
  getDeptFaculty: PropTypes.func,
  getFacultyDetails: PropTypes.func.isRequired,
  deptNum: PropTypes.string.isRequired
};

class FacultyTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      userData: null,
      showModalSearch: false,
      showModalForm: true,
      errorWarning: ''
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getFacultyDetails = this.getFacultyDetails.bind(this);
  }

  getFacultyDetails(idNum) {
    // Grabs the facuitly data from restFacultyById and sets the
    // data to the state as well as setting the modal form to true and false.
    $.ajax({
      url: 'index.php?module=intern&action=restFacultyById&id=' + idNum,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ userData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleRemove() {
    this.props.onFacultyRemove(this.props.id);
  }

  handleEdit() {
    if (this.state.userData == null) {
      this.getFacultyDetails(this.props.id);
    }
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    // Creates each row for the name, banner ID, a button with a trigger for modal to edit, and a delete button.
    return (
      <tr>
        <td>
          {this.props.fname} {this.props.lname}
        </td>
        <td>{this.props.id}</td>
        <td>
          <a onClick={this.handleEdit}>
            <i className="fa fa-pencil-square-o" />
          </a>
        </td>
        <td>
          <a onClick={this.handleRemove}>
            <i className="fa fa-trash-o" />
          </a>
        </td>
        <td>
          <FacultyModal
            show={this.state.showModal}
            hide={this.hideModal}
            edit={true}
            deptNum={this.props.deptNum}
            id={this.props.id}
            facultyData={this.state.userData}
            showModalSearch={this.state.showModalSearch}
            showModalForm={this.state.showModalForm}
            getFacultyDetails={this.getFacultyDetails}
            errorWarning={this.state.errorWarning}
            getDeptFaculty={this.props.getDeptFaculty}
          />
        </td>
      </tr>
    );
  }
}

FacultyTableRow.propTypes = {
  id: PropTypes.string,
  deptNum: PropTypes.string,
  fname: PropTypes.string,
  lname: PropTypes.string,
  getDeptFaculty: PropTypes.func,
  onFacultyRemove: PropTypes.func,
  url: PropTypes.string
};

class DepartmentList extends React.Component {
  render() {
    // Creates each department in the dropdown
    return <option value={this.props.id}>{this.props.name}</option>;
  }
}

DepartmentList.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string
};

class FacultyTable extends React.Component {
  render() {
    let faculty = null;
    if (this.props.tableData != null) {
      if (this.props.tableData.length > 0) {
        // Maps the table data so that it will create a row for each faculty member
        faculty = this.props.tableData.map(function (faculty) {
          return (
            <FacultyTableRow
              key={faculty.id}
              fname={faculty.first_name}
              lname={faculty.last_name}
              id={faculty.id}
              onFacultyRemove={this.props.onFacultyRemove}
              getDeptFaculty={this.props.getDeptFaculty}
              deptNum={this.props.deptNum}
            />
          );
        });
      } else {
        // Sets the table with a message stating that there isn't data in the department.
        faculty = (
          <tr>
            <td colSpan="4">
              <span className="text-muted">
                <em>No department data exists for this department</em>
              </span>
            </td>
          </tr>
        );
      }
    } else {
      faculty = '';
    }

    return (
      <div>
        <table className="table table-condensed table-striped">
          <thead>
            <tr>
              <th>Fullname</th>
              <th>ID</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{faculty}</tbody>
        </table>
      </div>
    );
  }
}

FacultyTable.propTypes = {
  tableData: PropTypes.any,
  deptNum: PropTypes.string,
  getDeptFaculty: PropTypes.func,
  onFacultyRemove: PropTypes.func
};

class EditFaculty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropData: null,
      deptData: null,
      facultyData: null,
      showTable: false,
      showModalForm: false,
      showModalSearch: true,
      errorWarning: '',
      deptNum: -1,
      showPopup: false
    };

    this.onFacultyRemove = this.onFacultyRemove.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getFacultyDetails = this.getFacultyDetails.bind(this);
    this.getDeptFaculty = this.getDeptFaculty.bind(this);
  }

  componentDidMount() {
    // Setting the department data in the state
    // for the dropdown box.
    this.getData();
  }

  getData() {
    // Gets the list of departments which the current user has access to
    $.ajax({
      url: 'index.php?module=intern&action=facultyDeptRest',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ dropData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Failed to grab data.');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  getDeptFaculty(departmentId) {
    // Gets the Faculty list for the department selected by the user.
    // Sets the state for the faculty data and department Id.
    $.ajax({
      url: 'index.php?module=intern&action=getFacultyListForDept&department=' + departmentId,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ deptData: data, deptNum: departmentId });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Failed to grab data.');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  onFacultyRemove(idNum) {
    // 'Deletes' the user from the association with the designated department.
    $.ajax({
      url: 'index.php?module=intern&action=facultyDeptRest&faculty_id=' + idNum + '&department_id=' + this.state.deptNum,
      type: 'DELETE',
      success: function () {
        this.getDeptFaculty(this.state.deptNum);
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Failed to DELETE data.');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  getFacultyDetails(idNum) {
    // Grabs the facuitly data from restFacultyById and sets the
    // data to the state as well as setting the modal form to true and false.
    $.ajax({
      url: 'index.php?module=intern&action=restFacultyById&id=' + idNum,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ facultyData: data, showModalSearch: false, showModalForm: true, errorWarning: '' });
      }.bind(this),
      error: function (xhr, status, err) {
        // if(xhr.status === 404){
        //     // Handle the case where we couldn't find anyone with that banner ID
        //     warning = "We couldn't find anyone with that Banner ID.";
        //     this.setState({errorWarning:warning})
        //     return;
        // }

        const warning = "Sorry, we couldn't load the details for that faculty member. Please enter the data manually.";
        const emptyData = {
          id: '',
          username: '',
          first_name: '',
          last_name: '',
          phone: '',
          street_address1: '',
          street_address2: '',
          city: '',
          state: '',
          zip: ''
        };
        this.setState({ errorWarning: warning, showModalSearch: false, showModalForm: true, facultyData: emptyData });
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleDrop(e) {
    // Event handler for the dropdown box, shows the table if the department is not 'select a department'
    if (e.target.value === -1) {
      this.setState({ showTable: false, facultyData: null });
    } else {
      const departmentId = e.target.value;
      this.setState({ showTable: true });
      this.getDeptFaculty(departmentId);
    }
  }

  showModal() {
    this.setState({ showPopup: true, showModalSearch: true, showModalForm: false });
  }

  hideModal() {
    this.setState({ showPopup: false });
  }

  render() {
    let dData = null;
    if (this.state.dropData != null) {
      // Maps the dropdown department data and calls the DepartmentList class
      dData = this.state.dropData.map(function (dept) {
        return <DepartmentList key={dept.id} name={dept.name} id={dept.id} />;
      });
    } else {
      dData = '';
    }

    let facultyTable = null;
    let addFaculty = null;
    if (this.state.deptData != null) {
      facultyTable = (
        <FacultyTable
          tableData={this.state.deptData}
          onFacultyRemove={this.onFacultyRemove}
          getDeptFaculty={this.getDeptFaculty}
          deptNum={this.state.deptNum}
        />
      );

      // ReactBoostrap Modal Trigger using a button that calls the Modal class below.
      addFaculty = (
        <button className="btn btn-success" onClick={this.showModal}>
          <i className="fa fa-user-plus"></i> Add Faculty Member
        </button>
      );
    } else {
      facultyTable = '';
      addFaculty = '';
    }

    return (
      <div className="search">
        <div id="warningError" className="alert alert-warning alert-dismissible" role="alert" hidden>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Warning!</strong> {this.state.errorWarning}
        </div>

        <div className="row">
          <div className="col-md-5">
            <h2> Faculty Members </h2>
            <div className="row">
              <div className="col-md-8">
                <label>Departments:</label>
                <select className="form-control" onChange={this.handleDrop}>
                  {dData}
                </select>
              </div>
            </div>

            <br />
            <div className="row">
              <div className="col-md-10">{this.state.showTable ? facultyTable : null}</div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          {this.state.showTable ? addFaculty : null}
        </div>

        <FacultyModal
          show={this.state.showPopup}
          hide={this.hideModal}
          deptNum={this.state.deptNum}
          getDeptFaculty={this.getDeptFaculty}
          showModalSearch={this.state.showModalSearch}
          showModalForm={this.state.showModalForm}
          facultyData={this.state.facultyData}
          getFacultyDetails={this.getFacultyDetails}
          errorWarning={this.state.errorWarning}
        />
      </div>
    );
  }
}

EditFaculty.propTypes = {
  url: PropTypes.string
};

ReactDOM.render(<EditFaculty />, document.getElementById('content'));
