const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
if (process.env.NODE_ENV !== "production") require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

require("./config/db.config");
const app = express();
app.use(
  cors({
    origin: /\.printcoder\.com$/, // Regex pattern for your domain and all its subdomains
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
    allowedHeaders: "*",
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`On PORT ${PORT}`));
