import * as React from 'react';
import { Button, Container, Divider, Grid, Typography, Box, Paper } from "@mui/material";
import LoginButton from '../components/LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

export default function Welcome() {

    return (
        <Container sx={{
            textAlign: 'center',
            alignItems:'center'
          }}>
            <Paper>
                <Box pt={2} pb={2}>
                    <Grid container>
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography variant='h2'>Welcome Primal!!!</Typography>
                            <Divider></Divider>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography variant='body1'>
                                Are you ready to prove your worth?
                                <br></br>
                                Join a competition and show your ancestors what you are made of!
                            </Typography>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <br></br>
                            <Typography variant='h6'>And also get drunk.</Typography>
                            <br></br>
                        </Grid>
                    </Grid>
                    <LoginButton></LoginButton>
                </Box> 
            </Paper>
        </Container>
    );
};  