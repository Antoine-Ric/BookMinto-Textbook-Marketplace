import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
//import Product from '../models/productModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { selectedProduct, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (!selectedProduct) {
    res.status(400);
    throw new Error('Selected product is required');
  }

  const orderItem = {
    product: selectedProduct._id, // Assuming selectedProduct is an object with an _id property
    name: selectedProduct.name,
    image: selectedProduct.image,
    price: selectedProduct.price,
    qty: selectedProduct.qty, // Assuming qty is provided in selectedProduct
  };

  const order = new Order({
    orderItems: [orderItem],
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});


// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  });

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
  
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Check the correct amount was paid
      const paidCorrectAmount = order.totalPrice.toString() === req.body.amount;
      if (!paidCorrectAmount) {
        console.error('Incorrect amount paid');
        throw new Error('Incorrect amount paid');
      }

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.status(200).json(updatedOrder);
    } else {
      console.error('Order not found');
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    console.error('Error updating order to paid:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
  };
  