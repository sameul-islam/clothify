export default function ProductInfo({ product }) {
  const isOnSale = product?.discount > 0;

  const originalPrice = isOnSale
    ? product.price / (1 - product.discount / 100)
    : null;

  const isInStock = product?.stock > 0;

  return (
    <div className="py-4 lg:py-12">

      {/* Category */}
      <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-500">
        {product?.category}
      </p>

      {/* Title */}
      <h1 className="mt-4 text-3xl md:text-5xl font-light tracking-tight text-neutral-900">
        {product?.title}
      </h1>

      {/* Price */}
      <div className="mt-6 flex items-center gap-3">
        <p className="text-lg font-light tracking-wide text-neutral-900">
          ${product?.price?.toLocaleString()}
        </p>

        {isOnSale && (
          <>
            <p className="text-sm text-neutral-400 line-through">
              ${originalPrice.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>

            <span className="text-[10px] tracking-[0.15em] uppercase text-neutral-500">
              {product.discount}% Off
            </span>
          </>
        )}
      </div>

      {/* Stock */}
      <div className="mt-6">
        {isInStock ? (
          <p className="text-[11px] tracking-[0.16em] uppercase text-neutral-600">
            In Stock
          </p>
        ) : (
          <p className="text-[11px] tracking-[0.16em] uppercase text-neutral-400">
            Out of Stock
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mt-8 border-t border-black/10 pt-8 max-w-xl">
        <p className="text-sm leading-7 text-neutral-500">
          {product?.description}
        </p>
      </div>

      {/* Product Details */}
      <div className="mt-8 border-t border-black/10">

        <div className="flex items-center justify-between py-5 border-b border-black/10">
          <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">
            Gender
          </span>

          <span className="text-xs capitalize text-neutral-700">
            {product?.gender}
          </span>
        </div>

        <div className="flex items-center justify-between py-5 border-b border-black/10">
          <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">
            Category
          </span>

          <span className="text-xs capitalize text-neutral-700">
            {product?.category}
          </span>
        </div>

        <div className="flex items-center justify-between py-5">
          <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">
            Availability
          </span>

          <span className="text-xs text-neutral-700">
            {isInStock
              ? `${product.stock} available`
              : "Currently unavailable"}
          </span>
        </div>

      </div>

    </div>
  );
}