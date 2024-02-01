/* ProductScreen.jsx*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import "../styles/ProductScreen.css";

// Placeholder component for Loader
const Loader = () => <div>Loading...</div>;

// Placeholder component for Message
const Message = ({ variant, children }) => (
  <div className={`alert alert-${variant}`}>{children}</div>
);

// Placeholder component for Rating
const Rating = ({ value, text }) => (
  <div>
    Rating: {value} ({text})
  </div>
);

const ProductScreen = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching product details
    setIsLoading(true);
    // This is where you would fetch product data from your backend or API
    // For demonstration, we're using a static product object
    const fetchProduct = async () => {
      try {
        // Simulated fetch delay
        setTimeout(() => {
          const productData = {
            name: "Sample Product",
            image: "/path/to/sample-image.jpg",
            description: "This is a sample product description.",
            price: "99.99",
            rating: 4.5,
            numReviews: 12,
          };
          setProduct(productData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setError("Failed to fetch product");
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <>
      <Link to="/">Go Back</Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        product && (
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        )
      )}
    </>
  );
};

export default ProductScreen;
