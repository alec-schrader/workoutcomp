import axios from 'axios';

const domain = process.env.REACT_APP_API_SERVER_URL;

const getWorkout = async (accessToken, workoutId) => {
  try {
      const url = `${domain}/workouts/${workoutId}/`;

      const config = {
          headers: { Authorization: `Bearer ${accessToken}` }
      };

      const response = await axios.get(url, config);
      return response.data;
  } catch (e) {
      console.log(e);
  }
}

const updateWorkout = async (accessToken, workoutId, workout) => {
  try {
      const url = `${domain}/workouts/${workoutId}/`;

      const config = {
          headers: { Authorization: `Bearer ${accessToken}` }
      };

      const response = await axios.put(url, workout, config);
      return response.data;
  } catch (e) {
      console.log(e);
  }
}

const createWorkout = async (accessToken, workout) => {
  try {
      const newCompURL = `${domain}/workouts/`;

      const config = {
          headers: { Authorization: `Bearer ${accessToken}` }
      };

      const response = await axios.post(newCompURL, workout, config);
      return response.data;
  } catch (e) {
      console.log(e);
  }
}

export { getWorkout, updateWorkout, createWorkout }