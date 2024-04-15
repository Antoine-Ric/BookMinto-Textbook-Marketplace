import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js'

router.route("/").get(getProducts);
router.route("/:id").get(getProductById).delete(protect, admin, checkObjectId, deleteProduct);

export default router;
