import React, { forwardRef, useImperativeHandle, useState } from 'react';

import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

// variant is oneOf ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
const EliToast = forwardRef(function EliToast(props, ref) {
  const [isShown, setShown] = useState(false);
  //const [variant, setVariant] = useState('primary');
  const [text, setText] = useState('');

  useImperativeHandle(ref, () => ({
    show: (text, variant) => {
      // setVariant('light');
      if (variant === 'success') {
        setText(
          <div>
            <i className="fa-regular fa-circle-check text-success" style={{ marginRight: '.5em' }}></i>
            {text}
          </div>
        );
      } else if (variant === 'danger') {
        setText(
          <div>
            <i className="fa-regular fa-circle-xmark text-danger" style={{ marginRight: '.5em' }}></i>
            {text}
          </div>
        );
      } else {
        setText(text);
      }

      setShown(true);

      setTimeout(() => {
        setShown(false);
      }, 8000); // Automatically hide after 5 seconds
    }
  }));

  return (
    <div>
      <ToastContainer ref={ref} className="p-3 position-fixed" position="top-end" style={{ zIndex: 1 }}>
        <Toast show={isShown} className="d-inline-block m-1" bg="light">
          <Toast.Body className="light">{text}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
});

export default EliToast;
