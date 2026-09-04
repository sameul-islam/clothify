import { useState } from "react";
import { useDispatch } from "react-redux";

import { addToCart } from "../cart/cartSlice";

export default function ProductPurchase({
  product,
  selectedSize,
  selectedColor,
}) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const stock = product?.stock || 0;
  const isInStock = stock > 0;

  const hasSizes = product?.sizes?.length > 0;
  const hasColors = product?.colors?.length > 0;

  const increaseQuantity = () => {
    setQuantity((current) =>
      current < stock ? current + 1 : current
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : current
    );
  };

  const handleAddToBag = () => {
    if (!isInStock) return;

    if (hasSizes && !selectedSize) {
      console.log("Please select a size.");
      return;
    }

    if (hasColors && !selectedColor) {
      console.log("Please select a color.");
      return;
    }

    const cartItem = {
      cartItemId: `${product._id}-${selectedSize || "no-size"}-${
        selectedColor || "no-color"
      }`,

      productId: product._id,
      slug: product.slug,
      title: product.title,
      image: product.images?.[0],
      price: product.price,

      selectedSize: selectedSize || "",
      selectedColor: selectedColor || "",

      quantity,
    };

    dispatch(addToCart(cartItem));

    console.log("Added to Bag:", cartItem);
  };

  return (
    <div className="mt-8">
      {isInStock && (
        <div>
          <p className="text-[10px] tracking-[0.18em] uppercase text-neutral-500 mb-4">
            Quantity
          </p>

          <div className="flex items-center w-fit border border-black/15">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity === 1}
              aria-label="Decrease quantity"
              className="
                w-11
                h-11
                flex
                items-center
                justify-center
                text-lg
                font-light
                text-neutral-700
                disabled:opacity-30
                disabled:cursor-not-allowed
                hover:bg-neutral-50
                transition-colors
              "
            >
              −
            </button>

            <span
              aria-live="polite"
              className="
                w-12
                h-11
                flex
                items-center
                justify-center
                text-sm
                text-neutral-900
                border-x
                border-black/10
              "
            >
              {quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={quantity === stock}
              aria-label="Increase quantity"
              className="
                w-11
                h-11
                flex
                items-center
                justify-center
                text-lg
                font-light
                text-neutral-700
                disabled:opacity-30
                disabled:cursor-not-allowed
                hover:bg-neutral-50
                transition-colors
              "
            >
              +
            </button>
          </div>

          <p className="mt-3 text-[10px] tracking-[0.12em] uppercase text-neutral-400">
            {stock} available
          </p>
        </div>
      )}

      <button
        type="button"
        disabled={!isInStock}
        onClick={handleAddToBag}
        className="
          mt-8
          w-full
          h-14
          flex
          items-center
          justify-center
          text-[11px]
          tracking-[0.2em]
          uppercase
          transition-all
          duration-300
          bg-black
          text-white
          hover:bg-neutral-800
          disabled:bg-neutral-200
          disabled:text-neutral-400
          disabled:cursor-not-allowed
        "
      >
        {isInStock ? "Add to Bag" : "Out of Stock"}
      </button>
    </div>
  );
}