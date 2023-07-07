const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/variants.controller");

router.post("/add-variant", authenticateToken, controller.addVariant);
router.get("/get-variants", authenticateToken, controller.getVariants);
router.get("/get-variant-by-handle", controller.getVariantByHandle);
router.delete("/delete-variant", authenticateToken, controller.deleteVariant);
router.put("/update-variant", authenticateToken, controller.updateVariant);
router.put("/update-status", authenticateToken, controller.updateVariantStatus);

module.exports = router;
