import { useEffect, useState } from "react";

import ProductCard from "../product/ProductCard"

// import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/products?featured=true&limit=8"
        );

        const data = await response.json();

        if (!data.success) {
          throw new Error("Failed to load products");
        }

        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-28">
        <div className="max-w-400 mx-auto px-5 md:px-10">

          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 mb-3">
              Curated Selection
            </p>

            <h2 className="text-3xl md:text-5xl font-light">
              Featured Products
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <div className="aspect-3/4 bg-neutral-100 animate-pulse" />

                <div className="mt-4 h-3 bg-neutral-100 animate-pulse" />

                <div className="mt-3 h-4 bg-neutral-100 animate-pulse w-2/3" />

                <div className="mt-3 h-4 bg-neutral-100 animate-pulse w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="text-center">
          <p className="text-red-500">
            Failed to load featured products
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28">

      <div className="max-w-400 mx-auto px-5 md:px-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-16">

          <p
            className="
              text-[11px]
              tracking-[0.28em]
              uppercase
              text-neutral-500
              mb-3
            "
          >
            Curated Selection
          </p>

          <h2
            className="
              text-[30px]
              md:text-[52px]
              font-light
              tracking-tight
              text-neutral-900
            "
          >
            Featured Products
          </h2>

          <p
            className="
              mt-5
              max-w-xl
              text-sm
              md:text-base
              text-neutral-500
              leading-relaxed
            "
          >
            Discover our most loved pieces carefully selected
            for timeless elegance and modern sophistication.
          </p>
        </div>

        {/* Products Grid */}
        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-x-4
            gap-y-10
            md:gap-x-8
            md:gap-y-14
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

        {/* View All */}
        <div className="flex justify-center mt-16 md:mt-20">

          <button
            className="
              border
              border-black
              px-8
              md:px-10
              py-3.5
              text-[11px]
              tracking-[0.22em]
              uppercase
              transition-all
              duration-300
              hover:bg-black
              hover:text-white
            "
          >
            View Collection
          </button>

        </div>

      </div>

    </section>
  );
}