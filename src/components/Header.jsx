import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthProvider";
import { ProductContext } from "../contexts/ProductProvider";
import Search from "./Search";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartProducts } = useContext(ProductContext);

  const handleAuth = () => {
    user ? logout() : navigate("login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontFamily: "custom-cursive", fontSize: "30px" }}
        >
          TopStyle
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Search />
          </Nav>
        </Navbar.Collapse>

        <Navbar.Text>
          <FontAwesomeIcon
            icon={faCartShopping}
            onClick={() => navigate("/cart")}
            className="header-icon"
            style={{ cursor: "pointer", color: "white", height: "25px" }}
          />
          {cartProducts.length > 0 && (
            <>
              <FontAwesomeIcon icon={faCircle} id="cart-counter-circle" />
              <span id="cart-counter">{cartProducts.length}</span>
            </>
          )}
        </Navbar.Text>
        <Navbar.Text
          className="justify-content-end"
          style={{ marginLeft: "15px" }}
        >
          <NavDropdown
            title={<FontAwesomeIcon icon={faUser} className="header-icon" />}
            id="basic-nav-dropdown"
          >
            {user && (
              <>
                <Navbar.Text style={{ color: "black" }}>
                  {user.email}
                </Navbar.Text>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => navigate("/profile")}
                  style={{ color: "black" }}
                >
                  Min profil
                </NavDropdown.Item>
              </>
            )}

            <NavDropdown.Item onClick={handleAuth} style={{ color: "black" }}>
              {user ? "Logga ut" : "Logga in"}
            </NavDropdown.Item>

            {!user && (
              <NavDropdown.Item
                onClick={() => navigate("/signup")}
                style={{ color: "black" }}
              >
                Skapa konto
              </NavDropdown.Item>
            )}
          </NavDropdown>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Header;
