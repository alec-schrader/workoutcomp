import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  ButtonBase
} from "@mui/material";
import CompetitionDatePercentage from "./CompetitionDatePercentage";

const CompetitionCard = (props) => {
  const competition = props.competition;
  return (
    <Card>
      <ButtonBase href={`/competition/${competition.id}`}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5">
                {competition.name ? competition.name : "Competition"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CompetitionDatePercentage
                startdate={competition.startdate}
                enddate={competition.enddate}
              ></CompetitionDatePercentage>
            </Grid>
          </Grid>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default CompetitionCard;
