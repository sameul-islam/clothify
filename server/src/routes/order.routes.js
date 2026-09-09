const express = require("express");

const { createOrder, getSingleOrder, getOrdersByEmail } = require("../controllers/order.controller");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrdersByEmail);
router.get("/:id", getSingleOrder);

module.exports = router;
