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





// const getFeaturedProducts = async (req, res) => {
//   try {
//     const products = (await Product.find({ featured: true }));

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




// const getBestSellerProducts = async (req, res) => {
//   try {
//     const products = await Product.find({
//       bestSeller: true,
//     });

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





module.exports = {
  createProduct,
  getAllProducts,
};