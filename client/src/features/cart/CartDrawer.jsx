import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CartDrawer({ open, onClose }) {
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close cart"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/20
            backdrop-blur-[2px]
          "
        />
      )}

      {/* Drawer */}
      <aside
        aria-hidden={!open}
        className={`
          fixed
          top-0
          right-0
          z-50
          h-full
          w-full
          max-w-md
          bg-[#FAFAF7]
          shadow-2xl
          flex
          flex-col
          transition-transform
          duration-500
          ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-black/10">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
              Your Bag
            </p>

            <h2 className="mt-1 text-lg font-light text-neutral-900">
              Shopping Bag
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="
              w-10
              h-10
              flex
              items-center
              justify-center
              text-xl
              font-light
              text-neutral-500
              hover:text-black
              transition-colors
            "
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {cartItems.length === 0 ? (
            <div className="min-h-full flex items-center justify-center text-center">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                  Your Bag
                </p>

                <h3 className="mt-3 text-2xl font-light text-neutral-900">
                  Your bag is empty
                </h3>

                <Link
                  to="/products"
                  onClick={onClose}
                  className="
                    inline-flex
                    mt-7
                    text-[10px]
                    tracking-[0.18em]
                    uppercase
                    text-neutral-900
                    border-b
                    border-black
                    pb-1
                  "
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-6 space-y-6">
              {cartItems.map((item) => (
                <article
                  key={item.cartItemId}
                  className="flex gap-4"
                >
                  {/* Image */}
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={onClose}
                    className="
                      w-24
                      aspect-3/4
                      shrink-0
                      overflow-hidden
                      bg-neutral-100
                    "
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={onClose}
                        className="
                          text-sm
                          font-light
                          text-neutral-900
                          hover:opacity-60
                          transition-opacity
                        "
                      >
                        {item.title}
                      </Link>

                      <p className="text-sm text-neutral-900 whitespace-nowrap">
                        ${item.price?.toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-3 space-y-1">
                      {item.selectedSize && (
                        <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-400">
                          Size:{" "}
                          <span className="text-neutral-700">
                            {item.selectedSize}
                          </span>
                        </p>
                      )}

                      {item.selectedColor && (
                        <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-400">
                          Color:{" "}
                          <span className="text-neutral-700 capitalize">
                            {item.selectedColor}
                          </span>
                        </p>
                      )}

                      <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-400">
                        Qty:{" "}
                        <span className="text-neutral-700">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-black/10 px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400">
                {cartCount} {cartCount === 1 ? "Item" : "Items"}
              </span>

              <span className="text-lg font-light text-neutral-900">
                ${subtotal.toLocaleString()}
              </span>
            </div>

            <p className="mt-3 text-[10px] leading-5 text-neutral-400">
              Shipping and taxes will be calculated at checkout.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link
                to="/cart"
                onClick={onClose}
                className="
                  h-12
                  flex
                  items-center
                  justify-center
                  border
                  border-black
                  text-[10px]
                  tracking-[0.18em]
                  uppercase
                  text-neutral-900
                  hover:bg-black
                  hover:text-white
                  transition-colors
                "
              >
                View Bag
              </Link>

              <button
                type="button"
                className="
                  h-12
                  flex
                  items-center
                  justify-center
                  bg-black
                  text-white
                  text-[10px]
                  tracking-[0.18em]
                  uppercase
                  hover:bg-neutral-800
                  transition-colors
                "
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}