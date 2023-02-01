import { useState, useContext } from "react";
import ProductItem from "./ProductItem";
import { ProductContext } from "../contexts/ProductProvider";
import { Container, Row, Col } from "react-bootstrap";

const ProductList = () => {
  const { products } = useContext(ProductContext);

  const productItems = products.map((p) => {
    return (
      <Col>
        <ProductItem key={p.id} data={p.data()} />
      </Col>
    );
  });

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <Row xs={1} md={2} className="g-4">
        {productItems}
      </Row>
    </Container>
  );
};

export default ProductList;
