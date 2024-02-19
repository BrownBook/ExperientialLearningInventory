import React from 'react';
import { createRoot } from 'react-dom/client';
import $ from 'jquery';
import classNames from 'classnames';

import InternationalDropDown from '../createInterface/InternationalDropDown.jsx';
import StateDropDown from '../createInterface/StateDropDown.jsx';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

class LocationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domestic: false,
      international: false,
      availableStates: null,
      availableCountries: null,
      hasError: false
    };

    this.domestic = this.domestic.bind(this);
    this.international = this.international.bind(this);
    this.anyLocation = this.anyLocation.bind(this);
  }

  componentDidMount() {
    // Fetch list of available states
    $.ajax({
      url: 'index.php?module=intern&action=GetStates',
      dataType: 'json',
      success: function (data) {
        this.setState({ availableStates: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }
    });

    // Fetch list of available countries
    $.ajax({
      url: 'index.php?module=intern&action=GetAvailableCountries',
      dataType: 'json',
      success: function (data) {
        this.setState({ availableCountries: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  }

  domestic() {
    this.setState({ domestic: true, international: false });
  }

  international() {
    this.setState({ domestic: false, international: true });
  }

  anyLocation() {
    this.setState({ domestic: false, international: false });
  }

  render() {
    let dropdown;
    if (!this.state.domestic && !this.state.international) {
      dropdown = '';
    } else if (this.state.domestic) {
      dropdown = (
        <CSSTransition timeout={{ enter: 500, exit: 0 }} classNames="example">
          <StateDropDown
            key="states"
            ref={element => {
              this.stateDropDown = element;
            }}
            states={this.state.availableStates}
            formStyle="horizontal"
          />
        </CSSTransition>
      );
    } else {
      dropdown = (
        <CSSTransition timeout={{ enter: 500, exit: 0 }} classNames="example">
          <InternationalDropDown
            key="countries"
            ref={element => {
              this.countryDropDown = element;
            }}
            countries={this.state.availableCountries}
            formStyle="horizontal"
          />
        </CSSTransition>
      );
    }

    const anyLabelClass = classNames({
      btn: true,
      'btn-outline-secondary': true,
      active: !this.state.domestic && !this.state.international
    });

    const domesticLabelClass = classNames({
      btn: true,
      'btn-outline-secondary': true,
      active: this.state.domestic
    });

    const internationalLabelClass = classNames({
      btn: true,
      'btn-outline-secondary': true,
      active: this.state.international
    });

    return (
      <div>
        <div className="row mb-3">
          <label className="col-lg-3 form-label" htmlFor="location">
            Location
          </label>
          <div className="col-lg-8">
            <div className="btn-group" role="group" aria-label="Location selector button group">
              <input
                type="radio"
                id="location-radio-any"
                name="location"
                value="-1"
                className="btn-check"
                style={{ position: 'absolute', clip: 'rect(0, 0, 0, 0)' }}
                onClick={this.anyLocation}
              />
              <label htmlFor="location-radio-any" className={anyLabelClass}>
                Any Location
              </label>

              <input
                type="radio"
                id="location-radio-domestic"
                name="location"
                value="domestic"
                className="btn-check"
                style={{ position: 'absolute', clip: 'rect(0, 0, 0, 0)' }}
                onClick={this.domestic}
              />
              <label htmlFor="location-radio-domestic" className={domesticLabelClass}>
                Domestic
              </label>

              <input
                type="radio"
                id="location-radio-intl"
                name="location"
                value="internat"
                className="btn-check"
                style={{ position: 'absolute', clip: 'rect(0, 0, 0, 0)' }}
                onClick={this.international}
              />
              <label htmlFor="location-radio-intl" className={internationalLabelClass}>
                International
              </label>
            </div>
          </div>
        </div>

        <TransitionGroup>{dropdown}</TransitionGroup>
      </div>
    );
  }
}

const root = createRoot(document.getElementById('LocationSelector'));
root.render(<LocationSelector />);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, root, 1000);
}
