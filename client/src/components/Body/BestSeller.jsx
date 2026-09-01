import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fetchProducts } from "../../services/productApi";
import { RiArrowRightLongLine } from "react-icons/ri";

export default function BestSeller() {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBestSellers = async () => {
      try {
        setLoading(true);

        const data = await fetchProducts({
          bestSeller: true,
          limit: 8,
        });

        if (!data.success) {
          throw new Error("Failed to load best sellers");
        }

        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBestSellers();
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

  if (loading) {
    return (
      <section className="w-full py-20 relative overflow-hidden">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-black/50">
            Curated Selection
          </p>
          <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase mt-2">
            Best Sellers
          </h2>
        </div>

        <div className="flex gap-6 px-5 overflow-hidden">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="min-w-65 md:min-w-75">
              <div className="w-full h-90 bg-neutral-100 animate-pulse" />

              <div className="pt-4 px-1">
                <div className="h-3 w-2/3 bg-neutral-100 animate-pulse" />
                <div className="h-3 w-1/3 bg-neutral-100 animate-pulse mt-2" />
                <div className="h-3 w-1/4 bg-neutral-100 animate-pulse mt-3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-20">
        <div className="text-center">
          <p className="text-red-500">Failed to load best sellers</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 relative overflow-hidden">
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
            key={product.slug}
            to={`/product/${product.slug}`}
            className="
              min-w-65 md:min-w-75
              snap-start
              group
            "
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.images?.[0]}
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
        <Link
          to="/products?bestSeller=true"
          className="min-w-65 md:min-w-75 min-h-90 snap-start flex flex-col items-center justify-center group"
        >
          <div className="w-16 h-16 rounded-full border border-black/30 flex items-center justify-center transition-all duration-300 text-black/30 group-hover:text-black group-hover:border-black">
            <RiArrowRightLongLine size={20} />
          </div>
          <p className="mt-5 text-[11px] tracking-[0.22em] uppercase">
            View All
          </p>
          <p className="mt-1 text-[11px] tracking-[0.12em] text-black/50">
            Best Sellers
          </p>
        </Link>
      </div>
    </section>
  );
}
