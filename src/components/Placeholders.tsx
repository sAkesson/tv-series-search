import React from 'react';
import { Box } from '@mui/material';

export const ImagePlaceholder = () => {
  return (
    <Box
      sx={{
        flex: '1 0 auto',
        backgroundColor: 'gray',
        display: 'flex',
        width: '120px',
        maxWidth: '120px',
        height: '168px',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      No Image
    </Box>
  );
};
