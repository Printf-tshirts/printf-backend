const Product = require("../models/products.model");
const Variant = require("../models/variants.model");
const Category = require("../models/categories.model");
const mongoose = require("mongoose");
const {
  extractTagsFromSearchQuery,
  extractColorsFromSearchQuery,
  extractSizesFromSearchQuery,
  extractCategoryFromSearchQuery,
} = require("../utils/modifySearchQuery");

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
    const { skip, limit } = req.query;
    const productsCount = await Product.find().count("productsCount");
    const products = await Product.find()
      .populate("categories")
      .skip(parseInt(skip || 0))
      .limit(parseInt(limit || 10));
    res
      .status(200)
      .json({ products, productsCount: productsCount[0]?.productsCount });
  } catch (error) {
    console.log(error);
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
        path: "color",
      },
    });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getProductByVariantHandle = async (req, res) => {
  try {
    const category = await Category.findOne({
      handle: req.query.categoryHandle,
    });
    if (!category) return res.status(404).json({ error: "Category not found" });
    const variant = await Variant.findOne({
      handle: req.query.variantHandle,
      product_code: req.query.productCode,
      categories: { $in: category._id },
    });
    if (!variant) return res.status(404).json({ error: "Variant not found" });
    const product = await Product.findOne({
      variants: { $in: variant._id },
    })
      .populate({
        path: "variants",
        populate: [
          {
            path: "images",
          },
          {
            path: "categories",
          },
          {
            path: "color",
          },
        ],
      })
      .populate("images")
      .populate("categories");
    console.log(product);
    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    let {
      color,
      size,
      categoryId,
      categoryHandle,
      tags,
      skip,
      limit,
      priceSort,
    } = req.query;
    if (categoryHandle && !categoryId) {
      const category = await Category.findOne({ handle: categoryHandle });
      if (!category)
        return res.status(404).json({ error: "Category not found" });
      categoryId = category._id;
    }
    const filter = {};
    if (color) filter["variants.color"] = new mongoose.Types.ObjectId(color);
    if (size)
      filter["variants.sizes"] = {
        $elemMatch: { sizeOption: size, inventory: { $gte: 0 } },
      };
    if (categoryId)
      filter["variants.categories"] = new mongoose.Types.ObjectId(categoryId);
    if (tags) filter["tags"] = { $in: tags.split(",") };
    console.log(filter);
    const productsCount = await Product.aggregate([
      { $unwind: "$variants" },
      {
        $lookup: {
          from: "variants",
          localField: "variants",
          foreignField: "_id",
          as: "variants",
        },
      },
      {
        $match: filter,
      },
    ]).count("productsCount");
    const products = await Product.aggregate([
      { $unwind: "$variants" },
      {
        $lookup: {
          from: "variants",
          localField: "variants",
          foreignField: "_id",
          as: "variants",
          pipeline: [
            {
              $lookup: {
                from: "files",
                localField: "images",
                foreignField: "_id",
                as: "images",
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },
      { $match: filter },
      {
        $skip: parseInt(skip || 0),
      },
      {
        $limit: parseInt(limit || 10),
      },
    ]).sort({ "variants.price": parseInt(priceSort) });
    res
      .status(200)
      .json({ products, productsCount: productsCount[0]?.productsCount });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const searchProducts = async (searchTerm, skip, limit) => {
  // Extract keywords from the search term
  const keywords = searchTerm.split(" ");

  try {
    // Search for products matching the text search term
    const productSearchResults = await Product.aggregate([
      {
        $match: {
          $text: { $search: searchTerm, $caseSensitive: false },
        },
      },
      {
        $lookup: {
          from: "variants",
          localField: "variants",
          foreignField: "_id",
          as: "variants",
        },
      },
      {
        $addFields: {
          score: { $meta: "textScore" },
        },
      },
    ]);

    // Get the product IDs from the text search results
    const productIds = productSearchResults.map((product) => product._id);

    // Search for variants matching the variant-specific keywords
    const variantSearchResults = await Variant.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: new RegExp(keywords.join("|"), "i") } },
            { color: { $regex: new RegExp(keywords.join("|"), "i") } },
            {
              "size.sizeOption": {
                $regex: new RegExp(keywords.join("|"), "i"),
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
    ]);

    // Get the product IDs from the variant search results
    const variantProductIds = variantSearchResults.map(
      (variant) => variant.product._id,
    );

    // Combine the product IDs from both searches
    const allProductIds = [...productIds, ...variantProductIds];
    const idsToString = allProductIds.map((id) => id.toString());
    const uniqueProductIds = [...new Set(idsToString)];
    // Fetch the final list of products based on the combined product IDs
    const products = await Product.find({
      _id: { $in: uniqueProductIds },
    })
      .populate({
        path: "variants",
        populate: [
          {
            path: "images",
          },
          {
            path: "categories",
          },
          {
            path: "color",
          },
        ],
      })
      .populate("categories")
      .skip(parseInt(skip || 0))
      .limit(parseInt(limit || 10));

    return { products, productsCount: uniqueProductIds.length };
  } catch (error) {
    console.error("Error performing search:", error);
    throw error;
  }
};

const getProductsBySearch = async (req, res) => {
  let { searchTerm, skip, limit } = req.query;
  const { products, productsCount } = await searchProducts(searchTerm);
  res.status(200).json({ products, productsCount });
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
  getProductByVariantHandle,
  updateProduct,
  updateProductStatus,
  getProductsByCategory,
  getProductsBySearch,
};