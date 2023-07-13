const router = require("express").Router();
const controller = require("./../controller/bulkOrders.controller");

router.post("/add-bulk-order", controller.addBulkOrder);
router.get("/get-all-bulk-order", controller.getBulkOrders);

module.exports = router;
