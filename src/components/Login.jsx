import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);

      navigate("/");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Logga in</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>E-post</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Lösenord</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button type="submit" disabled={loading} className="w-100 mt-3">
                Logga in
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Har du inget konto? <Link to="/signup">Skapa konto</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
