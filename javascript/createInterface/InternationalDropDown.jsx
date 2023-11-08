import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class InternationalDropDown extends React.Component {
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

    const countries = this.props.countries;

    let output = null;

    // Default form style with label on top
    if (this.props.formStyle === 'vertical' || this.props.formStyle === undefined) {
      output = (
        <div className="row">
          <div className="col-sm-12 col-md-8 mb-2">
            <div className={fgClasses} id="country">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select id="country" name="country" className="form-select">
                {Object.keys(countries).map(function (key) {
                  return (
                    <option key={key} value={key}>
                      {countries[key]}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      );
    } else if (this.props.formStyle === 'horizontal') {
      // Optional form style with label to the left of the control
      output = (
        <div className="form-group">
          <label htmlFor="country" className="col-lg-3 form-label">
            Country
          </label>
          <div className="col-lg-8">
            <select id="country" name="country" className="form-select">
              {Object.keys(countries).map(function (key) {
                return (
                  <option key={key} value={key}>
                    {countries[key]}
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

InternationalDropDown.propTypes = {
  formStyle: PropTypes.string,
  countries: PropTypes.object.isRequired
};

export default InternationalDropDown;
