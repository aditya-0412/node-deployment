const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", unique: true },
    totalPrice: Number,
    items: [
      {
        productId: { type: mongoose.Types.ObjectId, ref: "Product" },
        title: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
