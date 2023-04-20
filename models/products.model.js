const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    title: { type: String },
    handle: { type: String },
    body_html: { type: String },
    vendor: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    product_code: { type: String },
    tags: { type: Array },
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "variants" }],
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Product = mongoose.model("products", ProductsSchema);

module.exports = Product;
