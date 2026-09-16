const express = require("express");

const { createOrder, getSingleOrder, getMyOrders, getShippingQuote } = require("../controllers/order.controller");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.post("/shipping-quote", protect, getShippingQuote);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getSingleOrder);

module.exports = router;