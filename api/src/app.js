import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import ErrorHandler from "./middlewares/ErrorHandler.js";
import authRoute from "./routes/authRoute.js";
import profileRoute from "./routes/profileRoute.js";
import productRoute from "./routes/productRoute.js";
import addressRoute from "./routes/addressRoute.js";
import { verifyToken } from "./middlewares/jwt.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.json({ message: "Testing..." });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/user", verifyToken, profileRoute);

app.use(ErrorHandler);
export default app;
