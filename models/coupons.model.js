const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    discountCode: { type: String },
    type: { type: String, default: "fixed" },
    value: { type: Number },
    minimumOrderAmount: { type: Number },
    maximumDiscountAmount: { type: Number },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
    startDate: { type: Date },
    endDate: { type: Date },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Coupon = mongoose.model("coupons", CouponSchema);

module.exports = Coupon;
