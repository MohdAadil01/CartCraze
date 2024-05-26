import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/jwt.js";
import { create } from "../controllers/productController.js";
const router = express.Router();

const upload = multer();

router.post("/product/create", verifyToken, upload.none(), create);

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
