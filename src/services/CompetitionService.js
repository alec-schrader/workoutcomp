import {callApi} from './ApiService';

const apiUrl = process.env.REACT_APP_API_SERVER_URL;

const getCompetition = async (competitionID) => {
  const config = {
    url: `${apiUrl}/competitions/${competitionID}/`,
    method: "GET",
  };

  const resp = await callApi(config);
  return resp.data
}

const getCompetitionByCode = async (compCode) => {
  const config = {
    url: `${apiUrl}/competitions/code/${compCode}/`,
    method: "GET",
  };

  const resp = await callApi(config);
  return resp.data
}

const getCompetitionWorkouts = async (compId) => {
  const config = {
    url: `${apiUrl}/competitions/${compId}/workouts/`,
    method: "GET",
  };

  const resp = await callApi(config);
  return resp.data
}

const getCompetitionsForUser = async (userid) => {
  const config = {
    url: `${apiUrl}/competitions/userid/${userid}/`,
    method: "GET",
  };

  const resp = await callApi(config);
  return resp.data
}


const createCompetition = async (competition) => {
  const config = {
    url: `${apiUrl}/competitions/`,
    method: "POST",
    data: competition
  };

  const resp = await callApi(config);
  return resp.data
}

const addUsertoCompetition = async (competitionCode) => {
  //get comp id
  const comp = await getCompetitionByCode(competitionCode);

  const config = {
    url: `${apiUrl}/competitions/${comp.id}/addUser/`,
    method: "PUT",
  };

  const resp = await callApi(config);
  return resp.data
}

export { getCompetition, createCompetition, addUsertoCompetition, getCompetitionWorkouts, getCompetitionsForUser }