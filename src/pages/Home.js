import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Divider, Grid, Typography, Box, Paper, Button } from "@mui/material";
import CompetitionCard from '../components/CompetitionCard';
import WorkoutCard from '../components/WorkoutCard';
import { useAuth0 } from "@auth0/auth0-react";
import { getUserData } from '../services/UserService'

export default function Home() {
    const { user, getAccessTokenSilently  } = useAuth0();
    const [ apiUser, setApiUser ] = useState({});

    useEffect(() => {
        // React advises to declare the async function directly inside useEffect
        async function getApiUser() {
          const token = await getAccessTokenSilently();
          const resp =  await getUserData(token, user.sub);
          console.log(resp)
          setApiUser(resp);
        };
    
        if (!apiUser.id) {
            getApiUser();
        }
    }, [apiUser, getAccessTokenSilently, user]);

    const competitionList = () => {
        if(apiUser.competitions == null) return <div></div>
        return apiUser.competitions.map((competition) =>  
            <CompetitionCard key={competition.id} competition={competition} />
        );
    }

    const workoutList = () => {
        if(apiUser.workouts == null) return <div></div>
        return apiUser.workouts.map((workout) =>  
            <WorkoutCard key={workout.id} workout={workout} />
        );
    }
        
    return (
        <Container sx={{
            textAlign: 'center',
            alignItems:'center'
          }}>
            <Paper>
                <Box pt={2} pb={2}>
                    <Grid container>
                        <Grid item xs={12}>
                            <p>{JSON.stringify(apiUser)}</p>
                            <Typography variant='h2'>Welcome {user ? user.nickname : "Primal"}!!!</Typography>
                            <Divider></Divider>
                        </Grid>
                    </Grid>                    
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <Typography variant='h4'>Competitions</Typography>
                            <Divider></Divider>
                            <Button variant='contained' href='new-comp'>Create or Join Competition</Button>
                            {competitionList()}
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography variant='h4'>Workouts</Typography>
                            <Divider></Divider>
                            <Button variant='contained' href='new-workout'>Add Workout</Button>
                            {workoutList()}
                        </Grid>
                    </Grid>
                </Box> 
            </Paper>
        </Container>
    );
};  