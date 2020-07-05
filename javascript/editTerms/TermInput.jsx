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

        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    // Add/remove event listeners for closing the calendar component when user clicks outside the component
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.refs.availableCalendar && !this.refs.availableCalendar.contains(event.target)) {
            this.setState({showCalendarAvailable: false});
        }

        if (this.refs.censusCalendar && !this.refs.censusCalendar.contains(event.target)) {
            this.setState({showCalendarCensus: false});
        }

        if (this.refs.startCalendar && !this.refs.startCalendar.contains(event.target)) {
            this.setState({showCalendarStart: false});
        }

        if (this.refs.endCalendar && !this.refs.endCalendar.contains(event.target)) {
            this.setState({showCalendarEnd: false});
        }
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

    showCalendarAvailable() {
        if (this.state.showCalendarAvailable === false) {
            this.setState({showCalendarCensus: false,
                            showCalendarStart: false,
                            showCalendarEnd: false});
        }
        this.setState({showCalendarAvailable: !this.state.showCalendarAvailable});

    }

    showCalendarCensus() {
        if (this.state.showCalendarCensus === false) {
            this.setState({showCalendarAvailable: false,
                           showCalendarStart: false,
                           showCalendarEnd: false});
        }
        this.setState({showCalendarCensus: !this.state.showCalendarCensus});
    }

    showCalendarStart() {
        if (this.state.showCalendarStart === false) {
            this.setState({showCalendarCensus: false,
                            showCalendarAvailable: false,
                            showCalendarEnd: false});
        }
        this.setState({showCalendarStart: !this.state.showCalendarStart});

    }

    showCalendarEnd() {
        if (this.state.showCalendarEnd === false) {
            this.setState({showCalendarCensus: false,
                            showCalendarAvailable: false,
                            showCalendarStart: false});
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


      if (this.state.showCalendarAvailable) {
          availableCalendar = <Calendar onChange={this.onChangeAvailable}
                               value={this.state.availableDateInput} calendarType="US" />
      }
      if (this.state.showCalendarCensus) {
          censusCalendar = <Calendar onChange={this.onChangeCensus}
                            value={this.state.censusDateInput} calendarType="US" />
      }
      if (this.state.showCalendarStart) {
          startCalendar = <Calendar onChange={this.onChangeStart}
                           value={this.state.startDateInput} calendarType="US" />
      }
      if (this.state.showCalendarEnd) {
          endCalendar = <Calendar onChange={this.onChangeEnd}
                         value={this.state.endDateInput} calendarType="US" />
      }

      return (
      <div>

          <div className="row">

              <div className="col-sm-6">
                  <div className="form-group">
                      <label>Term Code: </label>
                      <input type="text" className="form-control" placeholder="YYYYSS" ref="term_code"/>
                  </div>
              </div>

              <div className="col-sm-6">
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
          </div>
          <div className="row">

              <div className="col-sm-12">
                  <div className="form-group">
                      <label>Description: </label>
                      <input type="text" className="form-control" placeholder="Season YYYY" ref="description"/>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-sm-6">
                  <div className="form-group" ref="availableCalendar" >
                      <label onClick={this.showCalendarAvailable}>Available On:
                          <i className="fa fa-calendar" aria-hidden="true" style={{paddingLeft: '5px'}} title="Click for Calendar View" ></i>
                      </label>
                      <input type="text" className="form-control" placeholder="MM/DD/YYYY" ref="available_date" onClick={this.showCalendarAvailable}/>
                      {availableCalendar}
                  </div>
              </div>

              <div className="col-sm-6">
                  <div className="form-group" ref="censusCalendar">
                      <label onClick={this.showCalendarCensus}>Census Date:
                          <i className="fa fa-calendar" aria-hidden="true" style={{paddingLeft: '5px'}} title="Click for Calendar View"></i>
                      </label>
                      <input type="text" className="form-control" placeholder="MM/DD/YYYY" ref="census_date" onClick={this.showCalendarCensus}/>
                      {censusCalendar}
                  </div>
              </div>
          </div>

          <div className="row">

              <div className="col-sm-6">
                  <div className="form-group" ref="startCalendar">
                      <label onClick={this.showCalendarStart}>Start Date:
                          <i className="fa fa-calendar" aria-hidden="true" style={{paddingLeft: '5px'}} title="Click for Calendar View"></i>
                      </label>
                      <input type="text" className="form-control" placeholder="MM/DD/YYYY" ref="start_date" onClick={this.showCalendarStart}/>
                      {startCalendar}
                  </div>
              </div>

              <div className="col-sm-6">
                  <div className="form-group" ref="endCalendar">
                      <label onClick={this.showCalendarEnd}>End Date:
                          <i className="fa fa-calendar" aria-hidden="true" style={{paddingLeft: '5px'}} title="Click for Calendar View"></i>
                      </label>
                      <input type="text" className="form-control" placeholder="MM/DD/YYYY" ref="end_date" onClick={this.showCalendarEnd}/>
                      {endCalendar}
                  </div>
              </div>

          </div>

          <div className="row">
              <div className="col-sm-6">
                  <div className="form-group">
                      <label>Undergraduate Overload Hours: </label>
                      <input type="text" className="form-control" placeholder="0" ref="undergrad_overload"/>
                  </div>
              </div>

              <div className="col-sm-6">
                  <div className="form-group">
                      <label>Graduate Overload Hours: </label>
                      <input type="text" className="form-control" placeholder="0" ref="grad_overload"/>
                  </div>
              </div>
          </div>
          <div className="row">

              <div className="col-sm-12">
                  <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Create Term</button>
              </div>

          </div>
      </div>);
    }
}

export default TermInput;
