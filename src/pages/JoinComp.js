import React, { useState } from 'react';
import { Grid, Container, Box, TextField, Button, Paper, Typography, Divider } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { addUsertoCompetition } from '../services/CompetitionService'



export default function JoinComp() {
    const { getAccessTokenSilently } = useAuth0();
    const [compCode, setCompCode] = useState('');
    const [codeMessage, setCodeMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const token = await getAccessTokenSilently()
        try {
            await addUsertoCompetition(token, compCode);
        } catch (err){
            console.log(err);
            setCodeMessage('Invalid Code.')
            return
        }
        window.location.replace('/')
    }

    return (
        <Container>
            <Paper>
                <Box alignContent={'center'} alignItems={'center'} textAlign={"center"}>
                    <form method='put' onSubmit={handleSubmit}>
                        <Typography variant='h2'>Have a Code?</Typography>
                        <Divider></Divider>

                        <Box mt={2} mb={2}>
                            <Grid container>
                                <Grid item xs={12} mb={2}>
                                    <TextField
                                        required
                                        error={codeMessage ? true : false}
                                        id="compCode"
                                        label="Competition Code"
                                        name='compCode'
                                        value={compCode}
                                        helperText={codeMessage ? codeMessage : ''}
                                        onChange={(event) => {
                                            setCompCode(event.target.value);
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