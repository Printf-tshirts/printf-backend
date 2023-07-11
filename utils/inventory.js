const Cart = require("../models/cart.model");
const Variant = require("../models/variants.model");

const updateInventory = async (order) => {
  try {
    const cart = await Cart.findById(order.cart).populate("items.variant");
    cart.items.forEach(async (item) => {
      const variant = await Variant.findById(item.variant._id);
      variant.sizes.forEach((size) => {
        if (size.sizeOption === item.size) {
          size.inventory = size.inventory - item.quantity;
        }
      });
      await variant.save();
    });
  } catch (error) {
    console.log(error);
  }
};
const verifyQuantity = async (items) => {
  try {
    for (let i = 0; i < items.length; i++) {
      const variant = await Variant.findById(items[i].variant);
      for (let j = 0; j < variant.sizes.length; j++) {
        const size = variant.sizes[j];
        if (size.sizeOption === items[i].size) {
          if (size.inventory < items[i].quantity) {
            console.log("invalid quantity");
            return `Sorry, we only have ${size.inventory} items left in stock for ${items[i].variant.title} in size ${items[i].size}. Please reduce the quantity or remove the item from your cart.`;
          }
        }
      }
    }
    console.log("valid quantity");
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  updateInventory,
  verifyQuantity,
};
