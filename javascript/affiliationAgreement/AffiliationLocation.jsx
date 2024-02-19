import React from 'react';
import { createRoot } from 'react-dom/client';
import $ from 'jquery';
import PropTypes from 'prop-types';

// Components for adding states (locations) to an Affiliation Agreement
// on the Edit Affiliation interface.

class LocationItem extends React.Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.remove(this.props.location);
  }

  render() {
    return (
      <li className="list-group-item">
        {this.props.location.full_name}
        <button onClick={this.remove} className="btn-close float-end" aria-label="Remove"></button>
      </li>
    );
  }
}

LocationItem.propTypes = {
  remove: PropTypes.func.isRequried,
  location: PropTypes.object.isRquired
};

class LocationList extends React.Component {
  render() {
    const listNodes = this.props.locations.map(
      function (location) {
        return <LocationItem key={location.abbr} remove={this.props.removeClick} location={location} />;
      }.bind(this)
    );

    return <ul className="list-group">{listNodes}</ul>;
  }
}

LocationList.propTypes = {
  locations: PropTypes.array.isRequired,
  removeClick: PropTypes.func.isRequired
};

class LocationDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);

    this.locChoices = React.createRef();
  }

  add() {
    this.props.onAdd(this.locChoices.current.value);
  }

  render() {
    const selectOptions = this.props.locations.map(
      function (location) {
        // Check if this location is in the set of used locations
        const usedIndex = this.props.usedLocations.findIndex(function (element, index, arr) {
          if (location.abbr === element.abbr) {
            return true;
          } else {
            return false;
          }
        });

        // If the location has been used (findIndex returns non-negative), then disable the location in the dropdown list
        if (usedIndex > -1) {
          return (
            <option key={location.abbr} value={location.abbr} disabled>
              {location.full_name}
            </option>
          );
        }

        // Otherwise, return an enabled option
        return (
          <option key={location.abbr} value={location.abbr}>
            {location.full_name}
          </option>
        );
      }.bind(this)
    );

    return (
      <div className="LocationDropdown mb-3">
        <div className="mb-2">
          <label className="form-label" htmlFor="locationDropDown">
            Locations:
          </label>
          <select id="locationDropDown" className="form-select" ref={this.locChoices}>
            <option value="-1">Select a State</option>
            {selectOptions}
          </select>
        </div>
        <button onClick={this.add} className="btn btn-primary">
          Add
        </button>
      </div>
    );
  }
}

LocationDropdown.propTypes = {
  onAdd: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  usedLocations: PropTypes.array.isRequired
};

class LocationBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { locs: null, usedLocs: null };

    this.addloc = this.addloc.bind(this);
    this.removeLoc = this.removeLoc.bind(this);
    this.getData = this.getData.bind(this);
    this.postData = this.postData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  addloc(nameToAdd) {
    this.postData(nameToAdd);
  }

  removeLoc(loc) {
    this.deleteData(loc);
  }

  componentDidMount() {
    // Get data on inital load
    this.getData();
  }

  getData() {
    // Get the full list of all states
    $.ajax({
      url: 'index.php?module=intern&action=stateRest',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ locs: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('There was an error loading location data for this agreement.');
        console.error(status, err.toString());
      }
    });

    // Get the list of states already added (used) on this agreement
    $.ajax({
      url: 'index.php?module=intern&action=AffiliateStateRest&affiliation_agreement_id=' + this.props.affiliationId,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ usedLocs: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('There was an error loading location data for this agreement.');
        console.error(status, err.toString());
      }
    });
  }

  postData(state) {
    $.ajax({
      url: 'index.php?module=intern&action=AffiliateStateRest&affiliation_agreement_id=' + this.props.affiliationId + '&state=' + state,
      type: 'POST',
      success: function () {
        this.getData();
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Failed to add to the database. ' + err.toString());
        console.error(status, err.toString());
      }
    });
  }

  deleteData(state) {
    $.ajax({
      url: 'index.php?module=intern&action=AffiliateStateRest&affiliation_agreement_id=' + this.props.affiliationId + '&state=' + state.abbr,
      type: 'DELETE',
      success: function () {
        this.getData();
      }.bind(this),
      error: function (xhr, status, err) {
        alert('There was an error while trying to remove that location.');
        console.error(status, err.toString());
      }
    });
  }

  render() {
    // If we don't have location data yet, don't even bother rendering
    if (this.state.locs == null || this.state.usedLocs == null) {
      return <div></div>;
    }

    return (
      <div className="LocationBox">
        <LocationDropdown onAdd={this.addloc} locations={this.state.locs} usedLocations={this.state.usedLocs} />
        <LocationList removeClick={this.removeLoc} locations={this.state.usedLocs} />
      </div>
    );
  }
}

LocationBox.propTypes = {
  affiliationId: PropTypes.number.isRequired
};

const root = createRoot(document.getElementById('locations'));
root.render(<LocationBox affiliationId={window.aaId} />);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, root, 1000);
}
