import * as React from 'react';
import { Button, Container, Divider, Grid, Typography, Box, Paper } from "@mui/material";
import LoginButton from '../components/LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

export default function Home() {
    const { isAuthenticated, isLoading, user, getAccessTokenSilently  } = useAuth0();
    const domain = '127.0.0.1:8000'

    var comp = {
        name: 'new comp',
        startdate: '1/1/2000',
        enddate: '1/1/2001',
        ruleset: 1,
        code: "test",
        owner: "alecschrader",
        users: [1]
    }
    const getUserMetadata = async () => {
        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    redirect_uri: window.location.origin,
                    audience: "workoutcomp-api",
                    scope: "list:competition create:competition retrieve:competition update:competition destroy:competition"
                },
            });

            console.log(accessToken)

            const newCompURL = `http://${domain}/users/`;
            const config = {
                headers: { Authorization: `Bearer ${accessToken}` }
            };

            axios.get(newCompURL, config).then(console.log).catch(console.log);
        } catch (e) {
            console.log(e.message);
        }
    }
        
    getUserMetadata();

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <Container sx={{
            textAlign: 'center',
            alignItems:'center'
          }}>
            <Paper>
                <Box pt={2} pb={2}>
                    <Grid container>
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography variant='h2'>Welcome {user ? user.name : "Primal"}!!!</Typography>
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