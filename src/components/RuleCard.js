import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const RuleCard = (props) => {


  return (
  <Card>
    <CardContent>                        
      <Grid container>
      <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="body1" component="div">
            {props.description}
          </Typography>
        </Grid>
      </Grid>
      {props.control}
    </CardContent>
  </Card>
  )
};

export default RuleCard;