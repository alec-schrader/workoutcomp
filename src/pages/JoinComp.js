import React, { useState } from "react";
import {
  Grid,
  Container,
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import { addUsertoCompetition } from "../services/CompetitionService";

export default function JoinComp() {
  const [compCode, setCompCode] = useState("");
  const [codeMessage, setCodeMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addUsertoCompetition(compCode);
    } catch (err) {
      setCodeMessage("Invalid Code.");
      return;
    }
    window.location.replace("/");
  }

  return (
    <Container>
      <Paper>
        <Box alignContent={"center"} alignItems={"center"} textAlign={"center"}>
          <form method="put" onSubmit={handleSubmit}>
            <Typography variant="h2">Have a Code?</Typography>
            <Divider></Divider>

            <Box mt={2} mb={2}>
              <Grid container>
                <Grid item xs={12} mb={2}>
                  <TextField
                    required
                    error={codeMessage ? true : false}
                    id="compCode"
                    label="Competition Code"
                    name="compCode"
                    value={compCode}
                    helperText={codeMessage ? codeMessage : ""}
                    onChange={(event) => {
                      setCompCode(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
