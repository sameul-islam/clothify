import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSingleProduct } from "../features/products/productThunks";
import ProductGallery from "../features/products/ProductGallery";
import ProductInfo from "../features/products/ProductInfo";
import ProductVariants from "../features/products/ProductVariants";
import ProductPurchase from "../features/products/ProductPurchase";

export default function ProductDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const { product, productLoading, productError } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if (slug) {
      dispatch(getSingleProduct(slug));
    }
  }, [dispatch, slug]);

  // Loading
  if (productLoading) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] pt-28 md:pt-36">
        <div className="max-w-400 mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Skeleton */}
            <div className="aspect-3/4 bg-neutral-100 animate-pulse" />

            {/* Content Skeleton */}
            <div className="py-4 lg:py-12">
              <div className="h-3 w-24 bg-neutral-100 animate-pulse" />
              <div className="mt-5 h-10 w-3/4 bg-neutral-100 animate-pulse" />
              <div className="mt-4 h-5 w-24 bg-neutral-100 animate-pulse" />
              <div className="mt-10 h-20 w-full max-w-xl bg-neutral-100 animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error
  if (productError) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400">
            Product unavailable
          </p>

          <h1 className="mt-4 text-3xl font-light text-neutral-900">
            We couldn't find this product
          </h1>

          <p className="mt-3 text-sm text-neutral-500">{productError}</p>

          <Link
            to="/products"
            className="
              inline-block
              mt-8
              border-b
              border-black
              pb-1
              text-[11px]
              tracking-[0.18em]
              uppercase
              text-neutral-900
            "
          >
            Back to Collection
          </Link>
        </div>
      </main>
    );
  }

  // No product
  if (!product) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-400 mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Gallery */}
            <ProductGallery images={product?.images} title={product?.title} />

            {/* Product Information */}
            <div>
              <ProductInfo product={product} />

              <ProductVariants
                product={product}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />

              <ProductPurchase
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
