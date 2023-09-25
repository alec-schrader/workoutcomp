import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import categoryChoices from "../data/workoutCategories";
import dayjs from "dayjs";
import { calcPoints } from "../services/CalcPoints";

const WorkoutCard = (parms) => {
  const workout = parms.workout;
  const category = categoryChoices[workout.category - 1].name;

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" >
              {dayjs(workout.date).format('MM/DD/YYYY')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="bold" component="b">
              Category:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="bold" component="b">
              Duration:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="bold" component="b">
              Intensity:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" >
              {category}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" >
              {workout.duration} minutes
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" >
              {workout.intensity}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="bold" component="b" >
              Note: {workout.note}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          href={`/workout/${parms.workout.id}`}
        >
          View Detail
        </Button>
      </CardActions>
    </Card>
  );
};

const WorkoutCardComp = (parms) => {
  const workout = parms.workout;
  const category = categoryChoices[workout.category - 1].name;
  const user = parms.user

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" >
              {user && user.profile.username ? user.profile.username : 'Primal'} - {dayjs(workout.date).format('MM/DD/YYYY')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="bold" component="b">
              Category:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="bold" component="b">
              Duration:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="bold" component="b">
              Intensity:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" >
              {category}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" >
              {workout.duration} minutes
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" >
              {workout.intensity}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="bold" component="b" >
              Points: {calcPoints(workout)}
            </Typography>
          </Grid>
          {workout.note ? 
            <Grid item xs={9}>
              <Typography variant="bold" component="b" >
                Note: {workout.note}
              </Typography>
            </Grid> : <div></div>
          } 
        </Grid>
      </CardContent>
    </Card>
  );
};

export { WorkoutCardComp, WorkoutCard };
