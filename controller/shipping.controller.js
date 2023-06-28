const Shipping = require("../models/shipping.model");

const getShippings = async (req, res) => {
  try {
    const shippings = await Shipping.find();
    res.status(200).json({ shippings });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const addShipping = async (req, res) => {
  try {
    const shipping = await Shipping.create(req.body);
    res.status(200).json({ shipping });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const getShippingByHandle = async (req, res) => {
  try {
    const shipping = await Shipping.findOne({ handle: req.query.handle });
    res.status(200).json({ shipping });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getShippings,
  addShipping,
  getShippingByHandle,
};
