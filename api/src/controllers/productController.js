import createHttpError from "http-errors";
import User from "../models/User.js";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { error } from "console";

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
  try {
    const allProducts = await Product.find({});
    const length = allProducts.length;
    res.json({
      success: true,
      totalProducts: length,
      allProducts,
    });
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while getting all products from the database. " + error
      )
    );
  }
};

export const getSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      return next(
        createHttpError(500, "Product does not exist with the id. " + id)
      );
    }
    res.json({
      success: true,
      foundProduct,
    });
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while fetching product from the database. " + error
      )
    );
  }
};

export const updateProduct = async (req, res, next) => {
  const user = req.user;
  try {
    const foundUser = await User.findOne({ email: user });
    if (!foundUser.isAdmin) {
      return next(createHttpError(403, "Unauthorized."));
    }
  } catch (error) {
    return next(createHttpError(500, "Unable to find user in database."));
  }

  const productImages = req.files || [];

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

  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );
    res.json({
      success: true,
      message: "Product updated.",
      updatedProduct,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while creating new product. " + error)
    );
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const foundUser = await User.findOne({ email: user });
    if (!foundUser.isAdmin) {
      return next(createHttpError(500, "Unauthorized."));
    }
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while fetching user from the database. " + error
      )
    );
  }

  try {
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      return next(
        createHttpError(500, "Product does not match in the database. " + error)
      );
    }
    await foundProduct.deleteOne();
    res.json({
      success: true,
      message: "Successfully deleted product.",
    });
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while deleting product from the database. " + error
      )
    );
  }
};

export const deleteAllProduct = async (req, res, next) => {
  const user = req.user;
  try {
    const foundUser = await User.findOne({ email: user });
    if (!foundUser.isAdmin) {
      return next(createHttpError(500, "Unauthorized."));
    }
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while fetching user from the database. " + error
      )
    );
  }
  try {
    const allProducts = await Product.find({});
    if (allProducts.length === 0) {
      return next(
        createHttpError(500, "Products collections is alread empty. ")
      );
    }
    await Product.deleteMany({});
    res.json({
      success: true,
      message: "Successfully deleted all products",
    });
  } catch (error) {
    return next(
      createHttpError(500, "Failed to delete all products. " + error)
    );
  }
};
