export default function ProductVariants({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
}) {
  const hasSizes = product?.sizes?.length > 0;
  const hasColors = product?.colors?.length > 0;

  if (!hasSizes && !hasColors) {
    return null;
  }

  return (
    <div className="mt-8 border-t border-black/10 pt-8">
      {hasSizes && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-500">
              Select Size
            </span>

            {selectedSize && (
              <span className="text-[11px] text-neutral-700">
                {selectedSize}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={isSelected}
                  className={`
                    min-w-14
                    h-11
                    px-4
                    border
                    text-[11px]
                    tracking-[0.12em]
                    uppercase
                    transition-all
                    ${
                      isSelected
                        ? "border-black bg-black text-white"
                        : "border-black/15 text-neutral-700 hover:border-black"
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hasColors && (
        <div className={hasSizes ? "mt-8" : ""}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-500">
              Select Color
            </span>

            {selectedColor && (
              <span className="text-[11px] capitalize text-neutral-700">
                {selectedColor}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => {
              const isSelected = selectedColor === color;

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  aria-pressed={isSelected}
                  className={`
                    px-5
                    h-11
                    border
                    text-[11px]
                    tracking-[0.08em]
                    capitalize
                    transition-all
                    ${
                      isSelected
                        ? "border-black bg-black text-white"
                        : "border-black/15 text-neutral-700 hover:border-black"
                    }
                  `}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}