
import axios from "axios";

const httpClient = axios.create();

// adds access tokens in all api requests
// this interceptor is only added when the auth0 instance is ready and exports the getAccessTokenSilently method
export const addAccessTokenInterceptor = (getAccessTokenSilently, getAccessTokenWithPopup) => {
  httpClient.interceptors.request.use(async (config) => {
    let token
    try{
      token = await getAccessTokenSilently();
    }
    catch(err){
      token = await getAccessTokenWithPopup();
    }
    if (!token){

    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default httpClient;