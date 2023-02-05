import { useState, useContext } from "react";
import ProductCard from "./ProductCard";
import { ProductContext } from "../contexts/ProductProvider";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductGrid = () => {
  const { products, matchedProducts } = useContext(ProductContext);
  const currentProducts = matchedProducts ? matchedProducts : products;

  const productItems = products.map((product) => {
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

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <Row xs={1} md={5} className="g-4">
        {productItems}
      </Row>
    </Container>
  );
};

export default ProductGrid;
