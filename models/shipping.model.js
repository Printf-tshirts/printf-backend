const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema(
  {
    name: { type: String },
    handle: { type: String },
    price: { type: Number },

    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Shipping = mongoose.model("shippings", ShippingSchema);

module.exports = Shipping;
