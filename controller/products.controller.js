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
const {
  updateProductClickCount,
  updateVariantClickCount,
} = require("../utils/updateClickCount");
const DesignType = require("../models/designTypes.model");

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
      .populate("images")
      .populate({
        path: "variants",
        populate: {
          path: "images",
          path: "color",
        },
      })
      .populate("design_types")
      .skip(parseInt(skip || 0))
      .limit(parseInt(limit || 10));
    res.status(200).json({ products, productsCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId).populate({
      path: "variants",
      populate: {
        path: "images",
        path: "color",
      },
    });
    const clickCount = product.clickCount ? product.clickCount + 1 : 1;
    updateProductClickCount(product._id, clickCount);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.query.productId);
    const variants = await Variant.find({ product: product._id });
    await Variant.deleteMany({
      _id: {
        $in: variants.map((variant) => variant._id),
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
    let clickCount = product.clickCount ? product.clickCount + 1 : 1;
    updateProductClickCount(product._id, clickCount);
    clickCount = variant.clickCount ? variant.clickCount + 1 : 1;
    updateVariantClickCount(variant._id, clickCount);
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
      design_types,
      design_type_handle,
      skip,
      limit,
      priceSort,
      sortBy,
    } = req.query;
    if (design_type_handle && !design_types) {
      const designType = await DesignType.findOne({
        handle: design_type_handle,
      });
      if (!designType)
        return res.status(404).json({ error: "Design type not found" });
      design_types = designType._id;
    }

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
    if (design_types)
      filter["design_types"] = new mongoose.Types.ObjectId(design_types);
    const sortQuery = {};
    if (sortBy === "price") {
      sortQuery["variants.price"] = priceSort === "asc" ? 1 : -1;
    } else {
      sortQuery["variants.clickCount"] = -1;
    }
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
      {
        $lookup: {
          from: "files",
          localField: "images",
          foreignField: "_id",
          as: "images",
        },
      },
      { $match: filter },
    ])
      .sort(sortQuery)
      .skip(parseInt(skip || 0))
      .limit(parseInt(limit || 10));
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
    console.log(req.body, req.query.productId);
    const product = await Product.findByIdAndUpdate(
      req.query.productId,
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

const getTagsFromCategory = async (req, res) => {
  try {
    const { categoryHandle } = req.query;
    const category = await Category.findOne({
      handle: categoryHandle,
    });
    const products = await Product.find({
      categories: category._id,
    }).select("tags");
    const tags = [];
    products.forEach((product) => {
      product.tags.forEach((tag) => {
        if (tags.includes(tag)) return;
        tags.push(tag);
      });
    });
    res.status(200).json({ tags });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  getProductByVariantHandle,
  getTagsFromCategory,
  deleteProduct,
  updateProduct,
  updateProductStatus,
  getProductsByCategory,
  getProductsBySearch,
};
