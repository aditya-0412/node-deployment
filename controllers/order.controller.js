const Order = require("../models/Order");

/**
 * Create Order
 */
exports.createOrder = async (req, res) => {
  const order = await Order.create({
    ...req.body,
    userId: req.user.id,
    status: "PENDING",
  });

  res.status(201).json(order);
};

/**
 * Get all orders of logged-in user
 */
exports.getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(orders);
};

/**
 * Get single order by ID
 */
exports.getOrderById = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
};
