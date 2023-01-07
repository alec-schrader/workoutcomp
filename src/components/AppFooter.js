import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SportsBarIcon from '@mui/icons-material/SportsBar';


export default function AppFooter() {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{marginTop: 'calc(10% + 60px)',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      backgroundColor: 'black'
      }} component="footer" square variant="outlined">
        <SportsBarIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            UNSOBER OCTOBER
          </Typography>
      </Paper>
  );
}