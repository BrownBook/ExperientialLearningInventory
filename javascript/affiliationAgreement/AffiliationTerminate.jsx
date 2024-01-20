import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';

class TerminateButton extends React.Component {
  constructor(props) {
    super(props);

    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    this.props.clicked();
  }

  render() {
    let btnClass;
    let btnText;
    let btnAwesome;

    if (this.props.terminated === 0) {
      btnClass = 'btn btn-outline-danger float-end';
      btnText = 'Terminate ';
      btnAwesome = 'fa-solid fa-times';
    } else {
      btnClass = 'btn btn-outline-info float-end';
      btnText = 'Reinstate ';
      btnAwesome = 'fa-solid fa-recycle';
    }

    return (
      <div className="terminateButton">
        <a onClick={this.clicked} className={btnClass}>
          <i className={btnAwesome}></i> {btnText}
        </a>
      </div>
    );
  }
}

TerminateButton.propTypes = {
  clicked: PropTypes.func.isRequired,
  terminated: PropTypes.number.isRequired
};

class TerminateBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { agreement: null };

    this.getData = this.getData.bind(this);
    this.clicked = this.clicked.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    $.ajax({
      url: 'index.php?module=intern&action=AffiliateRest&affiliation_agreement_id=' + this.props.affiliationId,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        this.setState({ agreement: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  clicked() {
    $.ajax({
      url: 'index.php?module=intern&action=AffiliateRest&affiliation_agreement_id=' + this.props.affiliationId,
      type: 'POST',
      success: function () {
        this.getData();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    if (this.state.agreement == null) {
      return <div></div>;
    }

    return (
      <div>
        <TerminateButton clicked={this.clicked} terminated={this.state.agreement.terminated} />
      </div>
    );
  }
}

TerminateBox.propTypes = {
  affiliationId: PropTypes.number.isRequired,
  url: PropTypes.string
};

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(<TerminateBox affiliationId={window.aaId} />, document.getElementById('terminate'));
