const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    email: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { strict: true, timestamps: true },
);

const Subscriber = mongoose.model("subscribers", SubscriberSchema);

module.exports = Subscriber;
