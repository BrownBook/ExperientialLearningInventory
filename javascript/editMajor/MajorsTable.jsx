import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import PropTypes from 'prop-types';

import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid

export default function MajorsTable({ majorsList, studentLevels, isLoading, rowEditCallback }) {
  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  /**
   * Student Level cell formatter
   * Lookup and map the student level code into the level's description
   * If no level matches, the level code (the cell's raw value) is returned instead
   * When formatting the cell, just the level code value is passed in, and we map that to
   * the matching level object.
   * When the formatter is used for the 'edit' mode, the student level object is passed in.
   * This could be avoided with the Enterprise version of AgGrid, but alas.
   */
  const studentLevelCellFormatter = cell => {
    if (typeof cell.value === 'string') {
      // We were passed a String. Should be a level code. Find the matching object
      const matchedLevel = studentLevels.find(level => level.code === cell.value);

      if (matchedLevel !== undefined) {
        return matchedLevel.description;
      }

      // No matches, so just return the value we were passed (no formatting, should be the level code)
      return cell.value;
    }

    // Must have been an object, so just return the description
    return cell.value.description;
  };

  // Cell renderer for the status column
  const statusCellRenderer = cell => {
    if (cell.value === 0) {
      return '';
    } else {
      return <span className="badge text-bg-secondary">Inactive</span>;
    }
  };

  // TODO: Provide a cell editor for the CipCode column with a CipComboBox
  const colDefs = [
    { field: 'description', width: 300, editable: true, headerName: 'Major Name' },
    {
      field: 'level',
      width: 140,
      valueFormatter: studentLevelCellFormatter,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: studentLevels },
      cellDataType: 'object'
    },
    { field: 'code', width: 110, headerName: 'Major Code' },
    { field: 'cip_code', width: 100, headerName: 'CIP Code', editable: true },
    { field: 'cip_title', width: 240, headerName: 'CIP Title' },
    { field: 'hidden', width: 80, headerName: 'Status', cellRenderer: statusCellRenderer, editable: true }
  ];

  const gridOptions = {
    domLayout: 'autoHeight',
    editType: 'fullRow',
    onRowValueChanged: event => {
      rowEditCallback(event.data); // Call the rowEditCallback with the new data
    }
  };

  return (
    <div className="row">
      <div className="ag-theme-quartz">
        <AgGridReact rowData={majorsList} columnDefs={colDefs} gridOptions={gridOptions} />
      </div>
    </div>
  );
}

MajorsTable.propTypes = {
  majorsList: PropTypes.array,
  studentLevels: PropTypes.array,
  isLoading: PropTypes.bool,
  rowEditCallback: PropTypes.func.isRequired
};
