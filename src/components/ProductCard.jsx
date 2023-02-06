import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`, { state: { product: product } });
  };

  return (
    <Card className="h-100 product-card" border="light">
      <Card.Img
        variant="top"
        src={require(`../assets/images/${product.image}`)}
        className="product-image"
        onClick={handleClick}
      />
      <Card.Body>
        <Card.Title>{product.brand}</Card.Title>
        <Card.Text>{product.name}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <h5 className="fw-bold">{product.price}:-</h5>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
