import axios from 'axios';

const domain = process.env.REACT_APP_API_SERVER_URL;

const getCompetitionData = async (accessToken, competitionID) => {
  const newCompURL = `${domain}/competitions/${competitionID}`;

  const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
  };

  const resp = await axios.get(newCompURL, config);
  return resp.data
}

const createCompetition = async (accessToken, competition) => {
  const newCompURL = `${domain}/competitions/`;

  const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
  };

  const resp = await axios.post(newCompURL, competition, config);
  return resp.data;
}

const addUsertoCompetition = async (accessToken, competitionId, userID) => {
  const newCompURL = `${domain}/competitions/${competitionId}/addUser/${userID}`;

  const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
  };

  const resp = await axios.post(newCompURL, {}, config);
  return resp.data;
}

export { getCompetitionData, createCompetition, addUsertoCompetition }