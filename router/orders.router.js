const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/orders.controller");

router.post("/add-order", authenticateToken, controller.addOrder);
router.get("/get-orders", authenticateToken, controller.getOrders);
router.get("/get-all-orders", authenticateToken, controller.getAllOrders);
router.get("/get-order-by-handle/:handle", controller.getOrderByHandle);

module.exports = router;
