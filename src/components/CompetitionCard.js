import React from "react";
import { Card, CardActionArea, CardContent, CardActions, Typography, Button, Grid } from "@mui/material";
import LeaderboardChart from "./LeaderboardChart";
import CompetitionDatePercentage from "./CompetitionDatePercentage";

const CompetitionCard = (props) => {

  return (
  <Card>
    <CardActionArea>
        <CardContent>                        
          <Grid container>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="div">
                {props.competition.name ? props.competition.name : "Competition"}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <LeaderboardChart></LeaderboardChart>
            </Grid>
            <Grid item xs={4}>
              <CompetitionDatePercentage startdate={props.competition.startdate} enddate={props.competition.enddate}></CompetitionDatePercentage>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View Detail
        </Button>
      </CardActions>
  </Card>
  )
};

export default CompetitionCard;