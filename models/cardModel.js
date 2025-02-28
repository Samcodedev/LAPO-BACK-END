const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    cardName: { type: String, required: true },
    cardScheme: { type: String, required: true },
    description: { type: String },
    branchBlacklist: { type: String },
    blacklist: { type: Boolean, default: false },
    binPrefix: { type: String, required: true },
    expiration: { type: String },
    currency: { type: String, required: true },
    fee: {
      feeName: { type: String },
      value: { type: Number },
      frequency: { type: String },
      currency: { type: String },
      time: { type: String },
      accountPad: { type: String },
      account: { type: String },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
