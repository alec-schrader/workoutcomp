import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Container,
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  createWorkout,
  getWorkout,
  updateWorkout,
} from "../services/WorkoutService";
import categoryChoices from "../data/workoutCategories";

export default function Workout() {
  const { workoutId } = useParams();
  const [category, setCategory] = useState(1);
  const [date, setDate] = useState(dayjs());
  const [durationHours, setDurationHours] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [intensity, setIntensity] = useState(0);
  const [note, setNote] = useState('');

  useEffect(() => {
    async function getData() {
      const resp = await getWorkout(workoutId);
      setCategory(resp.category);
      setDate(dayjs(resp.date));
      setDurationHours(Math.floor(resp.duration / 60));
      setDurationMinutes(resp.duration % 60);
      setIntensity(resp.intensity);
      setNote(resp.note);
    }

    if (workoutId) getData();
  }, [workoutId]);

  const categoryList = () => {
    return categoryChoices.map((category) => (
      <FormControlLabel
        value={category.value}
        control={<Radio />}
        label={category.name}
        key={category.value}
      />
    ));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const newWorkout = {
      category: category,
      date: date.format("YYYY-MM-DD"),
      duration: parseInt(durationHours) * 60 + parseInt(durationMinutes),
      intensity: intensity,
      note: note,
    };
    if (workoutId) {
      newWorkout.id = workoutId;
      await updateWorkout(workoutId, newWorkout);
    } else {
      await createWorkout(newWorkout);
    }
    window.location.replace("/");
  }

  return (
    <Container>
      <Paper>
        <Box alignContent={"center"} alignItems={"center"} textAlign={"center"}>
          <form method="put" onSubmit={handleSubmit}>
            <Typography variant="h2">Congrats on your workout!</Typography>
            <Divider></Divider>

            <Box mt={2} mb={2}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" gutterBottom>
                    Category
                  </Typography>
                  <RadioGroup
                    aria-labelledby="categoryRadLabel"
                    name="category"
                    value={category}
                    row
                    onChange={(event) => {
                      setCategory(event.target.value);
                    }}
                  >
                    {categoryList()}
                  </RadioGroup>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </Box>
            <Divider></Divider>

            <Box mt={2} mb={2}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom>
                    Duration
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} mb={2}>
                  <TextField
                    required
                    id="durationHours"
                    label="Hours"
                    name="durationHours"
                    value={durationHours}
                    type="number"
                    onChange={(event) => {
                      setDurationHours(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} mb={2}>
                  <TextField
                    required
                    id="durationMinutes"
                    label="Mintutes"
                    name="durationMinutes"
                    value={durationMinutes}
                    type="number"
                    onChange={(event) => {
                      setDurationMinutes(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} mt={2} mb={2}>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} sm={4} mb={2}>
                  <DatePicker
                    disabled
                    required
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    name="date"
                  />
                </Grid>
                <Grid item xs={12} sm={4} mb={2}>
                  <TextField
                    required
                    id="intensity"
                    label="Intensity"
                    name="intensity"
                    value={intensity}
                    type="number"
                    onChange={(event) => {
                      setIntensity(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} mb={2}>
                  <TextField
                    required
                    id="note"
                    label="Note"
                    name="note"
                    value={note}
                    inputProps={{ maxLength: 50 }}
                    onChange={(event) => {
                      setNote(event.target.value);
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
