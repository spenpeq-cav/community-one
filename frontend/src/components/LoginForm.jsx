import React, { useState, useContext } from "react";
import { Form, Container, Button, Row, Col, Spinner } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LOGIN_USER = gql`
  mutation LoginMutation($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        username
        id
      }
    }
  }
`;

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

function LoginForm() {
  const { user, setUser } = useContext(UserContext);

  const [LoginMutation, { error, loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { login } = data;
      setUser({ token: login.jwt, userId: login.user.id });
    },
  });

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  function handleInputChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    if (formData.email !== "" && formData.password !== "") {
      LoginMutation({
        variables: {
          input: {
            identifier: formData.email,
            password: formData.password,
          },
        },
      });
      alert("Form submited");
    } else {
      alert("Fill out all fields");
    }
  }

  if (loading) return <Spinner animation="grow" />;
  if (error) return <h1>ERROR!</h1>;
  if (user) return <Navigate to="/" />;

  return (
    <Container>
      <Row className="justify-content-md-center align-items-center">
        <Col xs={12} md={5}>
          <Form onSubmit={handleSubmitForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="outline-light" type="submit" className="py-2">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
