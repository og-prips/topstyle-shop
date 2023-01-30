import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { Container, Nav } from "react-bootstrap";
import AuthProvider from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
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
