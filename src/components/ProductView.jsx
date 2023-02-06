import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { ProductContext } from "../contexts/ProductProvider";

const ProductView = () => {
  const location = useLocation();
  const { addToCart } = useContext(ProductContext);
  const [showAlert, setShowAlert] = useState(false);

  const product = location.state.product;

  const handleaddToCart = () => {
    addToCart(product);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <Row xs={1} md={2}>
        <Col>
          <Card style={{ padding: "10px" }}>
            <Card.Img
              src={require(`../assets/images/${product.image}`)}
              alt={product.name}
            ></Card.Img>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{product.brand}</Card.Title>
              <Card.Text>{product.name}</Card.Text>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <h1 className="fw-bold">{product.price}:-</h1>
              <Button onClick={handleaddToCart} className="btn-success w-100">
                Lägg i varukorg
              </Button>
            </Card.Footer>
          </Card>
          {showAlert && (
            <Alert variant="success" className="mt-2 text-center">
              Produkt tillagd!
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductView;
