import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Grid, Container, Box, TextField, Button, Paper, Typography, Divider, RadioGroup, Radio, FormControlLabel} from "@mui/material";
import dayjs from 'dayjs';
import { useAuth0 } from "@auth0/auth0-react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getCompetitionData } from '../services/CompetitionService'
import categoryChoices from '../data/workoutCategories'



export default function Competition() {
    const { compID } = useParams();
    const { getAccessTokenSilently  } = useAuth0();
    const [comp, setComp] = useState({});

    useEffect(() => {
        async function getData() {
          const token = await getAccessTokenSilently();
          const resp =  await getCompetitionData(token, compID); 
          console.log(resp)         
          setComp(resp)
        };
    
        if(compID) getData();
    }, [getAccessTokenSilently, compID]);

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