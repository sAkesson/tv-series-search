import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';

interface ErrorProps {
  children: ReactNode;
}

const Header = ({ children }: ErrorProps) => {
  return (
    <Paper
      elevation={0}
      square
      sx={{
        width: '100%',
        height: 170,
        backgroundColor: '#142433',
        color: '#fff',
      }}
    >
      {children}
    </Paper>
  );
};

export default Header;
