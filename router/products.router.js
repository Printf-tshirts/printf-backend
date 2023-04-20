const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/products.controller");

router.post("/add-product", authenticateToken, controller.addProduct);
router.get("/get-products", authenticateToken, controller.getProducts);
router.get("/get-product", controller.getProduct);
router.put("/update-product", authenticateToken, controller.updateProduct);
router.put("/update-status", authenticateToken, controller.updateProductStatus);

module.exports = router;
