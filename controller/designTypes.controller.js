const DesignType = require("../models/designTypes.model");

const getDesignTypes = async (req, res) => {
  try {
    const designTypes = await DesignType.find();
    res.status(200).json({ designTypes });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addDesignType = async (req, res) => {
  try {
    const designType = await DesignType.create(req.body);
    res.status(200).json({ designType });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getDesignTypes,
  addDesignType,
};
