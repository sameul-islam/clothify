const express = require("express");

const { createOrder, getSingleOrder, getMyOrders } = require("../controllers/order.controller");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getSingleOrder);

module.exports = router;