import React from "react";
import { Card, CardActionArea, CardContent, CardActions, Typography, Button, Grid } from "@mui/material";

const WorkoutCard = (parms) => {
  return (
  <Card>
    <CardActionArea>
        <CardContent>                        
          <Grid container>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="div">
                {parms.workout.date}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={`/workout/${parms.workout.id}`}>
          View Detail
        </Button>
      </CardActions>
  </Card>
  )
};

export default WorkoutCard;