const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/users.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/get-user", authenticateToken, controller.getUser);
router.put("/change-password", authenticateToken, controller.changePassword);
router.put("/update-user", authenticateToken, controller.updateUser);

module.exports = router;
