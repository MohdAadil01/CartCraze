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
    const newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
      category,
      panelDetails: {
        panelColor,
        textColor,
        backgroundColor,
      },
      productImages: productImagesCloudinaryURL,
    });
    res.json({
      success: true,
      message: "Product created.",
      newProduct,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while creating new product. " + error)
    );
  }
};

export const getAllProducts = async (req, res, next) => {
  res.send("all");
};

export const getSingleProduct = async (req, res, next) => {
  res.send("single");
};

export const updateProduct = async (req, res, next) => {
  res.send("update");
};

export const deleteProduct = async (req, res, next) => {
  res.send("delete");
};

export const deleteAllProduct = async (req, res, next) => {
  res.send("delete all");
};
