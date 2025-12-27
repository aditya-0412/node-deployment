const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Types.ObjectId, ref: "Order" },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    provider: String,
    amount: Number,
    currency: String,
    paymentIntentId: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
