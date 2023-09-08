import * as React from 'react';
import { Button, Container, Divider, Grid, Typography, Box, Paper } from "@mui/material";
import CompetitionCard from '../components/CompetitionCard';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

export default function Home() {
    const { user, getAccessTokenSilently  } = useAuth0();
    const domain = '127.0.0.1:8000'

    if (!user) {
        return null;
    }

    const getUserData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();

            console.log(accessToken)
            console.log(user)

            const userid = user.sub.replace('auth0|', '')

            const newCompURL = `http://${domain}/users/username/${userid}`;

            const config = {
                headers: { Authorization: `Bearer ${accessToken}` }
            };

            axios.get(newCompURL, config).then(console.log).catch(console.log);
        } catch (e) {
            console.log(e.message);
        }
    }
        
    getUserData();


    return (
        <Container sx={{
            textAlign: 'center',
            alignItems:'center'
          }}>
            <Paper>
                <Box pt={2} pb={2}>
                    <Grid container>
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography variant='h2'>Welcome {user ? user.nickname : "Primal"}!!!</Typography>
                            <Divider></Divider>
                        </Grid>
                    </Grid>                    
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={12} xs={12}>
                            <Typography variant='h4'>Competitions</Typography>
                            <Divider></Divider>
                            <CompetitionCard />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Typography variant='h4'>Workouts</Typography>
                            <Divider></Divider>
                        </Grid>
                    </Grid>
                </Box> 
            </Paper>
        </Container>
    );
};  