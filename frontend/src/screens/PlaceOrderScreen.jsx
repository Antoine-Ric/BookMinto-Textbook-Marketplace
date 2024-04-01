import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/favoriteSlice';
import { calculateSelectedProductPrices } from '../utils/selectedProductUtil'; // Import the utility function

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const selectedProduct = useSelector((state) => state.checkout.selectedProduct);

  useEffect(() => {
    if (!selectedProduct) {
      navigate('/'); // Redirect to home if no selected product
    }
  }, [selectedProduct, navigate]);

  const placeOrderHandler = async () => {
    if (!selectedProduct) {
      toast.error('No item selected');
      return;
    }

    try {
      const selectedProductPrices = calculateSelectedProductPrices(selectedProduct);

      const res = await createOrder({
        orderItems: [selectedProduct], // Use selectedProduct for the order
        shippingAddress: selectedProduct.shippingAddress || {}, // Ensure shippingAddress is an object
        paymentMethod: selectedProduct.paymentMethod || '', // Ensure paymentMethod is a string
        itemsPrice: selectedProductPrices.itemsPrice || 0, // Ensure itemsPrice is a number
        shippingPrice: selectedProductPrices.shippingPrice || 0, // Ensure shippingPrice is a number
        taxPrice: selectedProductPrices.taxPrice || 0, // Ensure taxPrice is a number
        totalPrice: selectedProductPrices.totalPrice || 0, // Ensure totalPrice is a number
      }).unwrap();

      dispatch(clearCartItems()); // Clear cart items after placing the order
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err.message || 'An error occurred while placing the order');
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              {selectedProduct && selectedProduct.shippingAddress && ( // Check if selectedProduct and shippingAddress are defined
                <p>
                  <strong>Address:</strong> {selectedProduct.shippingAddress.address || ''},{' '}
                  {selectedProduct.shippingAddress.city || ''} {selectedProduct.shippingAddress.postalCode || ''},{' '}
                  {selectedProduct.shippingAddress.country || ''}
                </p>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              {selectedProduct && selectedProduct.paymentMethod && ( // Check if selectedProduct and paymentMethod are defined
              <p>
                <strong>Method: </strong> {selectedProduct.paymentMethod || ''}
                </p>
              )}
            </ListGroup.Item>

            {selectedProduct && ( // Render Order Items only if selectedProduct is defined
              <ListGroup.Item>
                <h2>Order Items</h2>
                <ListGroup variant='flush'>
                  <ListGroup.Item key={selectedProduct._id}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <Link to={`/product/${selectedProduct._id}`}>
                          {selectedProduct.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {selectedProduct.qty} x ${selectedProduct.price} = $
                        {(selectedProduct.qty * selectedProduct.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </ListGroup.Item>
            )}

          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              {selectedProduct && ( // Render Order Summary only if selectedProduct is defined
                <>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${selectedProduct.itemsPrice || 0}</Col> {/* Ensure itemsPrice is a number */}
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${selectedProduct.shippingPrice || 0}</Col> {/* Ensure shippingPrice is a number */}
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${selectedProduct.taxPrice || 0}</Col> {/* Ensure taxPrice is a number */}
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total:</Col>
                      <Col>${selectedProduct.totalPrice || 0}</Col> {/* Ensure totalPrice is a number */}
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && (
                      <Message variant='danger'>{error.data.message}</Message>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn-block'
                      disabled={!selectedProduct}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                    {isLoading && <Loader />}
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
