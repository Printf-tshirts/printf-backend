const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("../controller/designTypes.controller");

router.post("/add-design-type", authenticateToken, controller.addDesignType);
router.get("/get-all-design-types", controller.getDesignTypes);

module.exports = router;
