const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    description: String,
    price: Number,
    compareAtPrice: Number,
    stock: Number,
    sku: String,
    images: [String],
    categoryId: { type: mongoose.Types.ObjectId, ref: "Category" },
    isActive: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
