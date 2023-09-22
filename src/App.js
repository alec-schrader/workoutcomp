import * as React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PageLoader from "./components/PageLoader";
import AuthenticationGuard from "./components/AuthenticationGuard";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Workout from "./pages/Workout";
import NoPage from "./pages/NoPage";
import Competition from "./pages/Competition";
import NewComp from "./pages/NewComp";
import JoinComp from "./pages/JoinComp";
import Profile from "./pages/Profile";

import { addAccessTokenInterceptor } from "./services/HttpClient";

import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useAuth0 } from "@auth0/auth0-react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fcb700",
    },
    secondary: {
      main: "#6f5c07",
    },
    background: {
      default: "#838282",
      paper: "#ffffff",
    },
    text: {
      secondary: "#00000",
    },
  },
  spacing: 8,
});

export default function App() {
  const {
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();

  useEffect(() => {
    addAccessTokenInterceptor(getAccessTokenSilently, getAccessTokenWithPopup);
  }, [getAccessTokenSilently]);

  let indexRoute = <Route index element={<Welcome />} />;
  if (isLoading) indexRoute = <Route index element={<PageLoader />} />;
  if (isAuthenticated)
    indexRoute = (
      <Route index element={<AuthenticationGuard component={Home} />} />
    );

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {indexRoute}
              <Route
                path="new-comp"
                element={<AuthenticationGuard component={NewComp} />}
              />
              <Route
                path="join-comp"
                element={<AuthenticationGuard component={JoinComp} />}
              />
              <Route
                path="competition/:competitionId?"
                element={<AuthenticationGuard component={Competition} />}
              />
              <Route
                path="workout/:workoutId?"
                element={<AuthenticationGuard component={Workout} />}
              />
              <Route
                path="profile"
                element={<AuthenticationGuard component={Profile} />}
              />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}
