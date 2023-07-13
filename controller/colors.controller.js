const Color = require("../models/colors.model.js");

const getColors = async (req, res) => {
  try {
    const colors = await Color.find();
    res.status(200).json({ colors });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addColor = async (req, res) => {
  try {
    const color = await Color.create(req.body);
    res.status(200).json({ color });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getColors,
  addColor,
};
