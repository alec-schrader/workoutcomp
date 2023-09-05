import * as React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Auth0Provider
    domain="dev-mxnk6f4ep8oxln5o.us.auth0.com"
    clientId="0i5DZ3tSxNQsM2N4ImODLhfg0D6saJuX"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >  
    <App />
  </Auth0Provider>

);