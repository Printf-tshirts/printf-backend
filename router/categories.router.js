const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/categories.controller");

router.post("/add-category", authenticateToken, controller.addCategory);
router.get("/get-categories", authenticateToken, controller.getCategories);

module.exports = router;
