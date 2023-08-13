const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "addresses" },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "payments" },
    razorpay_payment_id: { type: String },
    handle: { type: String, unique: true },
    status: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Order = mongoose.model("orders", OrdersSchema);

module.exports = Order;
