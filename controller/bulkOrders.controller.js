const BulkOrder = require("../models/bulkOrders.model");

const getBulkOrders = async (req, res) => {
  try {
    const bulkOrders = await BulkOrder.find();
    res.status(200).json({ bulkOrders });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addBulkOrder = async (req, res) => {
  try {
    const bulkOrder = await BulkOrder.create(req.body);
    res
      .status(200)
      .json({
        message: "Bulk Order received! we'll get back to you very soon",
        bulkOrder,
      });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getBulkOrders,
  addBulkOrder,
};
