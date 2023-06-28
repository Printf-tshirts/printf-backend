const mongoose = require("mongoose");

const AddressesSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    name: { type: String },
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    postcode: { type: String },
    phone: { type: String },
    email: { type: String },
    isDefault: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Address = mongoose.model("addresses", AddressesSchema);

module.exports = Address;
