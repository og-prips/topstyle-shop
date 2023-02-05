import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductProvider";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const CartView = () => {
  const { cartProducts, removeFromCart, placeOrder } =
    useContext(ProductContext);

  let totalPrice = 0;

  const handleRemoveFromCart = (index) => {
    totalPrice -= cartProducts[index].price;
    removeFromCart(index);
    console.log(index);
    console.log(cartProducts[index]);
  };

  const productCards = cartProducts.map((product, index) => {
    totalPrice += product.price;

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
      {productCards}

      {cartProducts.length > 0 ? (
        <Row style={{ background: "#f2f2f2", padding: "10px" }}>
          <Col xs={12}>
            <h3>Totalt pris: {totalPrice}:-</h3>
            <Button onClick={() => placeOrder(totalPrice)} variant="primary">
              Lägg beställning
            </Button>
          </Col>
        </Row>
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
