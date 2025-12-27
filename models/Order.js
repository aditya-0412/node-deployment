const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: String,
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    subtotal: Number,
    tax: Number,
    shippingFee: Number,
    discount: Number,
    totalAmount: Number,
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    paymentIntentId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
