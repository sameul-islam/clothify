const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const orders = await Order.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get my orders failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your orders",
    });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findOne({
      _id: id,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get single order failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { customer, items, paymentMethod = "cod" } = req.body;
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

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

    const allowedPaymentMethods = ["cod", "card", "bkash", "nagad"];

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

      if (product.sizes.length > 0) {
        if (!item.selectedSize) {
          return res.status(400).json({
            success: false,
            message: `Size is required for ${product.title}`,
          });
        }

        if (!product.sizes.includes(item.selectedSize)) {
          return res.status(400).json({
            success: false,
            message: `Invalid size for ${product.title}`,
          });
        }
      }

      if (product.colors.length > 0) {
        if (!item.selectedColor) {
          return res.status(400).json({
            success: false,
            message: `Color is required for ${product.title}`,
          });
        }

        if (!product.colors.includes(item.selectedColor)) {
          return res.status(400).json({
            success: false,
            message: `Invalid color for ${product.title}`,
          });
        }
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

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      for (const item of items) {
        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: item.productId,
            stock: { $gte: item.quantity },
          },
          {
            $inc: {
              stock: -item.quantity,
            },
          },
          {
            new: true,
            session,
          },
        );

        if (!updatedProduct) {
          throw new Error(`Insufficient stock for product: ${item.productId}`);
        }
      }

      const order = await Order.create(
        [
          {
            user: userId,
            customer,
            items: orderItems,
            pricing: {
              subtotal,
              shipping,
              tax,
              total,
            },
            paymentMethod,
          },
        ],
        {
          session,
        },
      );

      await session.commitTransaction();

      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: order[0],
      });
    } catch (error) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: error.message || "Failed to create order",
      });
    } finally {
      await session.endSession();
    }

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
  getSingleOrder,
  getMyOrders,
};
