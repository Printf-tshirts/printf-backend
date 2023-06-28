const mongoose = require("mongoose");
const Cart = require("./../models/cart.model");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
      isConvertedToOrder: false,
    })
      .populate({
        path: "items.variant",
        populate: [
          {
            path: "images",
          },
          {
            path: "categories",
          },
        ],
      })
      .populate("user")
      .select("-user.password");
    console.log(cart);
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const updateCart = async (req, res) => {
  try {
    let cart = null;
    if (req.body.cart.user) {
      cart = await Cart.findOneAndUpdate(
        { user: req.body.cart.user, isConvertedToOrder: false },
        {
          $set: {
            ...req.body.cart,
          },
        },
        { new: true },
      );
      if (!cart) {
        cart = await Cart.findOneAndUpdate(
          { session: req.body.cart.session, isConvertedToOrder: false },
          {
            $set: {
              ...req.body.cart,
            },
          },
          { new: true },
        );
        if (!cart) {
          cart = await Cart.create(req.body.cart);
        }
      }
      res.status(200).json({ cart });
    } else if (req.body.cart.session) {
      cart = await Cart.findOneAndUpdate(
        { session: req.body.cart.session, isConvertedToOrder: false },
        {
          $set: {
            ...req.body.cart,
          },
        },
        { new: true },
      );
      if (!cart) {
        cart = await Cart.create(req.body.cart);
      }
      res.status(200).json({ cart });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  getCart,
  updateCart,
};
