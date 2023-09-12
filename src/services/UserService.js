import axios from 'axios';

const domain = process.env.REACT_APP_API_SERVER_URL;

const getUserData = async (accessToken, userid) => {
  const urlUserid = userid.replace('auth0|', '')

  const newCompURL = `${domain}/users/username/${urlUserid}`;

  const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
  };

  try{
    const response = await axios.get(newCompURL, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { getUserData }
