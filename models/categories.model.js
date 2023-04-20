const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    title: { type: String },
    handle: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Category = mongoose.model("categories", CategoriesSchema);

module.exports = Category;
