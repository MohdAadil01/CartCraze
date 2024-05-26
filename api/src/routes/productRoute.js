import express from "express";
import { upload } from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/jwt.js";
import { create } from "../controllers/productController.js";
const router = express.Router();

router.post(
  "/product/create",
  verifyToken,
  upload.array("productImages", 3),
  create
);

// *GET A SINGLE PRODUCT
// *GET ALL PRODUCTS
// *UPDATE PRODUCT
// *DELETE PRODUCT
// *GET FILTERED PRODUCT
// *ADD A REVIEW FOR PRODUCT
// *GET ALL REVIEWS OF PRODUCT
// *
// *
// *
// *
// *

export default router;
