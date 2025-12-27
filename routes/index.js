const router = require("express").Router();

router.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

router.use("/auth", require("./auth.routes"));
router.use("/products", require("./product.routes"));
router.use("/cart", require("./cart.routes"));
router.use("/orders", require("./order.routes"));
router.use("/admin", require("./admin.routes"));
router.use("/categories", require("./category.routes"));
router.use("/payments", require("./payment.routes"));
router.use("/wishlist", require("./wishlist.routes"));

module.exports = router;
