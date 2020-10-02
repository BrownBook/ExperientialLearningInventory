import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

/**
 * This file is part of Internship Inventory.
 *
 * Internship Inventory is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * Internship Inventory is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Internship Inventory.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright 2011-2018 Appalachian State University
 * Copyright 2020 Brown Book Software, LLC
 */

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

        this.tcodeRef = React.createRef();
        this.stypeRef = React.createRef();
        this.descRef = React.createRef();
        this.censusRef = React.createRef();
        this.availableRef = React.createRef();
        this.startRef = React.createRef();
        this.endRef = React.createRef();
        this.ugradOverRef = React.createRef();
        this.gradOverRef = React.createRef();

        this.availableCalendarRef = React.createRef();
        this.censusCalendarRef = React.createRef();
        this.startCalendarRef = React.createRef();
        this.endCalendarRef = React.createRef();
    }

    // Add/remove event listeners for closing the calendar component when user clicks outside the component
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.availableCalendarRef.current && !this.availableCalendarRef.current.contains(event.target)) {
            this.setState({showCalendarAvailable: false});
        }

        if (this.censusCalendarRef.current && !this.censusCalendarRef.current.contains(event.target)) {
            this.setState({showCalendarCensus: false});
        }

        if (this.startCalendarRef.current && !this.startCalendarRef.current.contains(event.target)) {
            this.setState({showCalendarStart: false});
        }

        if (this.endCalendarRef.current && !this.endCalendarRef.current.contains(event.target)) {
            this.setState({showCalendarEnd: false});
        }
    }

    onChangeCensus(censusDateInput) {
      this.setState({censusDateInput: censusDateInput});
      this.censusRef.current.value = censusDateInput.toLocaleDateString("en-US");
    }
    onChangeAvailable(availableDateInput) {
      this.setState({availableDateInput: availableDateInput});
      this.availableRef.current.value = availableDateInput.toLocaleDateString("en-US");
    }
    onChangeStart(startDateInput) {
      this.setState({startDateInput: startDateInput});
      this.startRef.current.value = startDateInput.toLocaleDateString("en-US");
    }
    onChangeEnd(endDateInput) {
       this.setState({endDateInput: endDateInput});
       this.endRef.current.value = endDateInput.toLocaleDateString("en-US");
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
        let tcode       = this.tcodeRef.current.value.trim();
        let stype       = this.stypeRef.current.value.trim();
        let descr       = this.descRef.current.value.trim();
        let census      = this.censusRef.current.value.trim();
        let available   = this.availableRef.current.value.trim();
        let start       = this.startRef.current.value.trim();
        let end         = this.endRef.current.value.trim();
        let ugradOver   = this.ugradOverRef.current.value.trim();
        let gradOver    = this.gradOverRef.current.value.trim();

        // If everything had a value, then clear the values
        // TODO: Fix this to only clear values if the values were successfully saved
        if (tcode !== '' && stype !== '' && descr !== '' && census !== '' &&
            available !== '' && start !== '' && end !== '' && ugradOver !== '' &&
            gradOver !== '') {
            this.tcodeRef.current.value = '';
            this.stypeRef.current.value = '';
            this.descRef.current.value = '';
            this.censusRef.current.value = '';
            this.availableRef.current.value = '';
            this.startRef.current.value = '';
            this.endRef.current.value = '';
            this.ugradOverRef.current.value = '';
            this.gradOverRef.current.value = '';
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
                      <input type="text" className="form-control" placeholder="YYYYSS" ref={this.tcodeRef} />
                  </div>
              </div>

              <div className="col-sm-6">
                  <div className="form-group">
                      <label>Semester Type:</label>
                      <select className="form-control" ref={this.stypeRef} >
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
                      <input type="text" className="form-control" placeholder="Season YYYY" ref={this.descRef}/>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-sm-6">
                  <div className="form-group" ref={this.availableCalendarRef} >
                      <label onClick={this.showCalendarAvailable}>Available On:
                          <i className="fa fa-calendar" aria-hidden="true" style={{paddingLeft: '5px'}} title="Click for Calendar View" ></i>
                      </label>
                      <input type="text" className="form-control" placeholder="MM/DD/YYYY" ref={this.availableRef} onClick={this.showCalendarAvailable}/>
                      {availableCalendar}
                  </div>
              </div>

              <div className="col-sm-6">
                  <div className="form-group" ref={this.censusCalendarRef}>
                      <label onClick={this.showCalendarCensus}>Drop/Add Date:
                          <i className="fa fa-calendar" aria-hidden="true" style={{paddingLeft: '5px'}} title="Click for Calendar View"></i>
                      </label>
                      <input type="text" className="form-control" placeholder="MM/DD/YYYY" ref={this.censusRef} onClick={this.showCalendarCensus}/>
                      {censusCalendar}
                  </div>
              </div>
          </div>

          <div className="row">

              <div className="col-sm-6">
                  <div className="form-group" ref={this.startCalendarRef}>
                      <label onClick={this.showCalendarStart}>Term Start Date:
                          <i className="fa fa-calendar" aria-hidden="true" style={{paddingLeft: '5px'}} title="Click for Calendar View"></i>
                      </label>
                      <input type="text" className="form-control" placeholder="MM/DD/YYYY" ref={this.startRef} onClick={this.showCalendarStart}/>
                      {startCalendar}
                  </div>
              </div>

              <div className="col-sm-6">
                  <div className="form-group" ref={this.endCalendarRef}>
                      <label onClick={this.showCalendarEnd}>Term End Date:
                          <i className="fa fa-calendar" aria-hidden="true" style={{paddingLeft: '5px'}} title="Click for Calendar View"></i>
                      </label>
                      <input type="text" className="form-control" placeholder="MM/DD/YYYY" ref={this.endRef} onClick={this.showCalendarEnd}/>
                      {endCalendar}
                  </div>
              </div>

          </div>

          <div className="row">
              <div className="col-sm-6">
                  <div className="form-group">
                      <label>Undergraduate Overload Hours: </label>
                      <input type="text" className="form-control" placeholder="0" ref={this.ugradOverRef} />
                  </div>
              </div>

              <div className="col-sm-6">
                  <div className="form-group">
                      <label>Graduate Overload Hours: </label>
                      <input type="text" className="form-control" placeholder="0" ref={this.gradOverRef} />
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
