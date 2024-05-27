import express from "express";
import {
  createAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../controllers/addressController.js";
import { verifyToken } from "../middlewares/jwt.js";
const router = express.Router();

router.post("/create", verifyToken, createAddress);
router.get("/get/:id", verifyToken, getAddress);
router.put("/update/:id", verifyToken, updateAddress);
router.delete("/delete/:id", verifyToken, deleteAddress);

export default router;
