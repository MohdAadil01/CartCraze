import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import { create } from "../controllers/productController.js";
const router = express.Router();

router.post("/create", verifyToken, create);

export default router;
