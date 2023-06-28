const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/cart.controller");

router.post("/update-cart", controller.updateCart);
router.get("/get-cart", authenticateToken, controller.getCart);

module.exports = router;
