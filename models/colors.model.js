const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
  {
    name: { type: String },
    hexCode: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Color = mongoose.model("colors", ColorSchema);

module.exports = Color;
