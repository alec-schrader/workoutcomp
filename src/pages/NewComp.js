import React, { useState } from 'react';
import { Grid, Container, Box, TextField, Button, ButtonGroup, Paper, Typography, Divider, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PersonAdd from '@mui/icons-material/PersonAdd';
import PersonRemove from '@mui/icons-material/PersonRemove';
import RuleCard from '../components/RuleCard'
import dayjs from 'dayjs';


export default function NewComp() {
    const [ruleSet, setRuleSet] = useState(1);
    const [numEmails, setnumEmails] = useState(3);
    const [emails, setEmails] = useState([]);
    const [compName, setCompName] = useState('');
    const [compCode, setCompCode] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(30, 'day'));

    const emailList = () => {
        let emailArr = [];
        for(var i = 0; i < numEmails; i++){
            emailArr.push(i + 1);
        }
        return emailArr.map((number) =>  
        <Grid item xs={12} sm={4} key={number}>
            <TextField
                required
                id={"Email" + number.toString()}
                label={"Email " + number.toString()}
                margin="normal"
            />
        </Grid>);
    }

    const ruleChoices = [
        {
            value: 1,
            name: "Standard",
            description: "A balanced ruleset with no category prioritized over another."
        },
        {
            value: 2,
            name: "Strength Focus",
            description: "A ruleset that gives more points to strength based exercises."
        },
        {
            value: 3,
            name: "Cardio Focus",
            description: "A ruleset that gives more points to cardio based exercises."
        },
        {
            value: 4,
            name: "Wellness Focus",
            description: "A ruleset that gives more points to wellness based exercises."
        },
    ]

    const ruleList = () => {
        return ruleChoices.map((rule) =>  
        <Grid item xs={12} sm={3} key={rule.value}>
            <RuleCard 
                name={rule.name}
                description={rule.description}
                value={rule.value}
                control={<Radio value={rule.value}/>}
                />
        </Grid>
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(ruleSet, numEmails, compName, compCode, startDate.toString(), endDate.toString());
    }

    return (
        <Container>
            <Paper>
                <Box alignContent={'center'} alignItems={'center'} textAlign={"center"}>
                    <form method='put' onSubmit={handleSubmit}>
                        <Typography variant='h2'>A New Challenge?</Typography>
                        <Divider></Divider>

                        <Box mt={2} mb={2}>
                            <Typography variant='h4' gutterBottom>What are the rules?</Typography>
                            <RadioGroup
                                name="ruleset"
                                value={ruleSet}
                                onChange={(event) => {
                                            setRuleSet(event.target.value);
                                        }}
                            >
                                <Grid container>
                                    {ruleList()}
                                </Grid>
                            </RadioGroup>
                        </Box>
                        
                        <Divider></Divider>
                        
                        <Box mt={2} mb={2}>
                            <Typography gutterBottom variant='h4'>Who else is joining?</Typography>
                            <Typography variant='body1'>Enter the email addresses of everyone that you would like to join your competition.</Typography>
                            <Grid container>
                                {emailList()}
                            </Grid>
                            
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button onClick={() => setnumEmails(numEmails - 1)}><PersonRemove sx={{ display: { md: 'flex' }, mr: 1 }} /></Button>
                                <Button onClick={() => setnumEmails(numEmails + 1)}><PersonAdd sx={{ display: { md: 'flex' }, mr: 1 }} /></Button>
                            </ButtonGroup>
                        </Box>
                        <Divider></Divider>

                        <Box mt={2} mb={2}>
                            <Typography variant='h4' gutterBottom>Competition Information</Typography>
                            <Grid container>
                                <Grid item xs={12} sm={3} mb={2}>
                                    <TextField
                                        required
                                        id="compname"
                                        label="Competition Name"
                                        name='compName'
                                        value={compName}
                                        onChange={(event) => {
                                            setCompName(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} mb={2}>
                                    <TextField
                                        required
                                        id="compcode"
                                        label="Competition Code"
                                        name='compCode'
                                        value={compCode}
                                        onChange={(event) => {
                                            setCompCode(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} mb={2}>
                                    <DatePicker 
                                        label="Start Date"
                                        inputFormat="MM/DD/YYYY"
                                        renderInput={(params) => <TextField {...params} />}
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                        name='startDate'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} mb={2}>
                                    <DatePicker
                                        label="End Date"
                                        inputFormat="MM/DD/YYYY"
                                        renderInput={(params) => <TextField {...params} />}
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                        name='endDate'
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