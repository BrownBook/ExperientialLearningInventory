/* eslint-disable react/prop-types */
import React, { forwardRef, useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getCipCodes } from '../api/api';
import Select from 'react-select';

const CipComboBox = forwardRef(function CipComboBox({ id, classNames, onChange }, ref) {
  const cipQuery = useQuery({ queryKey: ['cipCodes'], queryFn: getCipCodes });

  const handleChange = useCallback((value, actionType) => {
    onChange(value, actionType);
  }, []);

  function getOptionLabel(item) {
    return `${item.cip_code} - ${item.cip_title}`;
  }

  function getOptionValue(item) {
    return item.cip_code;
  }

  if (cipQuery.isPending) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (cipQuery.error) {
    return 'An error has occurred: ' + cipQuery.error.message;
  }

  // TODO: This needs to use styles/classes from Bootstrap
  // Providing the 'form-select' classname doesn't work, since Bootstrap adds a second drop-down/carrot icon
  // Also affects form validation with the passed in classNames prop
  return (
    <div>
      <Select options={cipQuery.data} getOptionLabel={getOptionLabel} getOptionValue={getOptionValue} inputId={id} onChange={handleChange} ref={ref} />
    </div>
  );
});

export default CipComboBox;
