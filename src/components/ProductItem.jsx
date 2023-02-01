import { Card, Button } from "react-bootstrap";

const ProductItem = ({ data }) => {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={require("../assets/images/bb_sneakers.jpg")}
      />
      <Card.Body>
        <Card.Title>{data.brand}</Card.Title>
        <Card.Text>{data.name}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Visa detaljer</Button>
        <Button variant="primary">Visa detaljer</Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductItem;
