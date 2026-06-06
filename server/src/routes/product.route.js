// const express = require("express");

// const router = express.Router();

// const {
//   getAllProducts,
// } = require("../controllers/product.controller");

// router.get("/", getAllProducts);

// module.exports = router;

const express = require("express");

const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/product.controller");

router.post("/", createProduct);

router.get("/", getAllProducts);

router.get("/:slug", getSingleProduct);


module.exports = router;
