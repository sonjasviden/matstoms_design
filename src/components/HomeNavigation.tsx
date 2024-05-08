import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const HomeNavigation = () => {
  return (
    <div>
      <Navbar expand="md" className="homeNavbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src="/images/logo.png" />
          </Navbar.Brand>

          <Nav>
            <Nav.Link className="nav-item" as={NavLink} end to="/work">
              Work
            </Nav.Link>
            <Nav.Link className="nav-item" as={NavLink} end to="/about">
              About
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default HomeNavigation;
