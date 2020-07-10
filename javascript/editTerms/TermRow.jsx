import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

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

class TermRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.timestampToDate = this.timestampToDate.bind(this);
        this.onCancelSave = this.onCancelSave.bind(this);
    }
    timestampToDate(timestamp) {

        var date = new Date(timestamp * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var formattedDate = month + "/" + day + "/" + year;

        return formattedDate;
    }
    handleEdit() {
        this.setState({editMode: true});
    }
    handleSave() {
        this.setState({editMode: false});

        var newTcode = ReactDOM.findDOMNode(this.refs.savedTcode).value.trim();
        var newStype = ReactDOM.findDOMNode(this.refs.savedStype).value.trim();
        var newDescr = ReactDOM.findDOMNode(this.refs.savedDescr).value.trim();
        var newCensusDate = ReactDOM.findDOMNode(this.refs.savedCensusDate).value.trim();
        var newAvailDate = ReactDOM.findDOMNode(this.refs.savedAvailDate).value.trim();
        var newStartDate = ReactDOM.findDOMNode(this.refs.savedStartDate).value.trim();
        var newEndDate = ReactDOM.findDOMNode(this.refs.savedEndDate).value.trim();
        var newUgradOverload = ReactDOM.findDOMNode(this.refs.savedUgradOverload).value.trim();
        var newGradOverload = ReactDOM.findDOMNode(this.refs.savedGradOverload).value.trim();

        if (newTcode === '') {
            newTcode = this.props.tcode;
        }
        if (newStype === '') {
            newStype = this.props.stype;
        }
        if (newDescr === '') {
            newDescr = this.props.descr;
        }
        if (newCensusDate === '') {
            newCensusDate = this.timestampToDate(this.props.census);
        }
        if (newAvailDate === '') {
            newAvailDate = this.timestampToDate(this.props.available);
        }
        if (newStartDate === '') {
            newStartDate = this.timestampToDate(this.props.start);
        }
        if (newEndDate === '') {
            newEndDate = this.timestampToDate(this.props.end);
        }
        if (newUgradOverload === '') {
            newUgradOverload = this.props.ugradOverload;
        }
        if (newGradOverload === '') {
            newGradOverload = this.props.gradOverload;
        }

        this.props.onTermSave(newTcode, newStype, newDescr, newCensusDate, newAvailDate, newStartDate, newEndDate, newUgradOverload, newGradOverload, this.props.tcode);
    }
    onCancelSave() {
        this.setState({editMode: false});
    }
    render() {

        var mainButton = null;

        let availDate = this.timestampToDate(this.props.available);
        let censusDate = this.timestampToDate(this.props.census);
        let startDate = this.timestampToDate(this.props.start);
        let endDate = this.timestampToDate(this.props.end);

        let availDateObj = new Date(this.props.available * 1000);
        let censusDateObj = new Date(this.props.census * 1000);
        let today = new Date();

        console.log(availDate, today, censusDate);
        let active = (availDateObj < today && today < censusDateObj) ? true : false;
        console.log(active);

        let rowClasses = classNames({
            'info': active
        });

        // if you are not editing
        if (!this.state.editMode)
        {
            mainButton = <a onClick={this.handleEdit} data-toggle="tooltip" title="Edit"><i className="glyphicon glyphicon-pencil"/></a>
            return (
            <tr className={rowClasses}>
                <td>{this.props.tcode}</td>
                <td>{this.props.descr}</td>
                <td>{this.props.stype}</td>
                <td>{availDate}</td>
                <td>{censusDate}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
                <td>{this.props.ugradOver}</td>
                <td>{this.props.gradOver}</td>
                <td>{mainButton}</td>
            </tr>
            );
        }
        //if you are editing
        else
        {
            mainButton = <a onClick={this.handleSave} data-toggle="tooltip" title="Save Changes"><i className="glyphicon glyphicon-floppy-save"/></a>
            return (
            <tr>
                <td><input type="text" className="form-control" ref="savedTcode" defaultValue={this.props.tcode}/></td>
                <td><input type="text" className="form-control" ref="savedStype" defaultValue={this.props.stype}/></td>
                <td><input type="text" className="form-control" ref="savedDescr" defaultValue={this.props.descr}/></td>
                <td><input type="text" className="form-control" ref="savedCensusDate" defaultValue={censusDate}/></td>
                <td><input type="text" className="form-control" ref="savedAvailDate" defaultValue={availDate}/></td>
                <td><input type="text" className="form-control" ref="savedStartDate" defaultValue={startDate}/></td>
                <td><input type="text" className="form-control" ref="savedEndDate" defaultValue={endDate}/></td>
                <td><input type="text" className="form-control" ref="savedUgradOverload" defaultValue={this.props.ugradOver}/></td>
                <td><input type="text" className="form-control" ref="savedGradOverload" defaultValue={this.props.gradOver}/></td>
                <td style={{"verticalAlign" : "middle"}}>{mainButton}</td>
                <td style={{"verticalAlign" : "middle"}}><a onClick={this.onCancelSave} title="Cancel Changes"><i className="glyphicon glyphicon-remove"/></a></td>
            </tr>
            );
        }
    }
}

export default TermRow;
