import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../features/products/productThunks";
import { setFilters } from "../features/products/productSlice";

// Components (we will build next)
import ProductToolbar from "../components/products/ProductToolbar";
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import ProductPagination from "../components/products/ProductPagination";

export default function ProductsPage() {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    totalPages,
    currentPage,
    filters,
  } = useSelector((state) => state.products);

  //  Fetch products whenever filters change
  useEffect(() => {
    dispatch(getProducts({
      ...filters,
      page: currentPage,
      limit: 12,
    }));
  }, [dispatch, filters, currentPage]);

  return (
    <section className="w-full bg-white">
      
      {/*  Toolbar (Search, Sort, Count) */}
      <div className="sticky top-0 z-20 bg-white border-b border-black/10">
        <ProductToolbar
          total={products.length}
          loading={loading}
        />
      </div>

      {/*  Main Layout */}
      <div className="max-w-350 mx-auto px-5 md:px-10 py-8 flex gap-8">

        {/*  Sidebar Filters (desktop) */}
        <aside className="hidden lg:block w-65 shrink-0">
          <ProductFilters />
        </aside>

        {/*  Products Section */}
        <div className="flex-1 flex flex-col gap-8">

          {/* Grid */}
          <ProductGrid
            products={products}
            loading={loading}
          />

          {/* Pagination */}
          <ProductPagination
            totalPages={totalPages}
            currentPage={currentPage}
          />

        </div>
      </div>
    </section>
  );
}