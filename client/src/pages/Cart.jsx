import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { removeFromCart, updateCartQuantity } from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] pt-28 md:pt-36">
        <div className="max-w-400 mx-auto px-5 md:px-10">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                Your Bag
              </p>

              <h1 className="mt-4 text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
                Your bag is empty
              </h1>

              <p className="mt-4 text-sm text-neutral-500">
                Discover something you love from our collection.
              </p>

              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  justify-center
                  mt-8
                  h-12
                  px-8
                  bg-black
                  text-white
                  text-[10px]
                  tracking-[0.2em]
                  uppercase
                  hover:bg-neutral-800
                  transition-colors
                "
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] pt-28 md:pt-36 pb-20">
      <div className="max-w-400 mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="border-b border-black/10 pb-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
            Your Bag
          </p>

          <div className="mt-3 flex items-end justify-between gap-4">
            <h1 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900">
              Shopping Bag
            </h1>

            <p className="text-xs text-neutral-500">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {/* Cart */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20">
          {/* Items */}
          <div>
            <div className="space-y-8">
              {cartItems.map((item) => (
                <article
                  key={item.cartItemId}
                  className="
                    grid
                    grid-cols-[100px_1fr]
                    md:grid-cols-[140px_1fr]
                    gap-5
                    pb-8
                    border-b
                    border-black/10
                  "
                >
                  {/* Image */}
                  <Link
                    to={`/product/${item.slug}`}
                    className="block aspect-3/4 overflow-hidden bg-neutral-100"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        hover:scale-[1.02]
                      "
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">
                          Product
                        </p>

                        <Link
                          to={`/product/${item.slug}`}
                          className="
                            block
                            mt-2
                            text-base
                            md:text-lg
                            font-light
                            text-neutral-900
                            hover:opacity-60
                            transition-opacity
                          "
                        >
                          {item.title}
                        </Link>
                      </div>

                      <p className="text-sm text-neutral-900 whitespace-nowrap">
                        ${item.price?.toLocaleString()}
                      </p>
                    </div>

                    {/* Variants */}
                    <div className="mt-5 space-y-2">
                      {item.selectedSize && (
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] tracking-[0.16em] uppercase text-neutral-400">
                            Size
                          </span>

                          <span className="text-xs text-neutral-700">
                            {item.selectedSize}
                          </span>
                        </div>
                      )}

                      {item.selectedColor && (
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] tracking-[0.16em] uppercase text-neutral-400">
                            Color
                          </span>

                          <span className="text-xs capitalize text-neutral-700">
                            {item.selectedColor}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] tracking-[0.16em] uppercase text-neutral-400 mb-3">
                          Quantity
                        </p>

                        <div className="flex items-center w-fit border border-black/15">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateCartQuantity({
                                  cartItemId: item.cartItemId,
                                  quantity: item.quantity - 1,
                                }),
                              )
                            }
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity of ${item.title}`}
                            className="
          w-10
          h-10
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
          w-11
          h-10
          flex
          items-center
          justify-center
          text-xs
          text-neutral-900
          border-x
          border-black/10
        "
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateCartQuantity({
                                  cartItemId: item.cartItemId,
                                  quantity: item.quantity + 1,
                                }),
                              )
                            }
                            aria-label={`Increase quantity of ${item.title}`}
                            className="
          w-10
          h-10
          flex
          items-center
          justify-center
          text-lg
          font-light
          text-neutral-700
          hover:bg-neutral-50
          transition-colors
        "
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          dispatch(removeFromCart(item.cartItemId))
                        }
                        className="
      self-end
      text-[10px]
      tracking-[0.16em]
      uppercase
      text-neutral-400
      hover:text-black
      transition-colors
    "
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-32 h-fit">
            <div className="border-t border-black/10 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">
                  Items
                </span>

                <span className="text-sm text-neutral-700">{cartCount}</span>
              </div>

              <div className="flex items-center justify-between mt-5">
                <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">
                  Subtotal
                </span>

                <span className="text-lg font-light text-neutral-900">
                  $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    )
                    .toLocaleString()}
                </span>
              </div>

              <p className="mt-4 text-[11px] leading-5 text-neutral-400">
                Shipping and taxes will be calculated at checkout.
              </p>

              <button
                type="button"
                className="
                  mt-8
                  w-full
                  h-14
                  bg-black
                  text-white
                  text-[10px]
                  tracking-[0.2em]
                  uppercase
                  hover:bg-neutral-800
                  transition-colors
                "
              >
                Checkout
              </button>

              <Link
                to="/products"
                className="
                  block
                  mt-5
                  text-center
                  text-[10px]
                  tracking-[0.18em]
                  uppercase
                  text-neutral-500
                  hover:text-black
                  transition-colors
                "
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
