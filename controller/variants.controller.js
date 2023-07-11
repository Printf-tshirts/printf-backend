const Variant = require("../models/variants.model");
const Product = require("../models/products.model");
const addVariant = async (req, res) => {
  try {
    const variant = await Variant.create(req.body.variant);
    await Product.findByIdAndUpdate(req.body.variant.product, {
      $push: { variants: variant._id },
    });
    res.status(200).json({ variant });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getVariants = async (req, res) => {
  try {
    const variantsCount = await Variant.find({
      product: req.query.productId,
    }).count("variantsCount");
    const variants = await Variant.find({ product: req.query.productId })
      .populate("images")
      .populate("color")
      .skip(req.query.skip)
      .limit(req.query.limit);
    res.status(200).json({ variants, variantsCount });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const getVariantByHandle = async (req, res) => {
  try {
    const variant = await Variant.findOne({
      handle: req.query.variantHandle,
    })
      .populate("images")
      .populate("product")
      .populate("category");
    res.status(200).json({ variant });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const deleteVariant = async (req, res) => {
  try {
    const variant = await Variant.findByIdAndDelete(req.query.variantId);
    const product = await Product.findByIdAndUpdate(variant.product, {
      $pull: { variants: variant._id },
    });

    res.status(200).json({ variant });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateVariant = async (req, res) => {
  try {
    const variant = await Variant.findByIdAndUpdate(
      req.query.variantId,
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
  getVariantByHandle,
  deleteVariant,
  updateVariant,
  updateVariantStatus,
};
