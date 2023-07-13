const mongoose = require("mongoose");

const BulkOrderSchema = new mongoose.Schema(
  {
    name: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    email: { type: String },
    number: { type: String },
    message: { type: String },
    status: { type: String, default: "Pending" },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const BulkOrder = mongoose.model("bulkOrders", BulkOrderSchema);

module.exports = BulkOrder;
