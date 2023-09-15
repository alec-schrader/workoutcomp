import axios from 'axios';

const domain = process.env.REACT_APP_API_SERVER_URL;

const getWorkout = async (accessToken, workoutId) => {
  try {
      const url = `${domain}/workouts/${workoutId}/`;

      const config = {
          headers: { Authorization: `Bearer ${accessToken}` }
      };

      try{
        const response = await axios.get(url, config);
        return response.data;
      } catch (error) {
        console.log(error);
      }
  } catch (e) {
      console.log(e.message);
  }
}

const updateWorkout = async (accessToken, workoutId, workout) => {
  try {
      const url = `${domain}/workouts/${workoutId}/`;

      const config = {
          headers: { Authorization: `Bearer ${accessToken}` }
      };

      try{
        const response = await axios.put(url, workout, config);
        return response.data;
      } catch (error) {
        console.log(error);
      }
  } catch (e) {
      console.log(e.message);
  }
}

const createWorkout = async (accessToken, workout) => {
  try {
      const newCompURL = `${domain}/workouts/`;

      const config = {
          headers: { Authorization: `Bearer ${accessToken}` }
      };

      axios.post(newCompURL, workout, config).then((result) => {
        return result
      }).catch(console.log);
  } catch (e) {
      console.log(e.message);
  }
}

export { getWorkout, updateWorkout, createWorkout }