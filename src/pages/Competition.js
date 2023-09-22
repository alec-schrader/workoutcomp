import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Container,
  Box,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import {
  getCompetition,
  getCompetitionWorkouts,
} from "../services/CompetitionService";
import { WorkoutCardComp } from "../components/WorkoutCard";
import LeaderboardChart from "../components/LeaderboardChart";
import CompetitionDatePercentage from "../components/CompetitionDatePercentage";

export default function Competition() {
  const { competitionId } = useParams();
  const [comp, setComp] = useState({});
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    async function getData() {
      const compResp = await getCompetition(competitionId);
      setComp(compResp);

      const workResp = await getCompetitionWorkouts(competitionId);
      setWorkouts(workResp);
    }

    if (competitionId) getData();
  }, [competitionId]);

  const workoutList = () => {
    if (workouts == {}) return <div></div>;
    return workouts.map((workout) => (
      <WorkoutCardComp key={workout.id} workout={workout} />
    ));
  };

  return (
    <Container>
      <Paper>
        <Box alignContent={"center"} alignItems={"center"} textAlign={"center"}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h2">{comp.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider></Divider>
            </Grid>
            <Grid item xs={8}>
              <LeaderboardChart></LeaderboardChart>
              <Divider></Divider>
              <Typography variant="h4">Points Breakdown</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Workout Feed</Typography>
              <Divider></Divider>
              {workoutList()}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
