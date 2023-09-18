import React, { useState } from 'react';
import { Grid, Container, Box, TextField, Button, Paper, Typography, Divider, RadioGroup, Radio} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import RuleCard from '../components/RuleCard'
import dayjs from 'dayjs';
import { createCompetition } from '../services/CompetitionService'
import ruleChoices from '../data/competitionRules'


export default function NewComp() {
    const [ruleSet, setRuleSet] = useState(1);
    const [compName, setCompName] = useState('');
    const [compCode, setCompCode] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(30, 'day'));
    const [formErrors, setFormErrors] = useState({})

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

    async function handleSubmit(e) {
        e.preventDefault();
        const newComp = {
            name: compName,
            startdate: startDate.format("YYYY-MM-DD"),
            enddate: endDate.format("YYYY-MM-DD"),
            ruleset: ruleSet,
            code: compCode,
            users: []
        }
        try {
            const data = await createCompetition(newComp);
            window.location.replace(`/competition/${data.id}`)
        } catch (err){
            setFormErrors(err.response.data);
            return
        }
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
                                        error={formErrors.code ? true : false}
                                        id="compcode"
                                        label="Competition Code"
                                        name='compCode'
                                        value={compCode}
                                        helperText={formErrors.code ? formErrors.code[0] : ''}
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