import React from 'react';
import ReactDOM from 'react-dom';

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

        let censusDate = this.timestampToDate(this.props.census);
        let availDate = this.timestampToDate(this.props.available);
        let startDate = this.timestampToDate(this.props.start);
        let endDate = this.timestampToDate(this.props.end);

        // if you are not editing
        if (!this.state.editMode)
        {
            mainButton = <a onClick={this.handleEdit} data-toggle="tooltip" title="Edit"><i className="glyphicon glyphicon-pencil"/></a>
            return (
            <tr>
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
