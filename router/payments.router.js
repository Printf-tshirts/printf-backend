const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/payments.controller");

router.post("/capture", controller.capturePayment);

module.exports = router;
