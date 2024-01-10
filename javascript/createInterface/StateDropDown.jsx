import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class StateDropDown extends React.Component {
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

    const states = this.props.states;

    let output = null;

    if (this.props.formStyle === undefined || this.props.formStyle === 'vertical') {
      output = (
        <div className="row">
          <div className="col-sm-12 col-md-8 mb-2">
            <div className={fgClasses}>
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select id="state" name="state" className="form-select">
                {Object.keys(states).map(function (key) {
                  if (states[key].active === 1) {
                    return (
                      <option key={key} value={key}>
                        {states[key].full_name}
                      </option>
                    );
                  } else {
                    return (
                      <option key={key} value={key} disabled style={{ textDecoration: 'line-through', color: '#FFF', backgroundColor: '#777' }}>
                        {states[key].full_name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          </div>
        </div>
      );
    } else if (this.props.formStyle === 'horizontal') {
      output = (
        <div className="row mb-3">
          <label htmlFor="state" className="col-lg-3 col-form-label">
            State
          </label>
          <div className="col-md-8">
            <select id="state" name="state" className="form-select">
              {Object.keys(states).map(function (key) {
                return (
                  <option key={key} value={key}>
                    {states[key].full_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      );
    }

    return output;
  }
}

StateDropDown.propTypes = {
  states: PropTypes.object.isRequired,
  formStyle: PropTypes.string
};

export default StateDropDown;
