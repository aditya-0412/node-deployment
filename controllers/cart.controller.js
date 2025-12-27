const Cart = require("../models/Cart");

/**
 * Add item to cart
 */
exports.addToCart = async (req, res) => {
  const { productId, title, price, quantity, image } = req.body;

  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      userId: req.user.id,
      items: [],
    });
  }

  const index = cart.items.findIndex(
    (i) => i.productId.toString() === productId
  );

  if (index > -1) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({ productId, title, price, quantity, image });
  }

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await cart.save();
  res.json(cart);
};

/**
 * Get user cart
 */
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.json(cart);
};

/**
 * Update item quantity
 */
exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((i) => i.productId.toString() === productId);

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await cart.save();
  res.json(cart);
};

/**
 * Remove item from cart
 */
exports.removeItem = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await cart.save();
  res.json(cart);
};

/**
 * Clear cart
 */
exports.clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user.id });
  res.json({ message: "Cart cleared" });
};
