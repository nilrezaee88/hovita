import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function NavbarComponent({ isAuthenticated }) {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Nav className="me-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/feeds">
                  Feed
                </Nav.Link>
                <Nav.Link as={NavLink} to="/archives">
                  Archive
                </Nav.Link>
                <Nav.Link as={NavLink} to="/chat">
                  Chat
                </Nav.Link>
                <Nav.Link as={NavLink} to="/totalMessege">
                  TotalMessage
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
