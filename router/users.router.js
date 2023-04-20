const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/users.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/get-user", authenticateToken, controller.getUser);

module.exports = router;
