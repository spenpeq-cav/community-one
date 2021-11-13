import React, { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../context/UserContext";
import { useApolloClient, UseApolloClient } from "@apollo/client";

function TopNavigation() {
  const { user, setUser } = useContext(UserContext);
  const client = useApolloClient();

  function handleLogout() {
    localStorage.clear();
    setUser(null);
    client.clearStore();
  }

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
        {user && (
          <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default TopNavigation;
