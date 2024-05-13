import jwt from "jsonwebtoken";
import config from "../config/config.js";
import createHttpError from "http-errors";

export const generateToken = (req, res, data) => {
  try {
    let token = jwt.sign({ data }, config.JWT_SECRET_KEY);
    return token;
  } catch (error) {
    console.log(error);
    return new Error("Error in Generating jwt token.");
  }
};

export const verifyToken = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return next(createHttpError(500, "Please login/Signup first."));
    }
    const token = req.cookies.token;
    let user = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    return next(createHttpError(500, "Error in verifying jwt token."));
  }
};
