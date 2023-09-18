import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Grid, Container, Box, TextField, Button, Paper, Typography, Divider, RadioGroup, Radio, FormControlLabel} from "@mui/material";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getCompetition } from '../services/CompetitionService'
import categoryChoices from '../data/workoutCategories'



export default function Competition() {
    const { compID } = useParams();
    const [comp, setComp] = useState({});

    useEffect(() => {
        async function getData() {
          const resp =  await getCompetition(compID); 
          console.log(resp)         
          setComp(resp)
        };
    
        if(compID) getData();
    }, [compID]);

    return (
        <Container>
            <Paper>
                <Box alignContent={'center'} alignItems={'center'} textAlign={"center"}>
                    Hello
                </Box>
            </Paper>
        </Container>
    );
};  