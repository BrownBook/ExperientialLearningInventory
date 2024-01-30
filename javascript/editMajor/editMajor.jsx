import React from 'react';
import { createRoot } from 'react-dom/client';
import Manager from '../manager/Manager.jsx';

const root = createRoot(document.getElementById('content'));
root.render(<Manager ajaxURL="majorRest" title="Undergraduate Majors" panelTitle="Add An Undergraduate Major:" buttonTitle="Add Major" />);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, root, 1000);
}
