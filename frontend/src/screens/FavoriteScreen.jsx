import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Message from "../components/Message";
import { removeFromCart, selectFavoritesCount } from "../slices/favoriteSlice";

const FavoriteScreen = ({ product }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  

  // State to track items removed from favorites before page reload
  const [removedFavorites] = useState({});

  const removeFromCartHandler = (id) => {
    // has to be done traditional way so that cart is cleared on logout
    dispatch(removeFromCart(id));
  };

  const favoritesCount = useSelector(selectFavoritesCount);

  return (
    <Row>
      <Col md={8}>
        {/* Existing code */}
        <h1 style={{ marginBottom: "20px" }}>Favorites List</h1>
        {/* Existing code */}
        {favoritesCount === 0 ? (
          <Message>
            Your favorites list is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems
              .filter((item) => !item.isHidden) // Filter out hidden items
              .map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={4}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={5}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        type="button"
                        variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      {removedFavorites[item._id] ? (
                        <FaRegHeart color="gray" />
                      ) : (
                        <FaHeart color="gray" />
                      )}
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default FavoriteScreen;

