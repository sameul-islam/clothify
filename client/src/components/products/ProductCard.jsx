import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group">

      <div className="relative overflow-hidden bg-gray-100">

        <img
          src={product.images?.[0]}
          className="w-full h-[380px] object-cover group-hover:scale-105 transition duration-500"
        />

        {/* hover second image */}
        {product.images?.[1] && (
          <img
            src={product.images[1]}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
          />
        )}

      </div>

      <div className="mt-3">
        <h3 className="text-sm uppercase tracking-wide">
          {product.title}
        </h3>

        <p className="text-gray-500 text-sm">
          ৳{product.price}
        </p>
      </div>

    </Link>
  );
}