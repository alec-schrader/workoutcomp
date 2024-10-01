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
  getCompetitionsUsers,
} from "../services/CompetitionService";
import { workoutsDisp } from "../data/dataGridColumns"
import { getPointsBreakdown, calcAllPoints } from "../services/CalcPoints"
import { StatCard } from "../components/StatCard";
import CompWorkoutData from "../components/CompWorkoutData";
import LeaderboardChart from "../components/LeaderboardChart";

export default function Competition() {
  const { competitionId } = useParams();
  const [comp, setComp] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [users, setUsers] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    async function getData() {
      const compResp = await getCompetition(competitionId);
      setComp(compResp);

      const workResp = await getCompetitionWorkouts(competitionId);
      setWorkouts(calcAllPoints(workResp));

      const userResp = await getCompetitionsUsers(competitionId);
      setUsers(userResp);
    
      const points = getPointsBreakdown(workResp, userResp);
      setPoints(points);
    }

    if (competitionId) getData();
  }, [competitionId]);

  const statsList = () => {
    return points.map((user) => (
        <Grid item xs={12} lg={4} key={user.id}>
            <StatCard user={user} />
        </Grid>
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
            <Grid item sm={8} xs={12}>
              <LeaderboardChart data={points}></LeaderboardChart>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Stats</Typography>
                <Divider></Divider>
                <Grid container>
                    {statsList()}
                </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">Workout Feed</Typography>
              <Divider></Divider>
              <CompWorkoutData rows={workoutsDisp(workouts, users)}></CompWorkoutData>
              {/* <DataGrid autoHeight rows={workoutsDisp(workouts, users)} columns={workoutsColumns} 
                    initialState={workoutInitialState}
                    pageSizeOptions={[5, 10, 25]} /> */}
            
              {/* <Box maxHeight={600} overflow={'scroll'}>
                {workoutList()}
              </Box> */}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
