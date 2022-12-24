import React from 'react';
import ReactDOM from 'react-dom';
import Manager from '../manager/Manager.jsx';

ReactDOM.render(
  <Manager ajaxURL="majorRest" title="Undergraduate Majors" panelTitle="Add An Undergraduate Major:" buttonTitle="Add Major" />,
  document.getElementById('content')
);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}
