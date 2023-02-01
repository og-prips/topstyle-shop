import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Search from "./components/Search";
import ProductList from "./components/ProductList";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import AuthProvider from "./contexts/AuthProvider";
import ProductProvider from "./contexts/ProductProvider";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <ProductProvider>
        <Navbar bg="dark" variant="dark" expand="lg">
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
                <Search />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
        </Routes>
      </ProductProvider>

      <Container className="d-flex align-items-center justify-content-center mt-5">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <AuthProvider>
            <Routes>
              <Route path="/profile" element={<Profile />} />
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
