import { useState } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { useDispatch} from "react-redux";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart, hideToCart} from "../slices/favoriteSlice";
import Notification from "../components/Notification";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [notification, setNotification] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const checkoutHandler = () => {
    // Dispatch addToCart action without updating the state
    dispatch(hideToCart({ ...product, qty, isHidden: true  }));

    navigate("/shipping");
  };



  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/favorites");
    toast.success('This item has been added to favorites', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [showOfferModal, setShowOfferModal] = useState(false);

  const handleCloseOfferModal = () => setShowOfferModal(false);
  const handleShowOfferModal = () => setShowOfferModal(true);

  const makeAnOfferHandler = () => {
    handleShowOfferModal();
  };

  const offerHandler = () => {
    setNotification({message: 'Offer submitted successfully!', type: 'sucess'});
    handleCloseOfferModal();
  };

 

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

    {notification && (
      <Notification message={notification.message} type={notification.type} />
    )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
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
                Author: {product.Author}{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                ISBN: {product.ISBN}{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}{" "}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                 {/* Add to Favorites button here */}
                 <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    onClick={addToCartHandler}
                  >
                    Add to Favorites
                  </Button>
                </ListGroup.Item>
                {/* End of Add to Favorites button */}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={makeAnOfferHandler}
                  >
                    Make an Offer
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                   onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )
      }

      <Modal show={showOfferModal} onHide={handleCloseOfferModal}>
        <Modal.Header closeButton>
          <Modal.Title>Make an Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your offer:</p>
          <Form.Group controlId="offerAmount">
          <Form.Control
              type="number"
              placeholder="Enter amount"
              inputMode="numeric"
              min="1"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="Secondary" onClick={handleCloseOfferModal}>
            Close
          </Button>
          <Button variant="Primary" onClick={offerHandler}>
            Submit Offer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductScreen;
