import express from "express";
import { upload } from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/jwt.js";
import {
  create,
  deleteAllProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
const router = express.Router();

router.post(
  "/product/create",
  verifyToken,
  upload.array("productImages", 3),
  create
);

// *GET A SINGLE PRODUCT
router.get("/product/:id", getSingleProduct);

// *GET ALL PRODUCTS
router.get("/all", getAllProducts);

// *UPDATE PRODUCT
router.put(
  "/product/:id",
  verifyToken,
  upload.array("productImages", 3),
  updateProduct
);

// *DELETE PRODUCT
router.delete("/product/:id", verifyToken, deleteProduct);

// *DELETE PRODUCT
router.delete("/all", verifyToken, deleteAllProduct);

// *GET FILTERED PRODUCT

// *ADD A REVIEW FOR PRODUCT
// *GET ALL REVIEWS OF PRODUCT

export default router;
