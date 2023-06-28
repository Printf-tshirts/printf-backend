const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/addresses.controller");

router.post("/add-address", authenticateToken, controller.addAddress);
router.get("/get-addresses", authenticateToken, controller.getAddresses);
router.delete(
  "/delete-address/:id",
  authenticateToken,
  controller.deleteAddress,
);

module.exports = router;
