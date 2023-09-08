import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PageLoader from "./components/PageLoader";
import AuthenticationGuard from "./components/AuthenticationGuard";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import NoPage from "./pages/NoPage";

import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import NewComp from './pages/NewComp';
import JoinComp from './pages/JoinComp';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useAuth0 } from "@auth0/auth0-react";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fcb700',
    },
    secondary: {
      main: '#6f5c07',
    },
    background: {
      default: '#838282',
      paper: '#ffffff',
    },
    text: {
      secondary: '#00000',
    },
  },
  spacing: 8,
});

export default function App() {
  const {isLoading, isAuthenticated } = useAuth0();

  let indexRoute = <Route index element={<Welcome />} />;
  if(isLoading) indexRoute = <Route index element={<PageLoader />} />;
  if(isAuthenticated) indexRoute = <Route index element={<AuthenticationGuard component={Home} />} />;

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {indexRoute}
              <Route path="new-comp" element={<AuthenticationGuard component={NewComp} />} />
              <Route path="join-comp" element={<AuthenticationGuard component={JoinComp} />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}