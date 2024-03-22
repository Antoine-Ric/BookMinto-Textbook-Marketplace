import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Message from "../components/Message";
import { removeFromCart } from "../slices/favoriteSlice";

const FavoriteScreen = ({ product }) => {
  const dispatch = useDispatch();
  const [qty] = useState(1);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // State to track items removed from favorites before page reload
  const [removedFavorites, setRemovedFavorites] = useState({});

  const removeFromCartHandler = (id) => {

    dispatch(removeFromCart(id));
    setRemovedFavorites((prev) => ({ ...prev, [id]: true }));

    localStorage.setItem("removedFavorites", JSON.stringify({ ...removedFavorites, [id]: true }));
  };

  useEffect(() => {
    // On component mount, check for items marked for removal and remove them from the cart
    const removedItems = JSON.parse(
      localStorage.getItem("removedFavorites") || "{}"
    );
    Object.keys(removedItems).forEach((id) => {
      dispatch(removeFromCart(id));
    });

    // Optionally, clear the marked items from localStorage if you don't want them to be removed on subsequent reloads
    localStorage.removeItem("removedFavorites");
  }, [dispatch]);

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Favorites List</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your favorites list is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
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
