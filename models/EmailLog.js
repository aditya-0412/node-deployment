const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId,
    type: String,
    provider: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmailLog", emailLogSchema);
