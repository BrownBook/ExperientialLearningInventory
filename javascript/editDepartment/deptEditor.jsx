import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Manager from '../manager/Manager.jsx';

ReactDOM.render(
  <StrictMode>
    <Manager ajaxURL="deptRest" title="Departments" panelTitle="Add A Department " buttonTitle="Add Department" />
  </StrictMode>,
  document.getElementById('content')
);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}
