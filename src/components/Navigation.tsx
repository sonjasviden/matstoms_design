import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Navbar expand="md">
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

export default Navigation;
