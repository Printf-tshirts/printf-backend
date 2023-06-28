const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    session: { type: String },
    items: [
      {
        variant: { type: mongoose.Schema.Types.ObjectId, ref: "variants" },
        quantity: { type: Number },
        size: { type: String },
        cartItemId: { type: String },
      },
    ],
    shipping: { type: mongoose.Schema.Types.ObjectId, ref: "shippings" },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: "coupons" },
    totalPrice: { type: Number },
    shippingPrice: { type: Number },
    discountPrice: { type: Number },
    finalPrice: { type: Number },
    isConvertedToOrder: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Cart = mongoose.model("carts", CartSchema);

module.exports = Cart;
