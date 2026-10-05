import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Offcanvas from 'react-bootstrap/Offcanvas';
import ReportsTable from '../reports/ReportsTable';

const queryClient = new QueryClient();

function ReportsPage() {
  const [showNewReportPanel, setShowNewReportPanel] = useState(false);

  const handleShowNewReportPanel = () => {
    setShowNewReportPanel(true);
  };

  const handleHideNewReportPanel = () => {
    setShowNewReportPanel(false);
  };

  return (
    <div>
      <h1>
        <i className="fa-regular fa-chart-bar"></i> Reports
      </h1>

      <div className="row mb-2">
        <div className="col-md-12">
          <div className="float-end">
            <button type="button" className="btn btn-primary mb-3" onClick={handleShowNewReportPanel}>
              <i className="fa-solid fa-file-circle-plus"></i> Create a Report
            </button>
          </div>
        </div>
      </div>

      <Offcanvas show={showNewReportPanel} onHide={handleHideNewReportPanel} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Create a New Report</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Report creation functionality coming soon!</p>
        </Offcanvas.Body>
      </Offcanvas>

      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <ReportsTable />
      </ErrorBoundary>
    </div>
  );
}

const root = createRoot(document.getElementById('content'));

root.render(
  <QueryClientProvider client={queryClient}>
    <ReportsPage />
  </QueryClientProvider>
);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, root, 1000);
}
