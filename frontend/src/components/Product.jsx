import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/favoriteSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [isFavorited, setIsFavorited] = useState(false);
  const [qty ] = useState(1);

  useEffect(() => {
    // Check if the product is already in the cart (favorites)
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    setIsFavorited(existItem !== undefined);
  }, [product._id, cart.cartItems]);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart({ ...product, qty }));
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>

        {/* Heart Icon for adding to favorites */}
        <div
          className="favorite-icon"
          onClick={handleFavoriteClick}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            fontSize: "1.5em",
          }}
        >
          {isFavorited ? <FaHeart color="gray" /> : <FaRegHeart />}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
