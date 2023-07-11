const Cart = require("../models/cart.model");
const Order = require("../models/orders.model");
const { updateInventory, verifyQuantity } = require("../utils/inventory");

const generateOrderHandle = (lastOrder) => {
  let handle = "";
  const timestamp = Date.now();
  if (lastOrder) {
    const lastOrderHandle = lastOrder.handle;
    const lastOrderNumber = Number(lastOrderHandle.split("-")[2]);
    handle = `printf-${timestamp}-${lastOrderNumber + 1}`;
  } else {
    handle = `printf-${timestamp}-1`;
  }
  return handle;
};
const addOrder = async (req, res) => {
  try {
    const lastOrder = await Order.find().sort({ createdAt: -1 }).limit(1);
    const cart = await Cart.findById(req.body.order.cart).populate(
      "items.variant",
    );
    const quantityStatus = await verifyQuantity(cart.items);
    console.log("quantityStatus", quantityStatus);
    if (quantityStatus) {
      res.status(400).json({ error: quantityStatus });
      return;
    }
    const order = await Order.create({
      ...req.body.order,
      handle: generateOrderHandle(lastOrder[0]),
    });
    await Cart.findOneAndUpdate(
      { _id: req.body.order.cart },
      { $set: { isConvertedToOrder: true } },
    );
    updateInventory(order);
    res.status(200).json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "cart",
        populate: [
          {
            path: "items.variant",
            populate: [
              {
                path: "images",
              },
              {
                path: "categories",
              },
            ],
          },
          {
            path: "shipping",
          },
        ],
      })
      .populate("user")
      .populate("address")
      .populate("payment")
      .skip(req.query.skip)
      .limit(req.query.limit)
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: "cart",
        populate: [
          {
            path: "items.variant",
            populate: [
              {
                path: "images",
              },
              {
                path: "categories",
              },
            ],
          },
          {
            path: "shipping",
          },
        ],
      })
      .populate("user")
      .populate("address")
      .populate("payment")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOrderByHandle = async (req, res) => {
  try {
    const order = await Order.findOne({ handle: req.params.handle })

      .populate({
        path: "cart",
        populate: [
          {
            path: "items.variant",
            populate: [
              {
                path: "images",
              },
              {
                path: "categories",
              },
            ],
          },
          {
            path: "shipping",
          },
        ],
      })
      .populate("user")
      .populate("address")
      .populate("payment")
      .select("-user.password");
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrders,
  getOrderByHandle,
};
