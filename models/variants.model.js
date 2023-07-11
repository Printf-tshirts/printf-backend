const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema(
  {
    title: { type: String },
    handle: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
    color: { type: mongoose.Schema.Types.ObjectId, ref: "colors" },
    sizes: [
      {
        sizeOption: { type: String },
        inventory: { type: Number, default: 0 },
      },
    ],
    product_code: { type: String },
    price: { type: Number, default: 499 },
    clickCount: { type: Number, default: 0 },
    compare_at_price: { type: Number, default: 0 },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "files" }],
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Variant = mongoose.model("variants", VariantSchema);

module.exports = Variant;
