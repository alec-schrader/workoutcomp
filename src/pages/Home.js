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
import { DataGrid } from '@mui/x-data-grid';
import { calcAllPoints } from "../services/CalcPoints"
import { workoutsColumns, workoutsDisp, workoutActionColumn, workoutInitialState } from "../data/dataGridColumns"
import CompetitionCard from "../components/CompetitionCard";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "../services/UserService";
import { getCompetitionsForUser } from "../services/CompetitionService";
import { getWorkoutsForUser } from "../services/WorkoutService";

export default function Home() {
  const { user } = useAuth0();
  const [apiUser, setApiUser] = useState({ profile: {} });
  const [competitions, setCompetitions] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const workoutGridCols = workoutsColumns
  workoutGridCols.unshift(workoutActionColumn);

  useEffect(() => {
    async function getApiUser() {
      const resp = await getUser(user.sub);
      setApiUser(resp);

      const compResp = await getCompetitionsForUser(resp.id);
      setCompetitions(compResp);

      const workResp = await getWorkoutsForUser(resp.id);
      setWorkouts(calcAllPoints(workResp))
    }

    if (!apiUser.id) {
      getApiUser();
    }
  }, [apiUser, user]);

  const competitionList = () => {
    if (competitions == null) return <div></div>;
    return competitions.map((competition) => (
      <Grid item xs={12} sm={4} key={competition.id} >
        <CompetitionCard competition={competition} />
      </Grid>
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
              <Button variant="contained" href="workout">
                Add Workout
              </Button>
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
            <DataGrid autoHeight rows={workoutsDisp(workouts, [apiUser])} columns={workoutGridCols}
                    initialState={workoutInitialState}
                    pageSizeOptions={[5, 10, 25]} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
