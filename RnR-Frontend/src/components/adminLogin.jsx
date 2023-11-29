import React, { useState } from "react";
import HeaderOut from "./header_out";
import { Container, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/AdminLogin.css";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
        navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container className="login-container">
        <HeaderOut/>
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center">Admin Login</h2>
          {error && <p className="error-message">{error}</p>}
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              className="log-but"
              onClick={handleLogin}
            >
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminLogin;
