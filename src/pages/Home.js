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
import { getWorkoutsForUser } from "../services/WorkoutService";

export default function Home() {
  const { user } = useAuth0();
  const [apiUser, setApiUser] = useState({ profile: {} });
  const [competitions, setCompetitions] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    async function getApiUser() {
      const resp = await getUser(user.sub);
      setApiUser(resp);

      const compResp = await getCompetitionsForUser(resp.id);
      setCompetitions(compResp);

      const workResp = await getWorkoutsForUser(resp.id);
      setWorkouts(workResp)
    }

    if (!apiUser.id) {
      getApiUser();
    }
  }, [apiUser, user]);

  const competitionList = () => {
    if (competitions == null) return <div></div>;
    return competitions.map((competition) => (
      <Grid item xs={12} sm={4}>
        <CompetitionCard key={competition.id} competition={competition} />
      </Grid>
    ));
  };

  const workoutList = () => {
    if (workouts == null) return <div></div>;
    return workouts.map((workout) => (
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
            <Grid item xs={12} mb={1}>
              <Typography variant="h4" gutterBottom>
                Competitions
              </Typography>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={3}>
                  <Button variant="contained" href="new-comp">
                    Create Competition
                  </Button>
                </Grid>
                <Grid item xs={12} sm={1}>
                  - or -
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="contained" href="join-comp">
                    Join Competition
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {competitionList()}
              </Grid>
            </Grid>
            <Grid item xs={12} mb={1}>
              <Typography variant="h4" gutterBottom>
                Workouts
              </Typography>
              <Button variant="contained" href="workout">
                Add Workout
              </Button>
            </Grid>
            <Grid item xs={12}>
              {workoutList()}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
