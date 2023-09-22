import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Container, Box, TextField, Button, Paper, Typography, Divider } from "@mui/material";
import { getUser, updateUser } from '../services/UserService'
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
    const { user } = useAuth0();

    const [userData, setUserData] = useState({});
    const [username, setUsername] = useState('');
    const [color, setColor] = useState('');
    const [restingHeartRate, setRestingHeartRate] = useState(0);

    useEffect(() => {
        async function getUserData() {
          const resp =  await getUser(user.sub);
          setUserData(resp);
          setUsername(resp.profile.username)
          setColor(resp.profile.color)
          setRestingHeartRate(resp.profile.restingHeartRate)
        };
    
        if (!user.id) {
            getUserData();
        }
    }, [user]);


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            userData.profile.username = username;
            userData.profile.color = color;
            userData.profile.restingHeartRate = restingHeartRate
            console.log(userData.id, user)
            await updateUser(userData.id, userData);
        } catch (err){
            return
        }
        window.location.replace('/')
    }

    return (
        <Container>
            <Paper>
                <Box alignContent={'center'} alignItems={'center'} textAlign={"center"}>
                    <form method='put' onSubmit={handleSubmit}>
                        <Typography variant='h2'>Update Profile</Typography>
                        <Divider></Divider>

                        <Box mt={2} mb={2}>
                            <Grid container>
                            <Grid item xs={12} mb={2}>
                                    <TextField
                                        required
                                        id="username"
                                        label="User Name"
                                        name='username'
                                        value={username}
                                        onChange={(event) => {
                                            setUsername(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} mb={2}>
                                    <TextField
                                        required
                                        id="color"
                                        label="Color"
                                        name='color'
                                        type='color'
                                        sx={{width: '200px'}}
                                        value={color}
                                        onChange={(event) => {
                                            setColor(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} mb={2}>
                                    <TextField
                                        required
                                        id="restingHR"
                                        label="Resting Heart Rate"
                                        name='restingHR'
                                        value={restingHeartRate}
                                        type='number'
                                        onChange={(event) => {
                                            setRestingHeartRate(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} mb={2}>
                                    <Button variant='contained' type='submit'>Submit</Button>
                                </Grid>
                            </Grid>
                        </Box>

                    </form>
                </Box>
            </Paper>
        </Container>
    );
};  