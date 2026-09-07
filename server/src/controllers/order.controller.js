const Order = require("../models/order.model");
const Product = require("../models/product.model");

const createOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      paymentMethod = "cod",
    } = req.body;

    // -----------------------------
    // Basic validation
    // -----------------------------

    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer information is required",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    // -----------------------------
    // Validate payment method
    // -----------------------------

    const allowedPaymentMethods = [
      "cod",
      "card",
      "bkash",
      "nagad",
    ];

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // -----------------------------
    // Validate products
    // -----------------------------

    const orderItems = [];

    let subtotal = 0;

    for (const item of items) {
      if (!item.productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }

      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity",
        });
      }

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }

      // -----------------------------
      // Stock validation
      // -----------------------------

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.title} does not have enough stock`,
        });
      }

      // -----------------------------
      // Variant validation
      // -----------------------------

      if (
        item.selectedSize &&
        product.sizes.length > 0 &&
        !product.sizes.includes(item.selectedSize)
      ) {
        return res.status(400).json({
          success: false,
          message: `Invalid size for ${product.title}`,
        });
      }

      if (
        item.selectedColor &&
        product.colors.length > 0 &&
        !product.colors.includes(item.selectedColor)
      ) {
        return res.status(400).json({
          success: false,
          message: `Invalid color for ${product.title}`,
        });
      }

      // -----------------------------
      // IMPORTANT:
      // Use backend product price
      // -----------------------------

      const itemSubtotal = product.price * item.quantity;

      subtotal += itemSubtotal;

      orderItems.push({
        product: product._id,
        title: product.title,
        slug: product.slug,
        image: product.images?.[0] || "",
        selectedSize: item.selectedSize || "",
        selectedColor: item.selectedColor || "",
        quantity: item.quantity,
        price: product.price,
      });
    }

    // -----------------------------
    // Pricing
    // -----------------------------

    const shipping = 0;
    const tax = 0;

    const total = subtotal + shipping + tax;

    // -----------------------------
    // Create order
    // -----------------------------

    const order = await Order.create({
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        postalCode: customer.postalCode,
        country: customer.country || "Bangladesh",
      },

      items: orderItems,

      pricing: {
        subtotal,
        shipping,
        tax,
        total,
      },

      paymentMethod,

      status: "pending",
      paymentStatus: "pending",
    });

    // -----------------------------
    // Response
    // -----------------------------

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
};