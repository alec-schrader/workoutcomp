import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const RuleCard = (props) => {
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5">
              {props.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom variant="body1">
              {props.description}
            </Typography>
          </Grid>
        </Grid>
        {props.control}
      </CardContent>
    </Card>
  );
};

export default RuleCard;
