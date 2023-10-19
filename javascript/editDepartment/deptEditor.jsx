import { createRoot } from 'react-dom/client';
import { react, StrictMode } from 'react';
import Manager from '../manager/Manager.jsx';

const container = document.getElementById('content');
const root = createRoot(container);
root.render(
  <ScrictMode>
    <Manager ajaxURL="deptRest" title="Departments" panelTitle="Add A Department " buttonTitle="Add Department" />
  </ScrictMode>
);

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
