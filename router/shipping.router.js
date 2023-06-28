const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/shipping.controller");

router.post("/add-shipping", authenticateToken, controller.addShipping);
router.get("/get-shippings", authenticateToken, controller.getShippings);
router.get(
  "/get-shipping-by-handle",
  authenticateToken,
  controller.getShippingByHandle,
);

module.exports = router;
