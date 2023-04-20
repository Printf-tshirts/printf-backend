const User = require("../models/users.model");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  register,
  login,
  getUser,
};
