const express = require("express");
const cors = require("cors");
const Variant = require("./models/variants.model");
const DesignType = require("./models/designTypes.model");
const cloudinary = require("cloudinary").v2;
if (process.env.NODE_ENV !== "production") require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

require("./config/db.config");
const app = express();
// app.use(cors());
app.use(
  cors({
    origin: [
      "https://printcoder.com",
      "https://sisanc.printcoder.com",
      "https://sisanc.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"], // Allow only certain headers
    allowCredentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/users", require("./router/users.router"));
app.use("/api/files", require("./router/files.router"));
app.use("/api/products", require("./router/products.router"));
app.use("/api/variants", require("./router/variants.router"));
app.use("/api/categories", require("./router/categories.router"));
app.use("/api/cart", require("./router/cart.router"));
app.use("/api/addresses", require("./router/addresses.router"));
app.use("/api/orders", require("./router/orders.router"));
app.use("/api/shipping", require("./router/shipping.router"));
app.use("/api/coupons", require("./router/coupons.router"));
app.use("/api/colors", require("./router/colors.router"));
app.use("/api/design-types", require("./router/designTypes.router"));
app.use("/api/subscribers", require("./router/subscribers.router"));
app.use("/api/contacts", require("./router/contacts.router"));
app.use("/api/sisanc", require("./router/sisanc.router"));
app.use("/api/bulk-orders", require("./router/bulkOrder.router"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`On PORT ${PORT}`));
