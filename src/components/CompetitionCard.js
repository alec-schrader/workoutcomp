import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button, Grid } from "@mui/material";
import LeaderboardChart from "./LeaderboardChart";
import CompetitionDatePercentage from "./CompetitionDatePercentage";

const CompetitionCard = (competition) => {
  return (
  <Card>
    <CardActionArea>
        <CardContent>
          <LeaderboardChart></LeaderboardChart>
          <CompetitionDatePercentage startdate='9/1/2023' enddate='9/31/2023'></CompetitionDatePercentage>
          <Typography gutterBottom variant="h5" component="div">
            {competition.name}
          </Typography>
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