const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/coupons.controller");

router.post("/add-coupon", authenticateToken, controller.addCoupon);
router.get("/get-all-coupons", authenticateToken, controller.getCoupons);
router.get(
  "/get-coupon-by-code",
  authenticateToken,
  controller.getCouponByCode,
);
router.put("/update-status", authenticateToken, controller.updateCouponStatus);

module.exports = router;
