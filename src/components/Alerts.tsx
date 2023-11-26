import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

interface ErrorProps {
  title: string;
  message: string;
}

const ErrorAlert = ({ title, message }: ErrorProps) => {
  return (
    <Alert severity="error">
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorAlert;
