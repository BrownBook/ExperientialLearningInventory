import React from 'react';
import $ from 'jquery';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import InternationalDropDown from './InternationalDropDown.jsx';
import StateDropDown from './StateDropDown.jsx';

/*************
 * Locations *
 *************/
class LocationBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      domestic: null,
      international: null,
      availableStates: null,
      availableCountries: null,
      hasError: false
    };

    this.domestic = this.domestic.bind(this);
    this.international = this.international.bind(this);
  }

  componentDidMount() {
    // Fetch list of states
    $.ajax({
      url: 'index.php?module=intern&action=GetStates',
      type: 'GET',
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

  setError(status) {
    this.setState({ hasError: status });
  }

  render() {
    const fgClasses = classNames({
      'form-group': true,
      'has-error': this.state.hasError
    });

    let dropdown;
    if (this.state.domestic === null) {
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
          />
        </CSSTransition>
      );
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-sm-12 col-md-6">
            <div className={fgClasses} id="location">
              <label htmlFor="location" className="form-label">
                Location
              </label>{' '}
              <br />
              <div className="btn-group" role="group" aria-label="internship location">
                <input type="radio" className="btn-check" name="location" id="location-domestic" autoComplete="off" onClick={this.domestic} />
                <label className="btn btn-outline-primary" htmlFor="location-domestic">
                  Domestic
                </label>

                <input type="radio" className="btn-check" name="location" id="location-intl" autoComplete="off" onClick={this.international} />
                <label className="btn btn-outline-primary" htmlFor="location-intl">
                  International
                </label>
              </div>
            </div>
          </div>
        </div>
        <TransitionGroup>{dropdown}</TransitionGroup>
      </div>
    );
  }
}

export default LocationBlock;
