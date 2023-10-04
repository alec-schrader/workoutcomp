import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: "openid profile email",
    }}
    cacheLocation="localstorage"
  >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
    </LocalizationProvider>
  </Auth0Provider>,
);
