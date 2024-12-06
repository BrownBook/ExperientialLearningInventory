import React from 'react';
import CipComboBox from '../CipComboBox/CipComboBox';

export default function NewMajorForm() {
  return (
    <div className="card">
      <div className="card-body">
        <span className="lead">Add a New Major</span>

        <div className="mb-2">
          <label htmlFor="newMajorDesc" className="form-label">
            Major/Program Name
          </label>
          <input type="text" className="form-control" id="newMajorDesc" />
        </div>

        <div className="mb-2">
          <label htmlFor="newMajorLevel" className="form-label">
            Level
          </label>
          <input type="text" className="form-control" id="newMajorLevel" />
        </div>

        <div className="mb-2">
          <label htmlFor="newMajorCode" className="form-label">
            Major Code
          </label>
          <input type="text" className="form-control" id="newMajorCode" aria-describedby="majorCodeHelp" />
          <div id="majorCodeHelp" className="form-text">
            Matches the major code in your Student Information System
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="newMajorCIP" className="form-label">
            CIP Code
          </label>
          <CipComboBox />
        </div>
      </div>
    </div>
  );
}
