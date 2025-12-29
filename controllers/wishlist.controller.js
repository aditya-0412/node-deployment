const Wishlist = require("../models/Wishlist");

/**
 * Get wishlist
 */
exports.getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate(
    "products"
  );

  res.json(wishlist || { products: [] });
};

/**
 * Toggle wishlist item
 */
exports.toggleWishlist = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID required" });
  }

  let wishlist = await Wishlist.findOne({ userId: req.user.id });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      userId: req.user.id,
      products: [productId],
    });
  } else {
    const exists = wishlist.products.some((p) => p.toString() === productId);

    wishlist.products = exists
      ? wishlist.products.filter((p) => p.toString() !== productId)
      : [...wishlist.products, productId];
  }

  await wishlist.save();

  res.json({
    message: "Wishlist updated",
    wishlist,
  });
};
