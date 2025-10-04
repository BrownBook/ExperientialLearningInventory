/* eslint-disable react/prop-types */
import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid

export default function ReportsTable({ isLoading }) {
  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const colDefs = [
    { field: 'reportName', width: 300, headerName: 'Report Name' },
    { field: 'createdBy', width: 200, headerName: 'Created By' },
    { field: 'createdOn', width: 180, headerName: 'Created On' },
    { field: 'download', width: 180, headerName: 'Download' }
  ];

  const gridOptions = {
    domLayout: 'autoHeight'
  };

  return (
    <div>
      <div className="ag-theme-quartz">
        <AgGridReact columnDefs={colDefs} rowData={[]} gridOptions={gridOptions} />
      </div>
    </div>
  );
}
