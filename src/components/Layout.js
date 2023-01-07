import { Outlet, Link } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const Layout = () => {
  return (
    <>
      <AppHeader></AppHeader>
      <Outlet />
      <AppFooter></AppFooter>
    </>
  )
};

export default Layout;
