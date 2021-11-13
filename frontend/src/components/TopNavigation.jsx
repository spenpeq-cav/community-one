import React, {useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../context/UserContext";

function TopNavigation() {
  const { user } = useContext(UserContext)
  return (
    <Navbar variant="dark" className="primary-color text-white">
      <Container>
        <Navbar.Brand href="#home">Community One</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
          {!user && (
            <Nav.Link>
              <Link to="/login">Login</Link>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TopNavigation;
