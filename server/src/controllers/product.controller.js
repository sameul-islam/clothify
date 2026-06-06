// const Product = require("../models/product.model");

// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();

//     res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   getAllProducts,
// };







const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






const getAllProducts = async (req, res) => {
  try {
    const {
      featured,
      bestSeller,
      newArrival,
      category,
      gender,
      limit,
    } = req.query;

    const filter = {};

    if (featured === "true") {
      filter.featured = true;
    }

    if (bestSeller === "true") {
      filter.bestSeller = true;
    }

    if (newArrival === "true") {
      filter.newArrival = true;
    }

    if (category) {
      filter.category = category;
    }

    if(gender) {
      filter.gender = gender;
    }

    let query = Product.find(filter);

    if (limit) {
      query = query.limit(Number(limit));
    }

    const products = await query.sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};