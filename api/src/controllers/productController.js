import createHttpError from "http-errors";
import User from "../models/User.js";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export const create = async (req, res, next) => {
  const user = req.user;
  try {
    const foundUser = await User.findOne({ email: user });
    if (!foundUser.isAdmin) {
      return next(createHttpError(403, "Unauthorized."));
    }
  } catch (error) {
    return next(createHttpError(500, "Unable to find user in database."));
  }

  const productImages = req.files;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  let productImagesCloudinaryURL = [];

  try {
    for (let i = 0; i < productImages.length; i++) {
      const filePath = path.resolve(
        __dirname,
        "../../public/images/uploads/" + productImages[i].filename
      );

      const imageUploadResult = await cloudinary.uploader.upload(filePath, {
        public_id: path.parse(productImages[i].filename).name,
        folder: "product-images",
        filename_override: productImages[i].filename,
        resource_type: "image",
      });
      // console.log("uploaded" + JSON.stringify(imageUploadResult));
      productImagesCloudinaryURL.push(imageUploadResult.secure_url);
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while uploading images to cloud."));
  }

  const {
    name,
    description,
    price,
    quantity,
    category,
    panelColor,
    textColor,
    backgroundColor,
  } = req.body;

  try {
  } catch (error) {}

  res.send("Create your products " + productImagesCloudinaryURL);
};
