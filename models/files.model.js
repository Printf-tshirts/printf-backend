const mongoose = require("mongoose");

const filesSchema = new mongoose.Schema(
  {
    name: { type: String },
    public_id: { type: String },
    src: { type: String },
    altText: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const File = mongoose.model("files", filesSchema);

module.exports = File;
