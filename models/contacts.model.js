const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    email: { type: String },
    number: { type: String },
    message: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Contact = mongoose.model("contacts", ContactSchema);

module.exports = Contact;
