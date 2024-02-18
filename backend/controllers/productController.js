import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch all Products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {

  // match by item name
  // match by isbn number - must implement later
  const keyword = req.query.keyword ? {name: { $regex: req.query.keyword, $options: 'i'}} : /*{isbn: { $regex: req.query.keyword, $options: 'i'}} :*/ {}

  const products = await Product.find({...keyword});
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

export { getProducts, getProductById };
