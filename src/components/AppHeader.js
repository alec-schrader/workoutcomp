import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LogoutButton from './LogoutButton';
import Box from '@mui/material/Box';
import { useAuth0 } from "@auth0/auth0-react";


function AppHeader() {
  const { isAuthenticated } = useAuth0();

  let button;
  if (isAuthenticated) {
    button = <LogoutButton />;    
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <FitnessCenterIcon  />
          <Typography variant="h6" component="div" sx={{ 
            flexGrow: 1,
            ml: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',  
          }}>
            Workout With Friends
          </Typography>
          {button}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default AppHeader;