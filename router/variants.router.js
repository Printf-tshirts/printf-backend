const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/variants.controller");

router.post("/add-variant", authenticateToken, controller.addVariant);
router.get("/get-variants", authenticateToken, controller.getVariants);
router.put("/update-variant", authenticateToken, controller.updateVariant);
router.put("/update-status", authenticateToken, controller.updateVariantStatus);

module.exports = router;
