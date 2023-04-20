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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./router/users.router"));
app.use("/api/files", require("./router/files.router"));
app.use("/api/products", require("./router/products.router"));
app.use("/api/variants", require("./router/variants.router"));
app.use("/api/categories", require("./router/categories.router"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`On PORT ${PORT}`));
