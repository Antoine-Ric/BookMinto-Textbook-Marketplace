import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/favoriteSlice";

const FavoriteScreen = () => {
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // State to track items removed from favorites before page reload
  const [removedFavorites, setRemovedFavorites] = useState({});

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    // Mark the item as removed in local state and localStorage
    setRemovedFavorites((prev) => {
      const updated = { ...prev, [id]: true };
      localStorage.setItem("removedFavorites", JSON.stringify(updated));
      return updated;
    });
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
                  {/* <Col md={2}>${item.price}</Col> */}
                  {/* <Col md={2}>
                        <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col> */}
                  <Col md={3}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      {/* Show outlined heart if item is marked as removed, filled otherwise */}
                      {removedFavorites[item._id] ? (
                        <FaRegHeart />
                      ) : (
                        <FaHeart />
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
