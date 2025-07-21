import React, { useCallback, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query';
import { getMajors, postMajor, patchMajor, getStudentLevels } from '../api/api';
import { ErrorBoundary } from 'react-error-boundary';
import EliToast from '../EliToast/EliToast';

// import ToastContainer from 'react-bootstrap/ToastContainer';
// import Toast from 'react-bootstrap/Toast';

import MajorsTable from './MajorsTable';
import NewMajorForm from './NewMajorForm';

const queryClient = new QueryClient();

function MajorsAndPrograms() {
  const toastRef = useRef();
  const formRef = useRef();

  // Data handling for Majors
  const majorsQuery = useQuery({ queryKey: ['majors'], queryFn: getMajors, staleTime: 3000 });

  // Mutation for creating a new Major
  const majorsCreateMutation = useMutation({
    mutationFn: postMajor,
    onSuccess: (data, variables, context) => {
      // TODO: Maybe don't invalidate the entire query, but update the cache with the new data
      // queryClient.setQueryData(['majors'], oldData => [...oldData, data]);
      queryClient.invalidateQueries({ queryKey: ['majors'] });
      toastRef.current.show(
        <span>
          Successfully added the <strong>{variables.name}</strong> major.
        </span>,
        'success'
      );

      // Clear the form fields in the child component
      if (formRef.current) {
        formRef.current.clearForm();
      }
    },
    onError: (error, variables, context) => {
      // Handle error case, e.g., show a toast message
      console.error('Error creating major:', error);
      toastRef.current.show(
        <span>
          Failed to add the <strong>{variables.name}</strong> major. Please try again.
        </span>,
        'danger'
      );
    }
  });

  // Callback for creating a major, passed to child form
  const handleCreateMajor = useCallback(
    newMajor => {
      majorsCreateMutation.mutate(newMajor);
    },
    [majorsCreateMutation]
  );

  // Mutation for updating an existing Major
  const majorsEditMutation = useMutation({
    mutationFn: patchMajor,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['majors'] });
      // TODO: Show a toast message
    }
  });

  const handleRowEdit = useCallback(
    editedMajor => {
      // Find and replace the row
      majorsEditMutation.mutate(editedMajor);
    },
    [majorsEditMutation]
  );

  if (majorsQuery.error) {
    return 'An error has occurred: ' + majorsQuery.error.message;
  }

  // Data handling for Student Levels
  const levelsQuery = useQuery({ queryKey: ['studentLevels'], queryFn: getStudentLevels, staleTime: 3000 });

  if (levelsQuery.error) {
    return 'An error has occurred: ' + levelsQuery.error.message;
  }

  const returnVal = (
    <div>
      <EliToast ref={toastRef} />
      <h1>Majors &amp; Programs</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          toastRef.current.show(
            <span>
              Successfully added the <strong>toast</strong> major.
            </span>,
            'success'
          );
        }}
      >
        Show a Toast
      </button>
      <div className="row">
        <div className="col-md-9">
          <ErrorBoundary fallback={<div>Something went wrong.</div>}>
            <MajorsTable
              majorsList={majorsQuery.data}
              studentLevels={levelsQuery.data}
              isLoading={majorsQuery.isPending || levelsQuery.isPending}
              rowEditCallback={handleRowEdit}
            />
          </ErrorBoundary>
        </div>

        <div className="col-md-3">
          <ErrorBoundary fallback={<div>Something went wrong.</div>}>
            <NewMajorForm onSubmitHandler={handleCreateMajor} studentLevels={levelsQuery.data} ref={formRef} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );

  return returnVal;
}

const root = createRoot(document.getElementById('content'));

root.render(
  <QueryClientProvider client={queryClient}>
    <MajorsAndPrograms />
  </QueryClientProvider>
);

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, root, 1000);
}
