import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch all Products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? {
    $or: [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { ISBN: { $regex: req.query.keyword, $options: 'i' } }
    ]
  } : {}

  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Public
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    Author: "Sample Author",
    Subject: "Sample Subject",
    ISBN: "Sample ISBN",
    countInStock: 1,
    numReviews: 0,
    description: 'Sample description',
    userEmail: req.user.email
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, Author, description, image, Subject, ISBN, countInStock, userEmail} = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.Author = Author;
    product.description = description;
    product.image = image;
    product.Subject = Subject;
    product.ISBN = ISBN;
    product.countInStock = countInStock;
    product.userEmail = userEmail;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  public
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };