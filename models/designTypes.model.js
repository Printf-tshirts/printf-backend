const mongoose = require("mongoose");

const DesignTypesSchema = new mongoose.Schema(
  {
    name: { type: String },
    handle: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const DesignType = mongoose.model("designTypes", DesignTypesSchema);

module.exports = DesignType;
