import jwt from "jsonwebtoken";
import config from "../config/config.js";
import createHttpError from "http-errors";

export const generateToken = async (data) => {
  try {
    let token = jwt.sign({ user: data }, config.JWT_SECRET_KEY);
    return token;
  } catch (error) {
    console.log(error);
    return new Error("Error in Generating jwt token.");
  }
};

export const verifyToken = (req, res, next) => {
  try {
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      return next(createHttpError(500, "Please login/Signup first."));
    }
    const token = authHeader.split(" ")[1];
    let decodedData = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = decodedData.user;
    next();
  } catch (error) {
    return next(createHttpError(500, "Error in verifying jwt token."));
  }
};
