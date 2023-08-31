import { Outlet, Link } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { Box } from "@mui/material";


const Layout = () => {
  return (
    <>
      <AppHeader></AppHeader>
        <Box pt={3} pb={1}>
          <Outlet/>
        </Box>
      <AppFooter></AppFooter>
    </>
  )
};

export default Layout;
