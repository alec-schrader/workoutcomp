import React, { useState } from 'react';
import { Container, Box, TextField, Button, ButtonGroup} from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import PersonAdd from '@mui/icons-material/PersonAdd';
import PersonRemove from '@mui/icons-material/PersonRemove';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


export default function NewComp() {
    const [numEmails, setnumEmails] = useState(3);
    const [startDate, setstartDate] = useState(dayjs());
    const [endDate, setendDate] = useState(dayjs().add(30, 'day'));

    const emailList = () => {
        let emailArr = [];
        for(var i = 0; i < numEmails; i++){
            emailArr.push(i + 1);
        }
        return emailArr.map((number) =>  
        <TextField
            required
            id={"Email" + number.toString()}
            label={"Email " + number.toString()}
            key={number}
        />);
    }

    return (
        <Container sx={{
            textAlign: 'center',
            alignItems:'center'
          }}>
            <h1>A New Challenge?</h1>
            <Box
                display="row"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                noValidate
                autoComplete="off"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
            >
                <h2>What are the rules?</h2>
                radiobuttons with premade ruleset

                <h2>Who else is joining?</h2>
                <p>Enter the email addresses of everyone that you would like to join your competition.</p>
                {emailList()}
                <br></br>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => setnumEmails(numEmails - 1)}><PersonRemove sx={{ display: { md: 'flex' }, mr: 1 }} /></Button>
                    <Button onClick={() => setnumEmails(numEmails + 1)}><PersonAdd sx={{ display: { md: 'flex' }, mr: 1 }} /></Button>
                </ButtonGroup>
                <h2>What about you?</h2>
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
                />
                <TextField
                    required
                    type={"password"}
                    id="confimrpassword"
                    label="Confirm Password"
                />
                <h2>Competition Information</h2>
                <TextField
                    required
                    id="compname"
                    label="Competition Name"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker 
                        label="Start Date"
                        inputFormat="MM/DD/YYYY"
                        renderInput={(params) => <TextField {...params} />}
                        value={startDate}
                        onChange={setstartDate}
                        />
                    <MobileDatePicker
                        label="End Date"
                        inputFormat="MM/DD/YYYY"
                        renderInput={(params) => <TextField {...params} />}
                        value={endDate}
                        onChange={setendDate}
                        />
                </LocalizationProvider>
            </Box>

        </Container>
    );
};  