import createHttpError from "http-errors";
import User from "../models/User.js";

export const create = async (req, res, next) => {
  const user = req.user;
  const foundUser = await User.findOne({ email: user });
  if (!foundUser.isAdmin) {
    return next(createHttpError(500, "You can not access to this page."));
  }
  res.send("Create your products");
};
