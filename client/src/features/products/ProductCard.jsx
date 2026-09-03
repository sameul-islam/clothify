import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="group">
      <Link to={`/product/${product.slug}`}>
        {/* Product Image */}
        <div className="relative overflow-hidden bg-neutral-100 aspect-3/4">
          <img
            src={product?.images?.[0]}
            alt={product?.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Second Image */}
          {product?.images?.[1] && (
            <img
              src={product.images[1]}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          {/* Featured Badge */}
          {product?.featured && (
            <span className="absolute top-4 left-4 bg-black text-white text-[10px] uppercase tracking-[0.15em] px-3 py-1">
              Featured
            </span>
          )}

          {/* Sale Badge */}
          {product?.discount > 0 && (
            <span className="absolute top-4 right-4 bg-white text-black text-[10px] uppercase tracking-[0.15em] px-3 py-1">
              Sale
            </span>
          )}
        </div>

        {/* Product Information */}
        <div className="pt-5 pb-2">
          <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 mb-2">
            {product?.category}
          </p>

          <h2 className="text-[15px] text-neutral-900 font-medium mb-2">
            {product?.title}
          </h2>

          <div className="flex items-center gap-3">
            <p className="text-[15px] font-light tracking-wide text-neutral-900">
              ${product?.price?.toLocaleString()}
            </p>

            {product?.discount > 0 && (
              <span className="text-[13px] text-neutral-400 line-through">
                $
                {(
                  product.price /
                  (1 - product.discount / 100)
                ).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}