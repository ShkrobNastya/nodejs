const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");

exports.getAllCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find();
  res.json(carts);
});

exports.deleteCartItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedItem = await Cart.findOneAndDelete({ id });

  if (!deletedItem) {
    const error = new Error("Product doesnt exist in cart");
    error.status = 404;
    return next(error);
  }

  res.json({ message: "Product was deleted from cart", item: deletedItem });
});

exports.createCartItem = asyncHandler(async (req, res) => {
  const newOrder = req.body;

  const cart = new Cart(newOrder);
  const savedCart = await cart.save();

  res.status(201).json(savedCart);
});

exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const updatedCart = await Cart.findOneAndUpdate({ id }, updateData, {
    new: true,
  });

  if (!updatedCart) {
    const error = new Error("Cart not found");
    error.status = 404;
    return next(error);
  }

  res.json(updatedCart);
});
