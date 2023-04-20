const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema(
  {
    title: { type: String },
    handle: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    color: { type: String },
    sizes: [
      {
        sizeOption: { type: String },
        inventory: { type: Number },
      },
    ],
    product_code: { type: String },
    price: { type: Number },
    compare_at_price: { type: Number },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "files" }],
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Variant = mongoose.model("variants", VariantSchema);

module.exports = Variant;
