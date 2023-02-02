import { useLocation } from "react-router-dom";

const ProductView = () => {
  const location = useLocation();

  const product = location.state.product;

  return <h1>{product.name}</h1>;
};

export default ProductView;
