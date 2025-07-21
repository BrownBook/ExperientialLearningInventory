/* eslint-disable react/prop-types */
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import CipComboBox from '../CipComboBox/CipComboBox';
import StudentLevelSelect from '../studentLevelSelect/StudentLevelSelect';
import classnames from 'classnames';
import { z } from 'zod';

// TODOS:
// * Bootstrap styling on the CipComboBox
// * Clear the fields after success
// * Show a toast message on success/failure

const NewMajorForm = forwardRef(function NewMajorForm({ onSubmitHandler }, ref) {
  const [selectedCip, setSelectedCip] = useState({}); // {cip_family: 1, cip_code: '01.01', cip_title: 'Agricultural Business and Management.'}
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const nameRef = useRef(null);
  const levelRef = useRef(null);
  const codeRef = useRef(null);
  const cipRef = useRef(null);

  // Zod schema for form validation
  const majorSchema = z.object({
    name: z.string().trim().min(1),
    level: z.string().min(1),
    code: z.string().trim().min(1),
    cipCode: z.string().trim().min(1)
  });

  // Custom error message map for Zod validation
  const customErrorMap = (issue, ctx) => {
    if (issue.path[0] === 'name' && issue.code === 'too_small') {
      return { message: 'Please provide a Major/Program name' };
    }

    if (issue.path[0] === 'code' && issue.code === 'too_small') {
      return { message: 'Please provide a Major Code' };
    }

    if (issue.path[0] === 'cipCode' && issue.code === 'invalid_type') {
      return { message: 'Select a CIP Code' };
    }

    // If nothing matched above, return the default error message
    return { message: ctx.defaultError };
  };

  // Clear/reset all form fields
  const clearForm = useCallback(() => {
    if (nameRef.current) nameRef.current.value = '';
    // if (levelRef.current) levelRef.current.value = '';
    if (codeRef.current) codeRef.current.value = '';
    if (cipRef.current) cipRef.current.clearValue(); // Clear the CipComboBox

    setSelectedCip({}); // Reset selected CIP
    setValidationErrors({}); // Clear validation errors
  });

  // Expose the clearForm function to the parent component via ref
  useImperativeHandle(ref, () => ({
    clearForm
  }));

  // Simple delay function, to make sure the user sees the "Saving..." state.
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onClickHandler = useCallback(
    async event => {
      event.preventDefault();

      setIsSubmitting(true);

      const major = {
        name: document.getElementById('newMajorDesc').value,
        level: document.getElementById('newMajorLevel').value,
        code: document.getElementById('newMajorCode').value,
        cipCode: selectedCip.cip_code
      };

      const validationResult = majorSchema.safeParse(major, { errorMap: customErrorMap });

      if (!validationResult.success) {
        console.error('Validation failed', validationResult.error.flatten());
        setValidationErrors(validationResult.error.flatten().fieldErrors);
        setIsSubmitting(false); // Reset submission state
        return;
      }

      // Call the onSubmitHandler passed via props
      await onSubmitHandler(major);

      await delay(500); // Wait a second for effect
      setIsSubmitting(false); // Reset the form state so it can be submitted again
    },
    [selectedCip, onSubmitHandler, setIsSubmitting, setValidationErrors]
  );

  const cipOnChange = useCallback((value, actionType) => {
    setSelectedCip(value);
  }, []);

  const nameInputClassnames = classnames('form-control', { 'is-invalid': validationErrors?.name });
  const codeInputClassnames = classnames('form-control', { 'is-invalid': validationErrors?.code });
  // const cipSelectClassnames = classnames('form-select', { 'is-invalid': validationErrors?.cipCode });

  return (
    <div className="card">
      <div className="card-body">
        <span className="lead">Add a New Major</span>

        <div className="mb-2">
          <label htmlFor="newMajorDesc" className="form-label is-invalid">
            Major/Program Name
          </label>
          <input type="text" ref={nameRef} className={nameInputClassnames} id="newMajorDesc" />
          <div className="invalid-feedback">{validationErrors?.name}</div>
        </div>

        <div className="mb-2">
          <StudentLevelSelect id="newMajorLevel" onChange={() => {}} ref={levelRef} />
        </div>

        <div className="mb-2">
          <label htmlFor="newMajorCode" className="form-label">
            Major Code
          </label>
          <input type="text" ref={codeRef} className={codeInputClassnames} id="newMajorCode" aria-describedby="majorCodeHelp" />
          <div className="invalid-feedback">{validationErrors?.code}</div>
          <div id="majorCodeHelp" className="form-text">
            Matches the major code in your Student Information System
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="newMajorCIP" className="form-label">
            CIP Code
          </label>
          <br />
          <CipComboBox id="newMajorCIP" onChange={cipOnChange} ref={cipRef} />
          <div className="invalid-feedback">{validationErrors?.code}</div>
        </div>

        <div className="mb-2 float-end">
          <button type="submit" className="btn btn-secondary" onClick={onClickHandler} disabled={isSubmitting ? 'disabled' : ''}>
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Saving...
              </>
            ) : (
              'Add Major'
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

export default NewMajorForm;
