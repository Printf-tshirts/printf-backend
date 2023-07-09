const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("../controller/subscribers.controller");

router.get("/add-subscriber", controller.addSubscriber);
router.get("/get-all-subscribers", controller.getSubscribers);

module.exports = router;
