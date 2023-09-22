import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar
} from "@mui/material";

const UserCard = (parms) => {
  const user = parms.user;

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5">
              <Grid container textAlign={'left'}>
                <Grid item xs={2}>
                  <Avatar sx={{ bgcolor: user.profile.color ? user.profile.color : '#ffffff'}}
                    >{user.profile.username ? user.profile.username.substring(0, 2) : 'P'}</Avatar>
                </Grid>
                <Grid item xs={10}>
                  {user.profile.username ? user.profile.username : 'Primal'}
                </Grid>
              </Grid>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { UserCard };
