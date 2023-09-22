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
import { DataGrid } from '@mui/x-data-grid';
import {
  getCompetition,
  getCompetitionWorkouts,
  getCompetitionsUsers
} from "../services/CompetitionService";
import { getPointsBreakdown } from "../services/CalcPoints"
import { WorkoutCardComp } from "../components/WorkoutCard";
import { UserCard } from "../components/UserCard";
import LeaderboardChart from "../components/LeaderboardChart";
import CompetitionDatePercentage from "../components/CompetitionDatePercentage";



export default function Competition() {
  const { competitionId } = useParams();
  const [comp, setComp] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [users, setUsers] = useState([]);

  function getUser(id){
    for(const user of users){
        if(user.username === id){
            return user
        }
    }
  }


  useEffect(() => {
    async function getData() {
      const compResp = await getCompetition(competitionId);
      setComp(compResp);

      const workResp = await getCompetitionWorkouts(competitionId);
      setWorkouts(workResp);

      const userResp = await getCompetitionsUsers(competitionId);
      setUsers(userResp);
    }

    if (competitionId) getData();
  }, [competitionId]);

  const workoutList = () => {
    return workouts.map((workout) => (
      <WorkoutCardComp key={workout.id} workout={workout} user={getUser(workout.owner)} />
    ));
  };


  const userList = () => {
    return users.map((user) => (
      <UserCard key={user.id} user={user} />
    ));
  };


  const columns = [
    { field: 'username', headerName: 'Name', width: 150 },
    { field: 'points', headerName: 'Total Points', width: 150 },
    { field: 'Rank', headerName: 'Rank', width: 100 },
    { field: 'cardio', headerName: 'Cardio (Points)', width: 150 },
    { field: 'strength', headerName: 'Strength (Points)', width: 150 },
    { field: 'wellness', headerName: 'Wellness (Points)', width: 150 },
  ];

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
              <LeaderboardChart></LeaderboardChart>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4">Workout Feed</Typography>
              <Divider></Divider>
              <Box maxHeight={400} overflow={'scroll'}>
                {workoutList()}
              </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Points Breakdown</Typography>
                <Divider></Divider>
                <DataGrid autoHeight rows={getPointsBreakdown(workouts, users)} columns={columns} />
            </Grid>
            <Grid item sm={4} xs={12}>
                <Typography variant="h4">Users</Typography>
                <Divider></Divider>
                {userList()}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
