const express = require("express");

const {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/address.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protect);

router.get("/", getMyAddresses);

router.post("/", createAddress);

router.put("/:id", updateAddress);

router.delete("/:id", deleteAddress);

router.patch("/:id/default", setDefaultAddress);

module.exports = router;