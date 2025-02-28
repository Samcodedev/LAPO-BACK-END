const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  schemeName: { type: String, required: true },
  panLength: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
{ timestamps: true }
);

module.exports = mongoose.model("Scheme", schemeSchema);
