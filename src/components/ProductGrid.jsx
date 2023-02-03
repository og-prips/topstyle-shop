import { useState, useContext } from "react";
import ProductItem from "./ProductCard";
import { ProductContext } from "../contexts/ProductProvider";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { products } = useContext(ProductContext);

  const productItems = products.map((product) => {
    return (
      <Col>
        <ProductItem
          key={product.id}
          id={product.id}
          product={product.data()}
        />
      </Col>
    );
  });

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <Row xs={1} md={4} className="g-4">
        {productItems}
      </Row>
    </Container>
  );
};

export default ProductList;
