import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";

function LoginForm() {
  const INITIAL_FORM_STATE = {
    email: "",
    password: "",
  };

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
      alert("Form submited");
      const data = {
        identifier: formData.email,
        password: formData.password,
      };
      console.log(data);
      setFormData(INITIAL_FORM_STATE);
    } else {
      alert("Fill out all fields");
    }
  }

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
