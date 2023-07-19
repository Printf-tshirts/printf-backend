const mongoose = require("mongoose");

const SisancSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    number: { type: String },
    subject: { type: String },
    message: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Contact = mongoose.model("sisanc", SisancSchema);

module.exports = Contact;
