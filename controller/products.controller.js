const Product = require("../models/products.model");

const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .skip(req.query.skip)
      .limit(req.query.limit);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getProduct = async (req, res) => {
  try {
    console.log(req.query.productId);
    const product = await Product.findById(req.query.productId).populate({
      path: "variants",
      populate: {
        path: "images",
      },
    });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.body.productId,
      req.body,
    );
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.query.productId,
      {
        isActive: req.body.status,
      },
      {
        new: true,
      },
    );
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  updateProductStatus,
};
