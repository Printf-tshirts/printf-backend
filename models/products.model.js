const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    title: { type: String },
    handle: { type: String },
    body_html: { type: String },
    vendor: { type: String },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        default: [new mongoose.Types.ObjectId("64469b38d4cb14feafde3b39")],
      },
    ],
    product_code: { type: String },
    tags: { type: Array },
    design_types: [
      { type: mongoose.Schema.Types.ObjectId, ref: "designTypes" },
    ],
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "variants" }],
    print_size: { type: String },

    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "files" }],
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Product = mongoose.model("products", ProductsSchema);

module.exports = Product;
