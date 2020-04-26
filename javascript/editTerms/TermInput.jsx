import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

class TermInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            censusDateInput: new Date(),
            availableDateInput: new Date(),
            startDateInput: new Date(),
            endDateInput: new Date(),
            showCalendarCensus: false,
            showCalendarAvailable: false,
            showCalendarStart: false,
            showCalendarEnd: false
        };

        this.onChangeCensus = this.onChangeCensus.bind(this);
        this.onChangeAvailable = this.onChangeAvailable.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.showCalendarCensus = this.showCalendarCensus.bind(this);
        this.showCalendarAvailable = this.showCalendarAvailable.bind(this);
        this.showCalendarStart = this.showCalendarStart.bind(this);
        this.showCalendarEnd = this.showCalendarEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeCensus(censusDateInput) {
      this.setState({censusDateInput: censusDateInput});
      (this.refs.census_date).value = censusDateInput.toLocaleDateString("en-US");
    }
    onChangeAvailable(availableDateInput) {
      this.setState({availableDateInput: availableDateInput});
      (this.refs.available_date).value = availableDateInput.toLocaleDateString("en-US");
    }
    onChangeStart(startDateInput) {
      this.setState({startDateInput: startDateInput});
      (this.refs.start_date).value = startDateInput.toLocaleDateString("en-US");
    }
    onChangeEnd(endDateInput) {
       this.setState({endDateInput: endDateInput});
       (this.refs.end_date).value = endDateInput.toLocaleDateString("en-US");
    }
    showCalendarCensus() {
        if (this.state.showCalendarCensus === false) {
            this.setState({showCalendarAvailable: false});
            this.setState({showCalendarStart: false});
            this.setState({showCalendarEnd: false});
        }
        this.setState({showCalendarCensus: !this.state.showCalendarCensus});
    }
    showCalendarAvailable() {
        if (this.state.showCalendarAvailable === false) {
            this.setState({showCalendarCensus: false});
            this.setState({showCalendarStart: false});
            this.setState({showCalendarEnd: false});
        }
        this.setState({showCalendarAvailable: !this.state.showCalendarAvailable});

    }
    showCalendarStart() {
        if (this.state.showCalendarStart === false) {
            this.setState({showCalendarCensus: false});
            this.setState({showCalendarAvailable: false});
            this.setState({showCalendarEnd: false});
        }
        this.setState({showCalendarStart: !this.state.showCalendarStart});

    }
    showCalendarEnd() {
        if (this.state.showCalendarEnd === false) {
            this.setState({showCalendarCensus: false});
            this.setState({showCalendarAvailable: false});
            this.setState({showCalendarStart: false});
        }
        this.setState({showCalendarEnd: !this.state.showCalendarEnd});

    }
    handleSubmit() {
        var tcode = ReactDOM.findDOMNode(this.refs.term_code).value.trim();
        var stype = ReactDOM.findDOMNode(this.refs.sem_type).value.trim();
        var descr = ReactDOM.findDOMNode(this.refs.description).value;
        var census = ReactDOM.findDOMNode(this.refs.census_date).value.trim();
        var available = ReactDOM.findDOMNode(this.refs.available_date).value.trim();
        var start = ReactDOM.findDOMNode(this.refs.start_date).value.trim();
        var end = ReactDOM.findDOMNode(this.refs.end_date).value.trim();
        var ugradOver = ReactDOM.findDOMNode(this.refs.undergrad_overload).value.trim();
        var gradOver = ReactDOM.findDOMNode(this.refs.grad_overload).value.trim();

        if (tcode !== '' && stype !== '' && descr !== '' && census !== '' &&
            available !== '' && start !== '' && end !== '' && ugradOver !== '' &&
            gradOver !== '') {
            this.refs.term_code.value = '';
            this.refs.sem_type.value = '';
            this.refs.description.value = '';
            this.refs.census_date.value = '';
            this.refs.available_date.value = '';
            this.refs.start_date.value = '';
            this.refs.end_date.value = '';
            this.refs.undergrad_overload.value = '';
            this.refs.grad_overload.value = '';
        }

        this.setState({showCalendarCensus: false});
        this.setState({showCalendarAvailable: false});
        this.setState({showCalendarStart: false});
        this.setState({showCalendarEnd: false});

        this.props.onTermCreate(tcode, stype, descr, census, available, start, end, ugradOver, gradOver);
    }
    render() {

      var censusCalendar = null;
      var availableCalendar = null;
      var startCalendar = null;
      var endCalendar = null;

      if (this.state.showCalendarCensus) {
          censusCalendar = <Calendar onChange={this.onChangeCensus}
                            value={this.state.censusDateInput} calendarType="US"/>
      }
      if (this.state.showCalendarAvailable) {
          availableCalendar = <Calendar onChange={this.onChangeAvailable}
                               value={this.state.availableDateInput} calendarType="US"/>
      }
      if (this.state.showCalendarStart) {
          startCalendar = <Calendar onChange={this.onChangeStart}
                           value={this.state.startDateInput} calendarType="US"/>
      }
      if (this.state.showCalendarEnd) {
          endCalendar = <Calendar onChange={this.onChangeEnd}
                         value={this.state.endDateInput} calendarType="US"/>
      }

      return (
      <div className="form-group" style={{margin: '1em'}}>

          <div className="row">

              <div className="col-sm-3">
                  <div className="form-group">
                      <label>Term Code: </label>
                      <input type="text" className="form-control" placeholder="00000" ref="term_code"/>
                  </div>
              </div>

              <div className="col-sm-3">
                  <div className="form-group">
                      <label>Semester Type:</label>
                      <select className="form-control" ref="sem_type">
                          <option value="">Semester Type</option>
                          <option value="1">Spring</option>
                          <option value="2">Summer</option>
                          <option value="2">Summer 2</option>
                          <option value="4">Fall</option>
                      </select>
                  </div>
              </div>

              <div className="col-sm-3">
                  <div className="form-group">
                      <label>Description: </label>
                      <input type="text" className="form-control" placeholder="Season 0000" ref="description"/>
                  </div>
              </div>

              <div className="col-sm-3">
                  <div className="form-group">
                      <label>Census Date:
                          <i className="fa fa-calendar" aria-hidden="true" onClick={this.showCalendarCensus}
                             style={{paddingLeft: '5px'}} title="Click for Calendar View"></i>
                      </label>
                      <input type="text" className="form-control" placeholder="00/00/0000" ref="census_date"/>
                      {censusCalendar}
                  </div>
              </div>

          </div>

          <div className="row">

              <div className="col-sm-3">
                  <div className="form-group">
                      <label>Available On Date:
                          <i className="fa fa-calendar" aria-hidden="true" onClick={this.showCalendarAvailable}
                             style={{paddingLeft: '5px'}} title="Click for Calendar View"></i>
                      </label>
                      <input type="text" className="form-control" placeholder="00/00/0000" ref="available_date"/>
                      {availableCalendar}
                  </div>
              </div>

              <div className="col-sm-3">
                  <div className="form-group">
                      <label>Start Date:
                          <i className="fa fa-calendar" aria-hidden="true" onClick={this.showCalendarStart}
                             style={{paddingLeft: '5px'}} title="Click for Calendar View"></i>
                      </label>
                      <input type="text" className="form-control" placeholder="00/00/0000" ref="start_date"/>
                      {startCalendar}
                  </div>
              </div>

              <div className="col-sm-3">
                  <div className="form-group">

                      <label>End Date:
                          <i className="fa fa-calendar" aria-hidden="true" onClick={this.showCalendarEnd}
                             style={{paddingLeft: '5px'}} title="Click for Calendar View"></i>
                      </label>
                      <input type="text" className="form-control" placeholder="00/00/0000" ref="end_date"/>
                      {endCalendar}
                  </div>
              </div>

              <div className="col-sm-3">
                  <div className="form-group">
                      <label>Undergraduate Overload Hours: </label>
                      <input type="text" className="form-control" placeholder="00" ref="undergrad_overload"/>
                  </div>
              </div>

          </div>

          <div className="row">

              <div className="col-sm-3">
                  <div className="form-group">
                      <label>Graduate Overload Hours: </label>
                      <input type="text" className="form-control" placeholder="00" ref="grad_overload"/>
                  </div>
              </div>

              <div className="col-sm-9">
                  <br></br>
                  <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Create Term</button>
              </div>

          </div>
      </div>);
    }
}

export default TermInput;
