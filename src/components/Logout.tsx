import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out");
      window.location.reload();
      return navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
      Logga ut
    </Button>
  );
};

export default Logout;
