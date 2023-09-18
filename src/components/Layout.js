import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import { Box } from "@mui/material";


const Layout = () => {
  return (
    <>
      <AppHeader></AppHeader>
        <Box pt={10} pb={3}>
          <Outlet/>
        </Box>
      {/* <AppFooter></AppFooter> */}
    </>
  )
};

export default Layout;
