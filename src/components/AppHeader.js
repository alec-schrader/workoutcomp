import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
          <SportsBarIcon  />
          <Typography variant="h6" component="div" sx={{ 
            flexGrow: 1,
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',  
          }}>
            UNSOBER OCTOBER
          </Typography>
          {button}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default AppHeader;