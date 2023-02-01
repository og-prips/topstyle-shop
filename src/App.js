// import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Search from "./components/Search";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import AuthProvider from "./contexts/AuthContext";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Navbar bg="dark" variant="dark" expang="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            TopStyle
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/signup">
                Skapa konto
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Logga in
              </Nav.Link>
              <Form inline>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="d-flex align-items-center justify-content-center mt-5">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </AuthProvider>
        </div>
      </Container>
    </>
  );
}

export default App;
