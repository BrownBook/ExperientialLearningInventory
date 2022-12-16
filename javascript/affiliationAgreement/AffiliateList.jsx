import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class ErrorMessagesBlock extends React.Component {
  render() {
    if (this.props.errors === null) {
      return '';
    }

    const errors = this.props.errors;

    return (
      <div className="row">
        <div className="col-sm-12 col-md-6 col-md-push-3">
          <div className="alert alert-warning" role="alert">
            <p>
              <i className="fa fa-exclamation-circle fa-2x"></i> Warning: {errors}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ErrorMessagesBlock.propTypes = {
  errors: PropTypes.string
};

class DepartmentList extends React.Component {
  render() {
    return <option value={this.props.id}>{this.props.name}</option>;
  }
}

DepartmentList.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string
};

class ShowAffiliate extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onShowAffiliate = this.onShowAffiliate.bind(this);
  }

  handleChange() {
    this.props.onShowAffiliate(this.props.id);
  }

  onShowAffiliate() {
    window.location = 'index.php?module=intern&action=showAffiliateEditView&affiliation_agreement_id=' + this.props.id;
  }

  render() {
    const b = new Date().getTime();
    const a = new Date(this.props.end_date * 1000);
    const year = a.getFullYear();
    const month = a.getMonth() + 1;
    const date = a.getDate();
    const dateForm = month + '/' + date + '/' + year;
    let active = 'Active';

    let green = false;
    let yellow = false;
    let red = false;

    const expiration = (a - b) / 1000;

    if (this.props.auto_renew) {
      green = true;
      active = 'Active (auto-renewed)';
    } else if (expiration < 0) {
      red = true;
      active = 'Expired';
    } else if (expiration < 7884000) {
      yellow = true;
    } else {
      green = true;
    }

    const alertClass = classNames({
      'alert-danger': red,
      'alert-success': green,
      'alert-warning': yellow
    });

    return (
      <tr role="button" id={this.props.id} className={alertClass} onClick={this.onShowAffiliate} key={this.props.id}>
        <td>{this.props.name}</td>
        <td>{dateForm}</td>
        <td>{active}</td>
      </tr>
    );
  }
}

ShowAffiliate.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  auto_renew: PropTypes.any,
  end_date: PropTypes.any,
  onShowAffiliate: PropTypes.func
};

// Main module that calls several components to build
// the affiliate agreements list screen.
class AffiliateList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mainData: null,
      displayData: null,
      deptData: null,
      errorWarning: null,
      messageType: null,
      searchDept: null,
      searchName: '',
      textData: '',
      sortBy: '',
      showFilter: ''
    };

    this.getData = this.getData.bind(this);
    this.getDept = this.getDept.bind(this);
    this.onSearchListChange = this.onSearchListChange.bind(this);
    this.searchListByDept = this.searchListByDept.bind(this);
    this.onSortByChange = this.onSortByChange.bind(this);
    this.onShow = this.onShow.bind(this);
    this.updateDisplayData = this.updateDisplayData.bind(this);
  }

  componentDidMount() {
    // Grabs department and affiliate agreement
    // data at start of execution.
    this.getData();
    this.getDept();
  }

  getData() {
    $.ajax({
      url: 'index.php?module=intern&action=AffiliateListRest',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ mainData: data, displayData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Failed to grab displayed data.');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  getDept() {
    //Fetch list of departments
    $.ajax({
      url: 'index.php?module=intern&action=deptRest',
      action: 'GET',
      dataType: 'json',
      success: function (data) {
        data.unshift({ name: 'Select a department', id: '-1' });
        this.setState({ deptData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Failed to grab deptartment data.');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  onSearchListChange(e) {
    // Saves the name that the user is looking for.
    const name = e.target.value.toLowerCase();
    this.setState({ searchName: name });

    this.updateDisplayData(name, this.state.sortBy, this.state.showFilter);
  }

  //Method for taking an array and searching it by name, returns array.
  searchListByName(data, nameToSearch) {
    const filtered = [];

    // Looks for the name by filtering the mainData
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      // Make the item, name lowercase for easier searching
      if (item.name.toLowerCase().includes(nameToSearch)) {
        filtered.push(item);
      }
    }
    return filtered;
  }

  searchListByDept(e) {
    let dept = null;

    try {
      // Saves the dept that the user is looking for.
      dept = e.target.value;
    } catch (err) {
      dept = this.state.searchDept;
    }
    if (dept === '-1') {
      this.getData();
      return;
    }

    $.ajax({
      type: 'GET',
      url: 'index.php?module=intern&action=AffiliateDeptAgreementRest',
      dataType: 'json',
      data: { dept },
      success: function (data) {
        this.setState({ searchDept: dept, mainData: data, displayData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Failed to grab searched list.');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  // Returns sorted array to be used in createList function
  onSortByChange(e) {
    let sort = null;

    //Saves sorting option that was clicked.
    sort = e.target.value;
    this.setState({ sortBy: sort });

    this.updateDisplayData(this.state.searchName, sort, this.state.showFilter);
  }

  //Method for storing the selected sort order and setting sortBy state.
  sortBy(unsorted, typeOfSort) {
    let sorted = [];

    // Different logic for different types of sorts,
    // all utilizing sort function.
    switch (typeOfSort) {
      case 'sortByAZ':
        sorted = unsorted.sort(function (a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        break;
      case 'sortByZA':
        sorted = unsorted.sort(function (a, b) {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
        break;
      case 'SoonerToLater':
        sorted = unsorted.sort(function (a, b) {
          if (a.end_date < b.end_date) return -1;
          if (a.end_date > b.end_date) return 1;
          return 0;
        });
        break;
      case 'LaterToSooner':
        sorted = unsorted.sort(function (a, b) {
          if (a.end_date > b.end_date) return -1;
          if (a.end_date < b.end_date) return 1;
          return 0;
        });
        break;
      default:
        sorted = unsorted;
    }
    return sorted;
  }

  onShow(e) {
    // Saves filter option.
    const option = e.target.value;
    this.setState({ showFilter: option });

    this.updateDisplayData(this.state.searchName, this.state.sortBy, option);
  }

  viewShowFilter(data, filter) {
    const filtered = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      // Finding out if expired or not.
      const current = new Date().getTime();
      const itemDate = new Date(item.end_date * 1000);
      const expiration = (itemDate - current) / 1000;

      if (filter === 'active') {
        if (item.auto_renew || expiration > 0) {
          filtered.push(item);
        }
      } else if (filter === 'expired') {
        if (!item.auto_renew && expiration < 0) {
          filtered.push(item);
        }
      } else {
        filtered.push(item);
      }
    }
    return filtered;
  }

  // Organizes the order of the sort/filter functions to update the data displayed.
  // searchName and sort are both states.
  updateDisplayData(typedName, sort, showFilter) {
    let filtered = [];

    // First filters data.
    if (showFilter !== null) {
      filtered = this.viewShowFilter(this.state.mainData, showFilter);
    } else {
      filtered = this.state.mainData;
    }

    // Second searches list for name.
    if (typedName !== null) {
      filtered = this.searchListByName(filtered, typedName);
    }

    // Third sorts list.
    if (sort !== null) {
      filtered = this.sortBy(filtered, sort);
    } else {
      filtered = this.sortBy(filtered, 'sortByAZ');
    }

    this.setState({ displayData: filtered });
  }

  render() {
    let AffiliateData = null;

    if (this.state.mainData != null) {
      AffiliateData = this.state.displayData.map(function (affil) {
        return <ShowAffiliate key={affil.id} name={affil.name} end_date={affil.end_date} id={affil.id} auto_renew={affil.auto_renew} />;
      });
    } else {
      AffiliateData = (
        <tr>
          <td></td>
        </tr>
      );
    }

    let dData = null;
    if (this.state.deptData != null) {
      dData = this.state.deptData.map(function (dept) {
        return <DepartmentList key={dept.id} name={dept.name} id={dept.id} />;
      });
    } else {
      dData = '';
    }

    let errors;
    if (this.state.errorWarning == null) {
      errors = '';
    } else {
      errors = (
        <CSSTransition timeout={500} classNames="example">
          <ErrorMessagesBlock key="errorSet" errors={this.state.errorWarning} messageType={this.state.messageType} />
        </CSSTransition>
      );
    }

    return (
      <div className="affiliateList">
        <TransitionGroup>{errors}</TransitionGroup>

        <div className="row">
          <div className="col-md-4">
            <h2>Affiliation Agreements</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <a href="index.php?module=intern&action=addAgreementView" className="btn btn-md btn-success">
              <i className="fa fa-plus"></i> Add New Agreement{' '}
            </a>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <div className="input-group">
              <label>Search by Name</label>
              <input type="text" className="form-control" placeholder="Search for..." onChange={this.onSearchListChange} />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label>Search by Department</label>
              <select className="form-control" onChange={this.searchListByDept}>
                {dData}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label>Sort By</label>
              <select className="form-control" onChange={this.onSortByChange} value={this.state.value}>
                <option value="-1">Select an option</option>
                <option value="sortByAZ">Name: A-Z</option>
                <option value="sortByZA">Name: Z-A</option>
                <option value="SoonerToLater">Expiration Date: Sooner to Later</option>
                <option value="LaterToSooner">Expiration Date: Later to Sooner</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <label className="control-label">Filter</label> <br />
            <div className="btn-group" data-toggle="buttons" onClick={this.onShow} value={this.state.value}>
              <button className="btn btn-default" value="all">
                <input type="radio" />
                All
              </button>
              <button className="btn btn-default" value="active">
                <input type="radio" />
                Active
              </button>
              <button className="btn btn-default" value="expired">
                <input type="radio" />
                Expired
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Expiration Date</th>
                  <th>Active/Expired</th>
                </tr>
              </thead>
              <tbody>{AffiliateData}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

AffiliateList.propTypes = {
  url: PropTypes.string.isRequired
};

ReactDOM.render(<AffiliateList />, document.getElementById('AffiliateList'));
