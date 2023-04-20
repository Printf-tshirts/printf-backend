const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = connection;
