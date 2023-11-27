import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ErrorProps {
  title: string;
  message: string;
}

export const ErrorAlert = ({ title, message }: ErrorProps) => {
  return (
    <Alert severity="error">
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};
