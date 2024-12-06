import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getMajors } from '../api/api';
import { ErrorBoundary } from 'react-error-boundary';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid
import NewMajorForm from './NewMajorForm';

const queryClient = new QueryClient();

function MajorsAndPrograms() {
  //const queryClient = useQueryClient();

  const majorsQuery = useQuery({ queryKey: ['majors'], queryFn: getMajors });

  if (majorsQuery.isPending) {
    // TODO: Better loading indicator
    return 'Loading...';
  } else {
    console.log(majorsQuery);
  }

  if (majorsQuery.error) {
    return 'An error has occurred: ' + majorsQuery.error.message;
  }

  const colDefs = [
    { field: 'description', width: 300 },
    { field: 'level', width: 75 },
    { field: 'code', width: 110, headerName: 'Major Code' },
    { field: 'cip_code', width: 100, headerName: 'CIP Code' },
    { field: 'cip_title', width: 300, headerName: 'CIP Title' }
  ];

  return (
    <div className="row">
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={majorsQuery.data} columnDefs={colDefs} />
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('content'));

root.render(
  <QueryClientProvider client={queryClient}>
    <h1>Majors &amp; Programs</h1>
    <div className="row">
      <div className="col-md-9">
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <MajorsAndPrograms />
        </ErrorBoundary>
      </div>

      <div className="col-md-3">
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <NewMajorForm />
        </ErrorBoundary>
      </div>
    </div>
  </QueryClientProvider>
);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, root, 1000);
}
