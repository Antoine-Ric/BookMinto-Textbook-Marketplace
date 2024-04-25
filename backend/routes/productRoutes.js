import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from '../middleware/authMiddleware.js';

router.route("/").get(getProducts).post(protect, createProduct);
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

export default router;
