import express from "express";
import cors from "cors";
import ErrorHandler from "./middlewares/ErrorHandler.js";
import authRoute from "./routes/authRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.json({ message: "Testing..." });
});

app.use("/api/v1/auth", authRoute);

app.use(ErrorHandler);
export default app;
