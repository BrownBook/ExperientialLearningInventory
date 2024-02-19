import React from 'react';
import { createRoot } from 'react-dom/client';
import Manager from '../manager/Manager.jsx';

const root = createRoot(document.getElementById('content'));
root.render(<Manager ajaxURL="gradRest" title="Graduate Programs" panelTitle="Add A Graduate Program:" buttonTitle="Add Program" />);
