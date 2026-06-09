import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

export default function ProductCard({ product }) {
  return (
    <article className="group relative overflow-hidden ">

      {/* Product Image */}
      <div className="relative overflow-hidden">

        <img
          src={product?.images?.[0]}
          alt={product?.title}
          className="
            w-full
            aspect-3/4
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* Second Image Hover */}
        {product?.images?.[1] && (
          <img
            src={product.images[1]}
            alt={product.title}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />
        )}

        {/* Wishlist */}
        <button
          className="
            absolute
            top-4
            right-4
            z-20
            flex
            items-center
            justify-center
            w-9
            h-9
            rounded-full
            bg-white/80
            backdrop-blur-sm
            text-black
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-300
          "
        >
          <FaHeart size={14} />
        </button>

        {/* Featured Badge */}
        {product?.featured && (
          <span
            className="
              absolute
              top-4
              left-4
              bg-black
              text-white
              text-[10px]
              uppercase
              tracking-[0.15em]
              px-3
              py-1
            "
          >
            Featured
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="pt-5 pb-2">

        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.15em]
            text-neutral-500
            mb-2
          "
        >
          {product?.category}
        </p>

        <Link
          to={`/products/${product?._id}`}
          className="
            block
            text-[15px]
            text-neutral-900
            font-medium
            mb-2
            hover:text-neutral-600
            transition-colors
          "
        >
          {product?.title}
        </Link>

        <p
          className="
            text-[15px]
            font-light
            tracking-wide
            text-neutral-900
          "
        >
          ${product?.price?.toLocaleString()}
        </p>
      </div>
    </article>
  );
}