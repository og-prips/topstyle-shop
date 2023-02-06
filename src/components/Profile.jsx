import { useAuth } from "../contexts/AuthProvider";
import { useState, useContext, useEffect } from "react";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/ProductProvider";

const Home = () => {
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { orders, getUserOrders } = useContext(ProductContext);

  useEffect(() => {
    getUserOrders();
  }, [user]);

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const orderItems = orders.map((order) => {
    const productItems = order.data().products.map((product) => {
      return (
        <div>
          <p>
            <b>{product.brand.toUpperCase()}</b> | {product.name}
          </p>
          <p className="justify-content-end">
            <b>{product.price}:-</b>
          </p>
          <hr />
        </div>
      );
    });

    return (
      <Container
        className="mt-3 bg-light"
        style={{ maxWidth: "1000px", padding: "10px" }}
      >
        <p>
          <b>Order ID: {order.id}</b>
        </p>
        <p>
          Order mottagen: {new Date(order.data().dateCreated).toLocaleString()}
        </p>
        <br />
        {productItems}
        <h3>Totalsumma: {order.data().totalPrice} kr</h3>
      </Container>
    );
  });

  return (
    <>
      {user ? (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Din profil</h2>
                <strong>Email: </strong> {user && user.email}
              </Card.Body>
              <Button variant="link" onClick={handleLogout}>
                Logga ut
              </Button>
              {error && <Alert variant="danger">{error}</Alert>}
            </Card>
          </div>
        </div>
      ) : (
        <h1>logga in för att komma åt denna sida</h1>
      )}
      {user && <>{orderItems}</>}
    </>
  );
};

export default Home;
