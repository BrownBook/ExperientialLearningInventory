import React from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '@tanstack/react-query';
import { getStudentLevels } from '../api/api';

export default function StudentLevelSelect({ id, onChange }) {
  const levelsQuery = useQuery({ queryKey: ['studentLevels'], queryFn: getStudentLevels, staleTime: 3000 });

  if (levelsQuery.isPending) {
    return (
      <>
        <label htmlFor={id} className="form-label">
          Level
        </label>
        <br />
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>
    );
  }

  if (levelsQuery.error) {
    return 'An error has occurred: ' + levelsQuery.error.message;
  }

  const selectOptions = levelsQuery.data.map(level => {
    return (
      <option key={level.code} value={level.code}>
        {level.description}
      </option>
    );
  });

  return (
    <>
      <label htmlFor={id} className="form-label">
        Level
      </label>
      <select className="form-select" id={id} onChange={onChange} aria-label="Student level selector">
        {selectOptions}
      </select>
    </>
  );
}

StudentLevelSelect.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func
};
