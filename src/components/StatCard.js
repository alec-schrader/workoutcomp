import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider
} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import StrengthIcon from '@mui/icons-material/FitnessCenter';
import CardioIcon from '@mui/icons-material/DirectionsRun';
import WellnessIcon from '@mui/icons-material/SelfImprovement';
import TrophyIcon from '@mui/icons-material/EmojiEvents';


const StatCard = (parms) => {
  const user = parms.user;

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5">
                {user.rank === 1 ? <TrophyIcon></TrophyIcon> : ""}
                {user.username}
            </Typography>
            <Typography gutterBottom variant="body1">
                Overall Rank: #{user.rank} Total Points: {user.totalPoints}
            </Typography>
            <Divider></Divider>
            <List>
                <ListItem alignItems="flex-start">
                    <ListItemIcon>
                        <Badge badgeContent={'#' + (user.strength.rank + 1)} color="primary" >
                            <StrengthIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText 
                        primary={user.strength.score + " points"} 
                        secondary={<React.Fragment>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ color: 'text.primary' }}
                            >
                              Avg. Duration: {user.strength.avgDuration} min
                            </Typography>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ color: 'text.primary' }}
                            >
                              Avg. HR: {user.strength.avgIntensity} bpm
                            </Typography>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ color: 'text.primary' }}
                            >
                              Avg. Pts/Workout: {user.strength.avgPoints}
                            </Typography>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ color: 'text.primary' }}
                            >
                              Workouts: {user.strength.workoutsCnt}
                            </Typography>

                          </React.Fragment>}
                        >
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Badge badgeContent={'#' + (user.cardio.rank + 1)} color="primary">
                            <CardioIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText 
                        primary={user.cardio.score + " points"} 
                        secondary={<React.Fragment>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ color: 'text.primary' }}
                            >
                              Avg. Duration: {user.cardio.avgDuration} min
                            </Typography>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ color: 'text.primary' }}
                            >
                              Avg. HR: {user.cardio.avgIntensity} bpm
                            </Typography>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ color: 'text.primary' }}
                            >
                              Avg. Pts/Workout: {user.cardio.avgPoints}
                            </Typography>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ color: 'text.primary' }}
                            >
                              Workouts: {user.cardio.workoutsCnt}
                            </Typography>

                          </React.Fragment>}
                        >
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Badge badgeContent={'#' + (user.wellness.rank + 1)} color="primary">
                            <WellnessIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText 
                        primary={user.wellness.score + " points"} 
                        secondary={<React.Fragment>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ color: 'text.primary' }}
                            >
                              Avg. Duration: {user.wellness.avgDuration} min
                            </Typography>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ color: 'text.primary' }}
                            >
                              Avg. Pts/Workout: {user.wellness.avgPoints}
                            </Typography>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ color: 'text.primary' }}
                            >
                              Workouts: {user.wellness.workoutsCnt}
                            </Typography>

                          </React.Fragment>}>
                    </ListItemText>
                </ListItem>
            </List>
            <Typography gutterBottom variant="body2">
                Current Streak: {user.multiplier} Unsober Points: {user.usp.score}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { StatCard };
