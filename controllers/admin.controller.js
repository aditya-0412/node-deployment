const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.dashboardStats = async (req, res) => {
  const [users, orders, products] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Product.countDocuments(),
  ]);

  const revenue = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  res.json({
    users,
    orders,
    products,
    revenue: revenue[0]?.total || 0,
  });
};
