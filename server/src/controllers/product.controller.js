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

const slugify = require("slugify");

// ___________________ Product Creating ___________________

const createProduct = async (req, res) => {
  try {

    let slug = slugify(req.body.title, {
      lower: true,
      strict: true,
    });

    const existingProduct = await Product.findOne({ slug });

    if (existingProduct) {
      slug = `${slug}-${Date.now()}`;
    }

    const product = await Product.create({
      ...req.body,
      slug,
    });

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

    // =================== Query Parameters ==================

    const {
      featured,
      bestSeller,
      newArrival,
      category,
      gender,
      limit,
      search,
      page,
      sort,
      minPrice,
      maxPrice,
    } = req.query;

    //  Product Filter

    const filter = {};

    // ========== Featured Products Filter ==========

    if (featured === "true") {
      filter.featured = true;
    }

    // ============= Best Seller Filter =============

    if (bestSeller === "true") {
      filter.bestSeller = true;
    }

    // -------------- New Arrival Filter --------------

    if (newArrival === "true") {
      filter.newArrival = true;
    }

    // ========= Category Filter ==========

    if (category) {
      filter.category = category;
    }

    // ------------ Gender Filter -----------

    if (gender) {
      filter.gender = gender;
    }

    // -------------- Search By Product Title ---------------

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    // +++++++ Base Query ++++++++

    let query = Product.find(filter);

    // *********** Sorting ***********

    let sortOption = {
      createdAt: -1,
    };

    switch (sort) {

      case "price-low": 
      sortOption = { price: 1 };
      break;

      case "price-high": 
      sortOption = { price: -1 };
      break;

      case "rating": 
      sortOption = { rating: -1 };
      break;

      default: 
      sortOption = { createdAt: -1 };

    }


    // ____________________ Price Range __________________

    if (minPrice || maxPrice) {
      filter.price = {};
    }

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }


    // -------------- Pagination ----------------

    const currentPage = Number(page) || 1;

    const pageSize = Number(limit) || 12;

    if (page) {
      query = query.skip((currentPage - 1) * pageSize);
    }
    query = query.limit(pageSize);

    // ________________ Total Mathcing Products _________________

    const totalProducts = await Product.countDocuments(filter);

    // _______________ Execute Query _________________

    const products = await query.sort(sortOption);

    res.status(200).json({
      success: true,

      count: products.length,

      totalProducts,

      currentPage,

      totalPages: Math.ceil(totalProducts / pageSize),

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

// _____________ Related Products For Detail Page _______________

const getRelatedProducts = async (req, res) => {
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

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .limit(6)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products: relatedProducts,
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
  getRelatedProducts,
};
