import React, { Fragment } from 'react';
import $ from 'jquery';
import classNames from 'classnames';

/*********
 * Terms *
 *********/
class TermBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      terms: null,
      hasError: false,
      selectedTerm: null,
      dataError: null,
      dataLoading: true
    };

    this.handleChange = this.handleChange.bind(this);

    this.termRef = React.createRef();
  }

  componentDidMount() {
    $.ajax({
      url: 'index.php?module=intern&action=GetAvailableTerms',
      dataType: 'json',
      success: function (data) {
        // If the 'error' property exists, then something went wrong on the server-side
        if ('error' in data) {
          console.log('Error key exists.');
          this.setState({ dataLoading: false, dataError: data.error });
        } else {
          this.setState({ terms: data, dataLoading: false, dataError: false });
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        this.setState({ dataLoading: false, dataError: 'There was an error loading the Term information. Please contact the site administrators.' });
      }.bind(this)
    });
  }

  setError(status) {
    this.setState({ hasError: status });
  }

  handleChange(clickEvent) {
    this.setState({ selectedTerm: clickEvent.target.previousElementSibling.value });
  }

  render() {
    // If we have no data, and it's still loading, then return an empty div
    if (this.state.terms === null && this.state.dataLoading === true) {
      return <div></div>;
    }

    // If there was a problem loading the term data, show an error alert
    let errorNotice = null;
    if (this.state.dataError !== false) {
      errorNotice = (
        <div style={{ marginTop: '1em' }} className="alert alert-danger">
          <p>{this.state.dataError}</p>
        </div>
      );
    }

    // If there are no terms yet, display a zero-state warning w/ link to Edit Terms UI
    if (this.state.dataLoading === false && this.state.dataError === false && this.state.terms.length === 0) {
      return (
        <div className="row mb-2">
          <div className="col-sm-12 col-md-9">
            <div id="term">
              <label className="form-label">Term</label>
              <p>
                <small className="text-secondary">
                  (There are no Terms configured yet. Maybe you want to <a href="index.php?module=intern&action=edit_terms"> create one</a>?)
                </small>
              </p>
            </div>
          </div>
        </div>
      );
    }

    const fgClasses = classNames({
      'has-error': this.state.hasError
    });

    let termDates = null;
    if (this.state.selectedTerm !== null) {
      console.log('selectedTerm', this.state.selectedTerm);
      const startDate = new Date(this.state.terms[this.state.selectedTerm].start_timestamp * 1000);
      const endDate = new Date(this.state.terms[this.state.selectedTerm].end_timestamp * 1000);

      termDates = startDate.toDateString() + ' through ' + endDate.toDateString();
    } else {
      termDates = '';
    }

    let termList = '';
    if (this.state.dataError === false && this.state.tems !== null) {
      termList = Object.keys(this.state.terms).map(
        function (key) {
          return (
            <Fragment key={`ter-${key}`}>
              <input type="radio" className="btn-check" id={`term-${key}`} ref={this.termRef} name="term" key={`radio-${key}`} value={key} autoComplete="off" />

              <label className="btn btn-outline-primary" htmlFor={`term-${key}`} key={`label-${key}`} onClick={this.handleChange} value={key}>
                {this.state.terms[key].description}
              </label>
            </Fragment>
          );
        }.bind(this)
      );
    }

    return (
      <div>
        <div className="row mb-2">
          {errorNotice}
          <div className="col-sm-12 col-md-8">
            <div className={fgClasses} id="term">
              <label className="form-label">Term</label>
              <br />

              <div className="btn-group" role="group" aria-label="term semester/year selection">
                {termList}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <span id="helpBlock" className="form-text">
              {termDates}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default TermBlock;
