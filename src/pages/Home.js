import * as React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Divider,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
} from "@mui/material";
import CompetitionCard from "../components/CompetitionCard";
import { WorkoutCard } from "../components/WorkoutCard";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "../services/UserService";
import { getCompetitionsForUser } from "../services/CompetitionService";

export default function Home() {
  const { user } = useAuth0();
  const [apiUser, setApiUser] = useState({ profile: {} });
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    async function getApiUser() {
      const resp = await getUser(user.sub);
      setApiUser(resp);
      const compResp = await getCompetitionsForUser(resp.id);
      setCompetitions(compResp);
    }

    if (!apiUser.id) {
      getApiUser();
    }
  }, [apiUser, user]);

  const competitionList = () => {
    if (competitions == null) return <div></div>;
    return competitions.map((competition) => (
      <CompetitionCard key={competition.id} competition={competition} />
    ));
  };

  const workoutList = () => {
    if (apiUser.workouts == null) return <div></div>;
    return apiUser.workouts.map((workout) => (
      <WorkoutCard key={workout.id} workout={workout} />
    ));
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Paper>
        <Box pt={2} pb={2}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h2">
                Welcome {apiUser ? apiUser.profile.username : "Primal"}!!!
              </Typography>
              <Divider></Divider>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12} mb={1}>
              <Typography variant="h4" gutterBottom>
                Competitions
              </Typography>
              <Button variant="contained" href="new-comp">
                Create Competition
              </Button>
              - or -
              <Button variant="contained" href="join-comp">
                Join Competition
              </Button>
            </Grid>
            <Grid item md={6} xs={12} mb={1}>
              <Typography variant="h4" gutterBottom>
                Workouts
              </Typography>
              <Button variant="contained" href="workout">
                Add Workout
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              {competitionList()}
            </Grid>
            <Grid item md={6} xs={12}>
              {workoutList()}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
