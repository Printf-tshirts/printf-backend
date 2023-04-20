const Variant = require("../models/variants.model");
const Product = require("../models/products.model");
const addVariant = async (req, res) => {
  try {
    const variant = await Variant.create(req.body.variant);
    console.log(variant);
    await Product.findByIdAndUpdate(req.body.variant.productId, {
      $push: { variants: variant._id },
    });
    res.status(200).json({ variant });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getVariants = async (req, res) => {
  try {
    const variants = await Variant.find({ productId: req.query.productId })
      .populate("images")
      .skip(req.query.skip)
      .limit(req.query.limit);
    res.status(200).json({ variants });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateVariant = async (req, res) => {
  try {
    const variant = await Variant.findByIdAndUpdate(
      req.body.variantId,
      req.body,
    );
    res.status(200).json({ variant });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateVariantStatus = async (req, res) => {
  try {
    const variant = await Variant.findByIdAndUpdate(
      req.query.variantId,
      {
        isActive: req.body.status,
      },
      {
        new: true,
      },
    );
    res.status(200).json({ variant });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  addVariant,
  getVariants,
  updateVariant,
  updateVariantStatus,
};
