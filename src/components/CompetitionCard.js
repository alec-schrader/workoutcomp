import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import LeaderboardChart from "./LeaderboardChart";
import CompetitionDatePercentage from "./CompetitionDatePercentage";

const CompetitionCard = (props) => {
  const competition = props.competition;
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5">
              {competition.name ? competition.name : "Competition"}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <LeaderboardChart></LeaderboardChart>
          </Grid>
          <Grid item xs={4}>
            <CompetitionDatePercentage
              startdate={competition.startdate}
              enddate={competition.enddate}
            ></CompetitionDatePercentage>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          href={`/competition/${competition.id}`}
        >
          View Detail
        </Button>
      </CardActions>
    </Card>
  );
};

export default CompetitionCard;
