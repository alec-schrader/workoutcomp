import React from "react";
import { Card, CardActionArea, CardContent, CardActions, Typography, Button, Grid } from "@mui/material";
import categoryChoices from '../data/workoutCategories'

const WorkoutCard = (parms) => {
  const workout = parms.workout;
  console.log(workout);
  const category = categoryChoices[workout.category - 1].name;
  return (
  <Card>
      <CardContent>                        
        <Grid container>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" component="div">
              {workout.date}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" component="div">
              Category: {category}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" component="div">
              Duration: {workout.duration} minutes
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" component="div">
              Intensity: {workout.intensity}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={`/workout/${parms.workout.id}`}>
          View Detail
        </Button>
      </CardActions>
  </Card>
  )
};

export default WorkoutCard;