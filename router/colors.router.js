const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/colors.controller");

router.post("/add-color", authenticateToken, controller.addColor);
router.get("/get-all-colors", controller.getColors);

module.exports = router;
