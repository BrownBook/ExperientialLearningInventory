import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Manager from '../manager/Manager.jsx';

const root = createRoot(document.getElementById('content'));
root.render(
  <StrictMode>
    <Manager ajaxURL="deptRest" title="Departments" panelTitle="Add A Department " buttonTitle="Add Department" />
  </StrictMode>
);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, root, 1000);
}
