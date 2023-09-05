import * as React from 'react';
import { Button, Container, Divider, Grid, Typography, Box, Paper } from "@mui/material";
import LoginButton from '../components/LoginButton';
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
    const { isAuthenticated } = useAuth0();

    return (
        <Container sx={{
            textAlign: 'center',
            alignItems:'center'
          }}>
            <Paper>
                <Box pt={2} pb={2}>
                    <Grid container>
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography variant='h2'>Welcome Primals!</Typography>
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
                    {!isAuthenticated 
                        ?<LoginButton></LoginButton>
                        :<Grid container spacing={2}>
                            <Grid item md={3} sm={0} xs={0}>
                            </Grid>
                            <Grid item md={2} sm={12} xs={12}>
                                <Button variant='contained' href='new-comp'>Start a New Competition</Button>
                            </Grid>
                            <Grid item md={2} sm={12} xs={12}>
                                <h3>- OR -</h3>
                            </Grid>
                            <Grid item md={2} sm={12} xs={12}>
                                <Button variant='contained' href='join-comp'>Join a Competition</Button>
                            </Grid>
                        </Grid>
                    }
                </Box> 
            </Paper>
        </Container>
    );
};  