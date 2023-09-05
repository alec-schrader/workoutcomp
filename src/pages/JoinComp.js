import * as React from 'react';
import { Container, Box, TextField, Paper } from "@mui/material";


export default function JoinComp() {
    return (
        <Container sx={{
            textAlign: 'center',
            alignItems:'center'
          }}>
            <Paper>
                <Box pt={2} pb={2}>
                    <h1>Have a code?</h1>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            required
                            id="compcode"
                            label="Competition Code"
                            helperText="The code you recieved in your invitation."
                        />
                        <TextField
                            required
                            id="displayname"
                            label="Display Name"
                            helperText="The name you would like to use in the competition."
                        />
                        <TextField
                            required
                            type={"password"}
                            id="password"
                            label="Password"
                            helperText="This will be how you access this competition in the future."
                        />
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};  