const Coupon = require("../models/coupons.model.js");

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().populate("categories");
    res.status(200).json({ coupons });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(200).json({ coupon });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getCouponByCode = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      discountCode: req.query.code,
      isActive: true,
    });
    const currentDate = new Date();
    if (coupon) {
      if (coupon.startDate > currentDate || coupon.endDate < currentDate) {
        res
          .status(200)
          .json({ coupon: null, message: "Coupon Currently Not Active" });
      } else {
        res.status(200).json({ coupon });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateCouponStatus = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.query.couponId,
      {
        isActive: req.body.status,
      },
      {
        new: true,
      },
    );
    res.status(200).json({ coupon });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getCoupons,
  addCoupon,
  getCouponByCode,
  updateCouponStatus,
};
