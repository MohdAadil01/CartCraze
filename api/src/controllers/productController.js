import createHttpError from "http-errors";
import User from "../models/User.js";

export const create = async (req, res, next) => {
  const user = req.user;
  console.log(user);
  const foundUser = await User.findOne({ email: user });
  if (!foundUser.isAdmin) {
    return next(createHttpError(500, "Unauthorized."));
  }
  const { name } = req.body;
  res.send("Create your products " + name);
};
