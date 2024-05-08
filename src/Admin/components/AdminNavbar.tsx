import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <h1>Admin</h1>
      <Navbar expand="md">
        <Container>
          <Nav>
            <Nav.Link className="nav-item" as={NavLink} to="/admin/all-works">
              Alla projekt
            </Nav.Link>

            <Nav.Link className="nav-item" as={NavLink} to="/admin/add-work">
              Skapa projekt
            </Nav.Link>

            <Nav.Link
              className="nav-item"
              as={NavLink}
              to="/admin/edit-homepage"
            >
              Ändra startsida
            </Nav.Link>

            <Nav.Link
              className="nav-item"
              as={NavLink}
              to="/admin/edit-aboutpage"
            >
              Ändra "about"-sida
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default AdminNavbar;
