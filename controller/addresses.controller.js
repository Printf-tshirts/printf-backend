const Address = require("../models/addresses.model");

const addAddress = async (req, res) => {
  try {
    const userAddress = await Address.findOne({ user: req.body.address.user });
    let isDefault = true;
    if (userAddress) isDefault = false;
    console.log(req.body);
    const address = await Address.create({ ...req.body.address, isDefault });
    res.status(200).json({ address });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id, isActive: true });
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!address) {
      res.status(400).json({ message: "Address not found" });
      return;
    }
    await Address.findByIdAndUpdate(req.params.id, {
      isActive: false,
      isDeleted: true,
    });
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  addAddress,
  getAddresses,
  deleteAddress,
};
