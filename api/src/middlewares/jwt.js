import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (data) => {
  try {
    let token = jwt.sign({ data }, config.JWT_SECRET_KEY);
    return token;
  } catch (error) {
    console.log(error);
    return new Error("Error in Generating jwt token.");
  }
};
