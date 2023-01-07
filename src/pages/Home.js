import * as React from 'react';
import { Button, Container, dividerClasses, Grid, Item } from "@mui/material";


export default function Home() {
    return (
        <Container sx={{
            textAlign: 'center',
            alignItems:'center'
          }}>
            <h1>Welcome Primals!</h1>
            <p>
                Are you ready to prove your worth?
            </p>
            <p>
                Join a competition and show your ancestors what you are made of!
                <br></br>
                <h6>And also get drunk.</h6>
            </p>
            <Grid container spacing={2}>
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
        </Container>
    );
};  