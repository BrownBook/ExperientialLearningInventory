import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';

class StateDropDownItem extends React.Component {
  // Disables/Enables the state in the dropdown
  render() {
    let optionSelect = null;
    if (this.props.active === 1) {
      optionSelect = (
        <option value={this.props.sAbbr} disabled>
          {this.props.stateName}
        </option>
      );
    } else {
      optionSelect = <option value={this.props.sAbbr}>{this.props.stateName}</option>;
    }

    return optionSelect;
  }
}

StateDropDownItem.propTypes = {
  active: PropTypes.any,
  sAbbr: PropTypes.string,
  stateName: PropTypes.string
};

class StateTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onStateDelete(this.props.stateObj.sAbbr);
  }

  // If the state is active rendering the html elements otherwise do nothing.
  render() {
    return (
      <tr>
        <td>
          {this.props.stateObj.full_name}
          <span className="pull-right">
            <button type="button" className="close" aria-label="Remove" onClick={this.handleClick}>
              <span aria-hidden="true">&times;</span>
            </button>
          </span>
        </td>
        <td></td>
      </tr>
    );
  }
}

StateTableRow.propTypes = {
  stateObj: PropTypes.shape({
    full_name: PropTypes.string,
    sAbbr: PropTypes.string,
    active: PropTypes.any
  }),
  onStateDelete: PropTypes.func
};

class States extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainData: null,
      dropData: null
    };

    this.getData = this.getData.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.onStateDelete = this.onStateDelete.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    $.ajax({
      url: 'index.php?module=intern&action=stateRest',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        // Adds Select a State to the data array.
        data.unshift({ full_name: 'Select a State', abbr: 'AA' });
        this.setState({ mainData: data, dropData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert('Sorry, there was a problem fetching data from the server.');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleDrop(e) {
    //Event handler for the dropdown box.
    if (e.target.value !== 'AA') {
      // Determines the text value (not abbr) of the selected state.
      // var options = e.target.options;
      // var val = null;
      // for (var i = 0; i < options.length; i++)
      // {
      //   if (options[i].selected){
      //     val = options[i].text;
      //   }
      // }

      // Activating the selected state
      for (let j = 0, k = this.state.dropData.length; j < k; j++) {
        if (this.state.dropData[j].abbr === e.target.value) {
          const newDropData = this.state.dropData;
          newDropData[j].active = this.state.dropData[j].active + 1;
          this.setState({ dropData: newDropData });
        }
      }

      // updating the new state for optimization (snappy response on the client)
      this.setState({ dropData: this.state.dropData });

      $.ajax({
        url: 'index.php?module=intern&action=stateRest&abbr=' + e.target.value,
        type: 'PUT',
        success: function (data) {
          this.getData();
        }.bind(this),
        error: function (xhr, status, err) {
          alert('failed to PUT');
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  }

  onStateDelete(abbr) {
    // No longer makes the state active
    for (let j = 0, k = this.state.dropData.length; j < k; j++) {
      if (this.state.dropData[j].abbr === abbr) {
        const newDropData = this.state.dropData;
        newDropData[j].active = this.state.dropData[j].active - 1;
        this.setState({ dropData: newDropData });
      }
    }

    // updating the new state for optimization (snappy response on the client)
    this.setState({ dropData: this.state.dropData });

    $.ajax({
      url: 'index.php?module=intern&action=stateRest&abbr=' + abbr + '&remove=1',
      type: 'PUT',
      success: function (data) {
        this.getData();
      }.bind(this),
      error: function (xhr, status, err) {
        alert('failed to PUT');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    let dropDownOptions = null;

    if (this.state.dropData != null) {
      dropDownOptions = this.state.dropData.map(function (data) {
        return <StateDropDownItem key={data.abbr} sAbbr={data.abbr} stateName={data.full_name} active={data.active} />;
      });
    } else {
      dropDownOptions = '';
    }

    // Filter state list to just those enabled
    const enabledStates = this.state.dropData?.filter(state => {
      return state.active;
    });

    // Loop over enabled states to make the list
    const rows = enabledStates?.map(stateObj => {
      return <StateTableRow key={stateObj.abbr} stateObj={stateObj} onStateDelete={this.onStateDelete} />;
    });

    return (
      <div className="State List">
        <div className="col-md-5 col-md-offset-1">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="stateDropDown">States:</label>
              <select id="stateDropDown" className="form-control" onChange={this.handleDrop}>
                {dropDownOptions}
              </select>
              <br />
              <div className="panel panel-default">
                <div className="panel-body">
                  <table className="table table-condensed table-striped">
                    <thead>
                      <tr>
                        <th>Allowed States:</th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

States.propTypes = {
  url: PropTypes.string
};

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(<States />, document.getElementById('content'));
