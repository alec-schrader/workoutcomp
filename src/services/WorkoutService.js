import { callApi } from "./ApiService";

const apiUrl = process.env.REACT_APP_API_SERVER_URL;

const getWorkout = async (workoutId) => {
  const config = {
    url: `${apiUrl}/workouts/${workoutId}/`,
    method: "GET",
  };

  const resp = await callApi(config);
  return resp.data;
};

const getWorkoutsForUser = async (userid) => {
  const config = {
    url: `${apiUrl}/workouts/userid/${userid}/`,
    method: "GET",
  };

  const resp = await callApi(config);
  return resp.data;
};


const updateWorkout = async (workoutId, workout) => {
  const config = {
    url: `${apiUrl}/workouts/${workoutId}/`,
    method: "PUT",
    data: workout,
  };

  const resp = await callApi(config);
  return resp.data;
};

const createWorkout = async (workout) => {
  const config = {
    url: `${apiUrl}/workouts/`,
    method: "POST",
    data: workout,
  };

  const resp = await callApi(config);
  return resp.data;
};

export { getWorkout, updateWorkout, createWorkout, getWorkoutsForUser };
