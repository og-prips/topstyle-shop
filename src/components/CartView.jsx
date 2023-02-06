import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductProvider";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const CartView = () => {
  const { cartProducts, removeFromCart, placeOrder, totalPrice } =
    useContext(ProductContext);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleRemoveFromCart = (index) => {
    removeFromCart(index);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    console.log(orderPlaced);

    placeOrder();
  };

  const productCards = cartProducts.map((product, index) => {
    return (
      <Row key={index} style={{ background: "#f2f2f2", padding: "10px" }}>
        <Col xs={4}>
          <Card.Img
            variant="top"
            src={require(`../assets/images/${product.image}`)}
            style={{ width: "200px", margin: "10px" }}
          />
        </Col>
        <Col xs={8}>
          <Card.Title style={{ fontSize: "20px" }}>{product.brand}</Card.Title>
          <Card.Subtitle style={{ fontSize: "16px" }}>
            {product.name}
          </Card.Subtitle>
          <Card.Text className="fw-bold">{product.price}:-</Card.Text>
          <Button
            onClick={() => handleRemoveFromCart(index)}
            variant="danger"
            style={{ position: "relative", top: "10px", right: "0px" }}
          >
            Ta bort
          </Button>
        </Col>
        <hr />
      </Row>
    );
  });

  return (
    <Container className="mt-5">
      {orderPlaced ? (
        <div>
          <h1>Tack för din beställning!</h1>
          <p>
            Se dina beställningar under <Link to="/profile">din profil</Link>{" "}
            eller <Link to="/">forstätt shoppa</Link>
          </p>
        </div>
      ) : cartProducts.length > 0 ? (
        <>
          {productCards}
          <Row style={{ background: "#f2f2f2", padding: "10px" }}>
            <Col xs={12}>
              <h3>Totalt pris: {totalPrice}:-</h3>
              <Button onClick={handlePlaceOrder} variant="primary">
                Lägg beställning
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-center">Din varukorg är tom :(</h1>
          <Link to="/">Till shoppen</Link>
        </div>
      )}
    </Container>
  );
};

export default CartView;
