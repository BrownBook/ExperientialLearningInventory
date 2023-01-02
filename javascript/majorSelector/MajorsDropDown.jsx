import React from 'react';
import PropTypes from 'prop-types';

class MajorsDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  setError(status) {
    this.setState({ hasError: status });
  }

  render() {
    const majors = this.props.majors;
    const level = this.props.level;

    let options = null;

    if (level === 'ugrad' || level === 'grad') {
      options = Object.keys(majors).map(function (index) {
        return (
          <option key={majors[index].code} value={majors[index].code}>
            {majors[index].description}
          </option>
        );
      });
    } else {
      options = <option>Choose a level first</option>;
    }

    return (
      <div className="form-group">
        <label htmlFor={`majors-${level}`} className="col-lg-3 control-label">
          Major/Program
        </label>
        <div className="col-lg-8">
          <select id={`majors-${level}`} name={level} className="form-control">
            {options}
          </select>
        </div>
      </div>
    );
  }
}

MajorsDropDown.propTypes = {
  majors: PropTypes.any,
  level: PropTypes.any
};

export default MajorsDropDown;
