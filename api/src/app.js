import express from "express";
import cors from "cors";
import ErrorHandler from "./middlewares/ErrorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ message: "Testing..." });
});

app.use(ErrorHandler);
export default app;
