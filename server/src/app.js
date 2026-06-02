const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;