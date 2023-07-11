const Product = require("../models/products.model");
const Variant = require("../models/variants.model");

const updateProductClickCount = async (productId, clickCount) => {
  const product = await Product.findByIdAndUpdate(productId, { clickCount });
};

const updateVariantClickCount = async (variantId, clickCount) => {
  const variant = await Variant.findByIdAndUpdate(variantId, { clickCount });
};

module.exports = {
  updateProductClickCount,
  updateVariantClickCount,
};
