import React from 'react';
import { CircularProgress, styled, Box } from '@mui/material';

const StyledContainer = styled(Box)(
  () => `
    display: flex;
    width: 100%;
    height: calc(100vh - ${200}px);
    align-items: center;
    justify-content: center;
    `
);

const LoadingContainer = () => {
  return (
    <StyledContainer data-testid="loading-container">
      <CircularProgress />
    </StyledContainer>
  );
};

export default LoadingContainer;
