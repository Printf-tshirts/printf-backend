const DesignTypes = require("../models/designTypes.model");

const getDesignTypes = async (req, res) => {
  try {
    const designTypes = await DesignTypes.find();
    res.status(200).json({ designTypes });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addDesignType = async (req, res) => {
  try {
    const designType = await DesignTypes.create(req.body);
    res.status(200).json({ designType });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getDesignTypes,
  addDesignType,
};
