import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TermRow from './TermRow.jsx';
import TermInput from './TermInput.jsx';
import ErrorMessagesBlock from './ErrorMessagesBlock.jsx';

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


class TermEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainData: null,
            errorWarning: null,
            messageType: null,
            inputData: null
        };

        this.dateToTimestamp = this.dateToTimestamp.bind(this);
        this.getData = this.getData.bind(this);
        this.onTermCreate = this.onTermCreate.bind(this);
        this.onTermSave = this.onTermSave.bind(this);
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        fetch('index.php?module=intern&action=termRest')
            .then(response => response.json())
            .then((result) => {
                this.setState({mainData: result});
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }
    onTermCreate(tcode, stype, descr, census, available, start, end, ugradOver, gradOver) {

        var errorMessage = null;

        if (tcode === '') {
            errorMessage = "Please enter a term code.";
            this.setState({errorWarning: errorMessage, messageType: "error"});
            return;
        }
        if (stype === '') {
            errorMessage = "Please enter a semester type.";
            this.setState({errorWarning: errorMessage, messageType: "error"});
            return;
        }
        if (descr === '') {
            errorMessage = "Please enter a term description.";
            this.setState({errorWarning: errorMessage, messageType: "error"});
            return;
        }
        if (census === '') {
            errorMessage = "Please enter a census date.";
            this.setState({errorWarning: errorMessage, messageType: "error"});
            return;
        }
        if (available === '') {
            errorMessage = "Please enter the date the term is available.";
            this.setState({errorWarning: errorMessage, messageType: "error"});
            return;
        }
        if (start === '') {
            errorMessage = "Please enter a start date.";
            this.setState({errorWarning: errorMessage, messageType: "error"});
            return;
        }
        if (end === '') {
            errorMessage = "Please enter an end date.";
            this.setState({errorWarning: errorMessage, messageType: "error"});
            return;
        }
        if (ugradOver === '') {
            errorMessage = "Please enter undergraduate overload hours.";
            this.setState({errorWarning: errorMessage, messageType: "error"});
            return;
        }
        if (gradOver === '') {
            errorMessage = "Please enter graduate overload hours.";
            this.setState({errorWarning: errorMessage, messageType: "error"});
            return;
        }

        census      = this.dateToTimestamp(census);
        available   = this.dateToTimestamp(available);
        start       = this.dateToTimestamp(start);
        end         = this.dateToTimestamp(end);

        const postData = {
            'code': tcode,
            'type': stype,
            'descr': descr,
            'census': census,
            'available': available,
            'start': start,
            'end': end,
            'ugradOver': ugradOver,
            'gradOver': gradOver
        };

        fetch('index.php?module=intern&action=termRest', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        })
            .then(response => response.json())
            .then((result) => {
                this.setState({errorWarning: 'Term successfully added', messageType: 'success'});
            })
            .catch((error) => {
                console.error(error);
                this.setState({errorWarning: 'Failed to add term', messageType: 'error'});
            });
    }
    onTermSave(newtermc, newsemtype, newdescri, newcensusd, newavaild, newstartd, newendd, newugradover, newgradover, oldTcode) {

        newcensusd = this.dateToTimestamp(newcensusd);
        newavaild = this.dateToTimestamp(newavaild);
        newstartd = this.dateToTimestamp(newstartd);
        newendd = this.dateToTimestamp(newendd);

        var cleanoldTcode = encodeURIComponent(oldTcode)
        var cleantermc = encodeURIComponent(newtermc);
        var cleansemtype = encodeURIComponent(newsemtype);
        var cleandescri = encodeURIComponent(newdescri);
        var cleancensusd = encodeURIComponent(newcensusd);
        var cleanavaild = encodeURIComponent(newavaild);
        var cleanstartd = encodeURIComponent(newstartd);
        var cleanendd = encodeURIComponent(newendd);
        var cleanugradover = encodeURIComponent(newugradover);
        var cleangradover = encodeURIComponent(newgradover);

        // TODO: Use fetch API
        $.ajax({
            url: 'index.php?module=intern&action=termRest&newTcode='+cleantermc+'&newSemtype='+cleansemtype+
            '&newDesc='+cleandescri+'&newCensus='+cleancensusd+'&newAvail='+cleanavaild+'&newStart='+cleanstartd+
            '&newEnd='+cleanendd+'&newUgradOver='+cleanugradover+'&newGradOver='+cleangradover+'&oldTcode='+cleanoldTcode,
            type: 'PUT',
            success: function(data) {
                $("#success").show();
                var added = 'Updated the table.';
                this.setState({success: added});
                this.getData();
            }.bind(this),
            error: function(xhr, status, err) {
                var errorMessage = "Failed to update term.";
                console.error(this.props.url, status, err.toString());
                this.setState({errorWarning: errorMessage, messageType: "error"});
            }.bind(this)
        });
    }
    dateToTimestamp(dateString) {
        return new Date(dateString).getTime() / 1000;
    }
    render()
    {
        var termRows = null;
        if (this.state.mainData != null) {
            var termSave = this.onTermSave;
            termRows = this.state.mainData.map(function (data) {
                return (
                    <TermRow  key={data.term}
                        tcode={data.term}
                        stype={data.semester_type}
                        descr={data.description}
                        census={data.census_date_timestamp}
                        available={data.available_on_timestamp}
                        start={data.start_timestamp}
                        end={data.end_timestamp}
                        ugradOver={data.undergrad_overload_hours}
                        gradOver={data.grad_overload_hours}
                        onTermSave={termSave} />
                );
            });
            var termCreate = this.onTermCreate;
            //inData = <TermInput onTermCreate={termCreate} messageType={this.state.messageType} />

        } else {
            termRows = '';
        }

        var errors;
        if (this.state.errorWarning == null) {
            errors = '';
        } else {
            errors = <ErrorMessagesBlock key="errorSet" errors={this.state.errorWarning} messageType={this.state.messageType} />
        }

        return (
            <div className="terms">

              <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                  {errors}
              </ReactCSSTransitionGroup>


              <div className="row">
                <div className="col-sm-6">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <h4>Create a new Term: </h4>
                            <TermInput onTermCreate={termCreate} messageType={this.state.messageType} />
                        </div>
                    </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-10">
                    <div className="termTable">
                        <table className="table table-condensed table-striped">
                              <thead>
                                  <tr>
                                      <th>Term Code</th>
                                      <th>Description</th>
                                      <th>Semester Type</th>
                                      <th>Available On Date</th>
                                      <th>Census Date</th>
                                      <th>Start Date</th>
                                      <th>End Date</th>
                                      <th>Undergraduate<br></br>Overload Hours</th>
                                      <th>Graduate<br></br>Overload Hours</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {termRows}
                              </tbody>
                        </table>
                    </div>
                </div>

              </div>

            </div>
        );
    }
}


ReactDOM.render(
    <TermEditor />,
    document.getElementById('edit_terms')
);
