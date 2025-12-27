const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const Product = require("../models/Product");

router.get("/stats", auth, role("admin"), async (req, res) => {
  const users = await User.countDocuments();
  const orders = await Order.countDocuments();
  const products = await Product.countDocuments();

  res.json({ users, orders, products });
});

module.exports = router;
