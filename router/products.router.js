const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const controller = require("./../controller/products.controller");

router.post("/add-product", authenticateToken, controller.addProduct);
router.get("/get-products", controller.getProducts);
router.get("/get-product", controller.getProduct);
router.get("/get-products-by-category", controller.getProductsByCategory);
router.get(
  "/get-product-by-variant-handle",
  controller.getProductByVariantHandle,
);
router.get("/get-products-by-search", controller.getProductsBySearch);
router.put("/update-product", authenticateToken, controller.updateProduct);
router.put("/update-status", authenticateToken, controller.updateProductStatus);

module.exports = router;
