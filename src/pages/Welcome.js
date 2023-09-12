import * as React from 'react';
import { Container, Divider, Grid, Typography, Box, Paper } from "@mui/material";
import LoginButton from '../components/LoginButton';

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
                            <Typography variant='h2'>Welcome!</Typography>
                            <Divider></Divider>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography variant='body1'>
                                Do you struggle with accountability on your workouts?
                                <br></br>
                                Create a competition, add your friends, and workout together!
                            </Typography>
                        </Grid>
                    </Grid>
                    <LoginButton></LoginButton>
                </Box> 
            </Paper>
        </Container>
    );
};  