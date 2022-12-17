import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

class AddData extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.addDataRef = React.createRef();
  }

  handleClick() {
    this.props.onCreate(this.addDataRef.current.value.trim());
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
                <label>{this.props.panelTitle}</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <input type="text" className="form-control" ref={this.addDataRef} />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <button className="btn btn-default btn-md" onClick={this.handleClick}>
                    {this.props.buttonTitle}
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
  panelTitle: PropTypes.string,
  buttonTitle: PropTypes.string,
  onCreate: PropTypes.func
};

class DisplayData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.savedDataRef = React.createRef();
  }

  handleEdit() {
    this.setState({ editMode: true });
  }

  handleHide() {
    this.props.onHidden(this.props.hidden, this.props.id);
  }

  handleSave() {
    this.setState({ editMode: false });

    // Grabs the value in the textbox
    let newName = this.savedDataRef.current.value.trim();

    if (newName === '') {
      newName = this.props.name;
    }

    this.props.onSave(this.props.name, newName, this.props.id);
  }

  render() {
    let name = null;
    let hButton = null;
    // Determines which element to show on the page (hide/show and Save/Edit)
    if (this.props.hidden === 0) {
      name = this.props.name;
      hButton = (
        <button className="btn btn-default btn-xs" type="submit" onClick={this.handleHide}>
          {' '}
          Hide{' '}
        </button>
      );
    } else {
      name = (
        <span className="text-muted">
          <em> {this.props.name} </em>
        </span>
      );
      hButton = (
        <button className="btn btn-default btn-xs" type="submit" onClick={this.handleHide}>
          {' '}
          Show{' '}
        </button>
      );
    }

    let text = null;
    let eButton = null;
    if (this.state.editMode) {
      //var eName = 'Save';
      text = (
        <div id={this.props.id}>
          <input type="text" className="form-control" defaultValue={this.props.name} ref={this.savedDataRef} />
        </div>
      );

      eButton = (
        <button className="btn btn-default btn-xs" type="submit" onClick={this.handleSave}>
          {' '}
          Save{' '}
        </button>
      );
    } else {
      //var eName = 'Edit';
      text = name;

      eButton = (
        <button className="btn btn-default btn-xs" type="submit" onClick={this.handleEdit}>
          {' '}
          Edit{' '}
        </button>
      );
    }

    return (
      <tr>
        <td>{text}</td>
        <td>{eButton}</td>
        <td>{hButton}</td>
      </tr>
    );
  }
}

DisplayData.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  hidden: PropTypes.any,
  onSave: PropTypes.any,
  onHidden: PropTypes.any
};

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainData: null,
      errorWarning: '',
      success: ''
    };

    this.getData = this.getData.bind(this);
    this.onHidden = this.onHidden.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    $.ajax({
      url: 'index.php?module=intern&action=' + this.props.ajaxURL,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ mainData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Sorry, there was a problem fetching data from the server.');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  onHidden(val, id) {
    // Hides the selected value
    if (val === 0) {
      val += 1;
    } else {
      val += -1;
    }

    $.ajax({
      url: 'index.php?module=intern&action=' + this.props.ajaxURL + '&val=' + val + '&id=' + id,
      type: 'PUT',
      success: function () {
        this.getData();
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Sorry, there was a problem fetching data from the server.');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  onSave(orgName, newName, id) {
    const cleanName = encodeURIComponent(newName);

    // Saves the value into the database
    $.ajax({
      url: 'index.php?module=intern&action=' + this.props.ajaxURL + '&name=' + cleanName + '&id=' + id,
      type: 'PUT',
      success: function (data) {
        // Determines if the values have changed and if so, continues
        // with the changes.
        if (orgName !== newName) {
          $('#success').show();
          const added = 'Updated ' + orgName + ' to ' + newName + '.';
          this.setState({ success: added });
        }
        this.getData();
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Sorry, there was a problem fetching data from the server.');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  onCreate(name) {
    // Creates a new value
    $.ajax({
      url: 'index.php?module=intern&action=' + this.props.ajaxURL + '&create=' + name,
      type: 'POST',
      success: function (data) {
        // Shows a success message for the new value being added.
        $('#success').show();
        const added = 'Added ' + name + '.';
        this.setState({ success: added });
        this.getData();
      }.bind(this),
      error: function (http) {
        const errorMessage = http.responseText;
        this.setState({ errorWarning: errorMessage });
        $('#warningError').show();
      }.bind(this)
    });
  }

  render() {
    let data = null;
    let description = null;
    if (this.state.mainData != null) {
      const onHidden = this.onHidden;
      const onSave = this.onSave;
      data = this.state.mainData.map(function (data) {
        if (data.name == null) {
          description = data.description;
        } else {
          description = data.name;
        }
        return <DisplayData key={data.id} id={data.id} name={description} hidden={data.hidden} onHidden={onHidden} onSave={onSave} />;
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
            <h1> {this.props.title} </h1>
            <table className="table table-condensed table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Options</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </table>
          </div>
          <AddData onCreate={this.onCreate} buttonTitle={this.props.buttonTitle} panelTitle={this.props.panelTitle} />
        </div>
      </div>
    );
  }
}

Manager.propTypes = {
  url: PropTypes.string,
  buttonTitle: PropTypes.string,
  panelTitle: PropTypes.string,
  title: PropTypes.string,
  ajaxURL: PropTypes.string
};

export default Manager;
