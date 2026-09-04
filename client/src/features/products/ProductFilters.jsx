import { useState } from "react";

const GENDER_OPTIONS = [
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Unisex", value: "unisex" },
];

const CATEGORY_OPTIONS = [
  { label: "Dresses", value: "dresses" },
  { label: "Tops", value: "tops" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Trousers", value: "trousers" },
  { label: "Knitwear", value: "knitwear" },
  { label: "Accessories", value: "accessories" },
];

const SORT_OPTIONS = [
  { label: "Newest", value: "" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Rating", value: "rating" },
];

export default function ProductFilters({
  searchParams,
  onApply,
  onClose,
}) {
  const [gender, setGender] = useState(
    searchParams.get("gender") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  const [sort, setSort] = useState(
    searchParams.get("sort") || ""
  );

  const handleApply = () => {
    onApply({
      gender,
      category,
      minPrice,
      maxPrice,
      sort,
    });

    onClose();
  };

  const handleClear = () => {
    setGender("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
  };

  return (
    <div className="fixed inset-0 z-100">

      {/* Overlay */}
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
      />

      {/* Panel */}
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-[#FAFAF7] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-black/10">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-neutral-500">
              Refine
            </p>

            <h2 className="mt-1 text-xl font-light tracking-wide">
              Filter & Sort
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[11px] tracking-[0.18em] uppercase text-neutral-500 hover:text-black transition-colors"
          >
            Close
          </button>
        </div>

        {/* Filter Content */}
        <div className="px-6 py-8 space-y-10">

          {/* Gender */}
          <section>
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Gender
            </h3>

            <div className="space-y-3">
              {GENDER_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={gender === option.value}
                    onChange={(e) => setGender(e.target.value)}
                    className="accent-black"
                  />

                  <span className="text-sm text-neutral-800">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Category */}
          <section>
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Category
            </h3>

            <div className="space-y-3">
              {CATEGORY_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    checked={category === option.value}
                    onChange={(e) => setCategory(e.target.value)}
                    className="accent-black"
                  />

                  <span className="text-sm text-neutral-800">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Price */}
          <section>
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Price Range
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border-b border-black/20 bg-transparent px-1 py-3 text-sm outline-none focus:border-black"
              />

              <input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border-b border-black/20 bg-transparent px-1 py-3 text-sm outline-none focus:border-black"
              />
            </div>
          </section>

          {/* Sort */}
          <section>
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Sort By
            </h3>

            <div className="space-y-3">
              {SORT_OPTIONS.map((option) => (
                <label
                  key={option.value || "newest"}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sort === option.value}
                    onChange={(e) => setSort(e.target.value)}
                    className="accent-black"
                  />

                  <span className="text-sm text-neutral-800">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#FAFAF7] border-t border-black/10 px-6 py-5 flex items-center gap-4">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 border border-black/15 py-3.5 text-[10px] tracking-[0.2em] uppercase hover:border-black transition-colors"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="flex-1 bg-black text-white py-3.5 text-[10px] tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors"
          >
            Apply
          </button>
        </div>

      </aside>
    </div>
  );
}