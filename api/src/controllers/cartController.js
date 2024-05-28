import createHttpError from "http-errors";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res, next) => {
  const { quantity, productId } = req.body;

  try {
    const user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "User does not exist."));
    }
    const product = await Product.findById(productId);
    if (!product) {
      return next(createHttpError(500, "Product does not exist."));
    }
    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      cart = new Cart({ user: user._id, products: [] });
    }

    let productAlreadyExisit = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (productAlreadyExisit > -1) {
      cart.products[productAlreadyExisit].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.json({
      success: true,
      message: "Added to the cart.",
      cart,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error while adding item to the cart. " + error)
    );
  }
};
export const removeFromCart = async (req, res, next) => {
  const { productId } = req.body;
  try {
    let user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "User does not exist."));
    }

    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      return next(createHttpError(500, "Your cart is empty!"));
    }

    const productTobeRemoved = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productTobeRemoved === -1) {
      return next(createHttpError(500, "Product not found in your cart."));
    }
    cart.products.splice(productTobeRemoved, 1);
    await cart.save();
    res.json({
      success: true,
      message: "Item removed from the cart.",
    });
  } catch (error) {
    return next(createHttpError(500, "Failed to remove item from cart"));
  }
};
export const getCartItems = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "User does not exist."));
    }
    let cart = await Cart.findOne({ user: user._id }).populate(
      "products.product"
    );

    if (!cart) {
      cart = new Cart({ user: user._id, products: [] });
      cart.save();
    }
    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    return next(createHttpError(500, "Failed to get item from cart"));
  }
};

export const updateCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    let user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "User does not exist."));
    }
    const product = await Product.findById(productId);
    if (!product) {
      return next(createHttpError(500, "Product does not exist."));
    }

    const cart = await Cart.findOne({ user: user._id });
    console.log(cart);
    if (!cart) {
      return next(createHttpError(500, "Your cart is empty!"));
    }

    const productTobeAdded = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productTobeAdded === -1) {
      return next(createHttpError(500, "Product not found in your cart."));
    }
    cart.products[productTobeAdded].quantity = quantity;
    await cart.save();
    res.json({
      success: true,
      message: "Cart updated successfully.",
      cart,
    });
  } catch (error) {
    return next(createHttpError(500, "Failed to update item in cart"));
  }
};
