import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function BestSeller() {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products?best-seller=true&limit=8");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchBestSellers();
  }, []);

  // scroll controls
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 320;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white py-20 relative overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 flex items-end justify-between mb-10">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-black/50">
            Curated Selection
          </p>
          <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase mt-2">
            Best Sellers
          </h2>
        </div>

        {/* Controls */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition"
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="
          flex gap-6 px-5 overflow-x-auto scroll-smooth
          snap-x snap-mandatory
          scrollbar-none
        "
      >
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="
              min-w-65 md:min-w-75
              bg-white
              snap-start
              group
            "
          >

            {/* Image */}
            <div className="relative overflow-hidden bg-gray-100">
              <img
                src={product.image?.[0]}
                alt={product.title}
                className="
                  w-full h-90 object-cover
                  group-hover:scale-105 transition duration-500
                "
              />

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
            </div>

            {/* Info */}
            <div className="pt-4 px-1">
              <h3 className="text-[13px] tracking-widest uppercase text-black">
                {product.title}
              </h3>

              <p className="text-[12px] text-black/60 mt-1">
                {product.category}
              </p>

              <p className="text-[13px] mt-2 tracking-widest">
                $ {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}