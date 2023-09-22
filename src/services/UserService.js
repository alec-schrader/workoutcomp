import {callApi} from './ApiService';

const apiUrl = process.env.REACT_APP_API_SERVER_URL;

const getUser = async (userid) => {
  const apiUserId = userid.replace('auth0|', '')

  const config = {
    url: `${apiUrl}/users/username/${apiUserId}/`,
    method: "GET",
  };

  const resp = await callApi(config);
  console.log(resp)
  return resp.data
}

const updateUser = async (userid, user) => {
  const config = {
      url: `${apiUrl}/users/${userid}/`,
      method: "PUT",
      data: user
  };

  const resp = await callApi(config);
  return resp.data
}


export { getUser, updateUser }
