import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import HomeNavigation from "../components/HomeNavigation";
import useAuth from "../hooks/useAuth";
import AdminNavbar from "../Admin/components/AdminNavbar";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { currentUser } = useAuth();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {isHomePage ? <HomeNavigation /> : <Navigation />}
      {currentUser && isAdminPage && <AdminNavbar />}
      <Outlet />
    </>
  );
};

export default Layout;
