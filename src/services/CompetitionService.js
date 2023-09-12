import axios from 'axios';

const domain = process.env.REACT_APP_API_SERVER_URL;

const getCompetitionData = async (accessToken, competitionID) => {
  try {
      const newCompURL = `${domain}/competition/${competitionID}`;

      const config = {
          headers: { Authorization: `Bearer ${accessToken}` }
      };

      axios.get(newCompURL, config).then((result) => {
        return result
      }).catch(console.log);
  } catch (e) {
      console.log(e.message);
  }
}

const createCompetition = async (accessToken, competition) => {
  try {
      const newCompURL = `${domain}/competition/`;

      const config = {
          headers: { Authorization: `Bearer ${accessToken}` }
      };

      axios.put(newCompURL, competition, config).then((result) => {
        return result
      }).catch(console.log);
  } catch (e) {
      console.log(e.message);
  }
}

const addUsertoCompetition = async (accessToken, competitionId, userID) => {
  try {
      const newCompURL = `${domain}/competition/${competitionId}/addUser/`;

      const config = {
          headers: { Authorization: `Bearer ${accessToken}` }
      };

      axios.post(newCompURL, {userid: userID}, config).then((result) => {
        return result
      }).catch(console.log);
  } catch (e) {
      console.log(e.message);
  }
}

export { getCompetitionData, createCompetition, addUsertoCompetition }