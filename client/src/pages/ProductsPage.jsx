import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../features/products/productThunks";
import ProductCard from "../features/products/ProductCard";

export default function Products() {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const {
    products,
    loading,
    error,
    totalProducts,
  } = useSelector((state) => state.products);

  useEffect(() => {
    const params = {
      page: 1,
      limit: 12,
    };

    // Search
    const search = searchParams.get("search");

    if (search) {
      params.search = search;
    }

    // Gender
    const gender = searchParams.get("gender");

    if (gender) {
      params.gender = gender;
    }

    // Category
    const category = searchParams.get("category");

    if (category) {
      params.category = category;
    }

    // Featured
    if (searchParams.get("featured") === "true") {
      params.featured = true;
    }

    // Best Seller
    if (searchParams.get("bestSeller") === "true") {
      params.bestSeller = true;
    }

    // New Arrival
    if (searchParams.get("newArrival") === "true") {
      params.newArrival = true;
    }

    // Sorting
    const sort = searchParams.get("sort");

    if (sort) {
      params.sort = sort;
    }

    // Minimum Price
    const minPrice = searchParams.get("minPrice");

    if (minPrice) {
      params.minPrice = minPrice;
    }

    // Maximum Price
    const maxPrice = searchParams.get("maxPrice");

    if (maxPrice) {
      params.maxPrice = maxPrice;
    }

    dispatch(getProducts(params));
  }, [dispatch, searchParams]);

  const gender = searchParams.get("gender");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured") === "true";
  const bestSeller = searchParams.get("bestSeller") === "true";
  const newArrival = searchParams.get("newArrival") === "true";
  const search = searchParams.get("search");

  let pageTitle = "All Products";
  let pageDescription =
    "Explore the complete SEPY collection, thoughtfully designed with timeless elegance and modern sophistication.";

  if (search) {
    pageTitle = `Search Results`;
    pageDescription = `Explore products matching "${search}".`;
  } else if (gender === "women") {
    pageTitle = "Women's Collection";
    pageDescription =
      "Discover our curated collection of women's pieces, designed with timeless elegance and modern sophistication.";
  } else if (gender === "men") {
    pageTitle = "Men's Collection";
    pageDescription =
      "Explore refined menswear designed for modern sophistication and timeless style.";
  } else if (gender === "unisex") {
    pageTitle = "Unisex Collection";
  } else if (category) {
    pageTitle = category;
    pageDescription =
      "Discover carefully selected pieces from the SEPY collection.";
  } else if (featured) {
    pageTitle = "Featured Collection";
    pageDescription =
      "Discover our most carefully selected and distinctive pieces.";
  } else if (bestSeller) {
    pageTitle = "Best Sellers";
    pageDescription =
      "Explore the pieces most loved by the SEPY community.";
  } else if (newArrival) {
    pageTitle = "New Arrivals";
    pageDescription =
      "Discover the latest additions to the SEPY collection.";
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7]">

      {/* Page Header */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-400 mx-auto px-5 md:px-10">
          <div className="max-w-2xl">

            <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-500 mb-4">
              The Collection
            </p>

            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-neutral-900">
              {pageTitle}
            </h1>

            <p className="mt-5 max-w-xl text-sm md:text-base text-neutral-500 leading-relaxed">
              {pageDescription}
            </p>

          </div>
        </div>
      </section>

      {/* Filter / Sort Bar */}
      <section className="border-y border-black/10">
        <div className="max-w-400 mx-auto px-5 md:px-10">

          <div className="min-h-16 flex items-center justify-between">

            <div>
              <span className="text-[11px] tracking-[0.18em] uppercase text-neutral-500">
                {loading
                  ? "Loading Products"
                  : `${totalProducts} Products`}
              </span>
            </div>

            <div>
              <button
                type="button"
                className="text-[11px] tracking-[0.18em] uppercase text-neutral-900"
              >
                Filter & Sort
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Product Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-400 mx-auto px-5 md:px-10">

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
              {[...Array(8)].map((_, index) => (
                <div key={index}>

                  <div className="aspect-3/4 bg-neutral-100 animate-pulse" />

                  <div className="mt-5 h-3 w-1/3 bg-neutral-100 animate-pulse" />

                  <div className="mt-3 h-4 w-2/3 bg-neutral-100 animate-pulse" />

                  <div className="mt-3 h-4 w-1/4 bg-neutral-100 animate-pulse" />

                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="py-20 text-center">

              <p className="text-sm text-red-500">
                Failed to load products
              </p>

              <p className="mt-2 text-xs text-neutral-500">
                {error}
              </p>

            </div>
          )}

          {/* Empty */}
          {!loading && !error && products.length === 0 && (
            <div className="py-20 text-center">

              <p className="text-sm text-neutral-500">
                No products found.
              </p>

            </div>
          )}

          {/* Products */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">

              {products.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                />
              ))}

            </div>
          )}

        </div>
      </section>

    </main>
  );
}