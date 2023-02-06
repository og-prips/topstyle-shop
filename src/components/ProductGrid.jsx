import { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductProvider";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const { products, matchedProducts, getProducts, isLoading } =
    useContext(ProductContext);

  useEffect(() => {
    getProducts();

    console.log("fetching products...");
  }, []);

  const currentProducts = matchedProducts ? matchedProducts : products;

  const productItems = currentProducts.map((product) => {
    return (
      <Col className="col-lg-4 d-flex align-items-stretch">
        <ProductCard
          key={product.id}
          id={product.id}
          product={product.data()}
        />
      </Col>
    );
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {products && (
        <Container className="d-flex align-items-center justify-content-center mt-5">
          <Row xs={1} md={5} className="g-4">
            {productItems}
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductGrid;
