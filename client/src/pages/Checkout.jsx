import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

import { createOrder } from "../services/orderApi";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

  // --------------------------------
  // Handle input changes
  // --------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  // --------------------------------
  // Validate form
  // --------------------------------

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // --------------------------------
  // Continue to order
  // --------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setOrderError("");
    setIsSubmitting(true);

    try {
      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },

        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })),

        paymentMethod,
      };

      console.log("Sending Order:", orderData);

      const data = await createOrder(orderData);

      console.log("Order Response:", data);

      if (data.success) {
        dispatch(clearCart());

        navigate("/order-confirmation", {
          state: {
            order: data.order,
          },
        });
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to place your order. Please try again.";

      console.error("Order creation failed:", message);

      setOrderError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------------
  // Empty cart
  // --------------------------------

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
            Checkout
          </p>

          <h1 className="text-3xl font-light text-neutral-900">
            Your bag is empty
          </h1>

          <p className="mt-4 text-sm text-neutral-500">
            Add something to your bag before continuing to checkout.
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
              uppercase
              tracking-[0.2em]
              hover:bg-neutral-800
              transition-colors
            "
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] pt-28 pb-20 md:pt-36">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

{/* এই অর্ডার এরর আসলে কোন জায়গায় বসাতে হবে সেটা এ আই থেকে জানতে হবে। */}

        {orderError && (
          <div className="mb-6 border border-red-200 bg-red-50 px-4 py-4">
            <p className="text-sm font-medium text-red-700">
              Unable to place your order
            </p>

            <p className="mt-1 text-sm text-red-600">{orderError}</p>
          </div>
        )}

        {/* Page Header */}

        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
            Checkout
          </p>

          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            Complete Your Order
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20">
          {/* Customer Information */}

          <section>
            <div className="border-b border-black/10 pb-5">
              <h2 className="text-[11px] uppercase tracking-[0.18em] text-neutral-900">
                Contact & Shipping Information
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              {/* Name + Email */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`
                      w-full
                      h-12
                      px-4
                      border
                      bg-transparent
                      text-sm
                      outline-none
                      transition-colors
                      ${
                        errors.name
                          ? "border-red-500"
                          : "border-black/15 focus:border-black"
                      }
                    `}
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`
                      w-full
                      h-12
                      px-4
                      border
                      bg-transparent
                      text-sm
                      outline-none
                      transition-colors
                      ${
                        errors.email
                          ? "border-red-500"
                          : "border-black/15 focus:border-black"
                      }
                    `}
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}

              <div>
                <label
                  htmlFor="phone"
                  className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`
                    w-full
                    h-12
                    px-4
                    border
                    bg-transparent
                    text-sm
                    outline-none
                    transition-colors
                    ${
                      errors.phone
                        ? "border-red-500"
                        : "border-black/15 focus:border-black"
                    }
                  `}
                />

                {errors.phone && (
                  <p className="mt-2 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Address */}

              <div>
                <label
                  htmlFor="address"
                  className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                >
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  className={`
                    w-full
                    px-4
                    py-4
                    border
                    bg-transparent
                    text-sm
                    outline-none
                    resize-none
                    transition-colors
                    ${
                      errors.address
                        ? "border-red-500"
                        : "border-black/15 focus:border-black"
                    }
                  `}
                />

                {errors.address && (
                  <p className="mt-2 text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              {/* City + Postal Code */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    className={`
                      w-full
                      h-12
                      px-4
                      border
                      bg-transparent
                      text-sm
                      outline-none
                      transition-colors
                      ${
                        errors.city
                          ? "border-red-500"
                          : "border-black/15 focus:border-black"
                      }
                    `}
                  />

                  {errors.city && (
                    <p className="mt-2 text-xs text-red-500">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                  >
                    Postal Code
                  </label>

                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`
                      w-full
                      h-12
                      px-4
                      border
                      bg-transparent
                      text-sm
                      outline-none
                      transition-colors
                      ${
                        errors.postalCode
                          ? "border-red-500"
                          : "border-black/15 focus:border-black"
                      }
                    `}
                  />

                  {errors.postalCode && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Method */}

              <div className="pt-2">
                <div className="border-b border-black/10 pb-5">
                  <h2 className="text-[11px] uppercase tracking-[0.18em] text-neutral-900">
                    Payment Method
                  </h2>
                </div>

                <div className="mt-6">
                  <label
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      p-5
                      border
                      border-black
                      cursor-pointer
                      bg-white/30
                    "
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(event) =>
                          setPaymentMethod(event.target.value)
                        }
                        className="w-4 h-4 accent-black"
                      />

                      <div>
                        <p className="text-sm text-neutral-900">
                          Cash on Delivery
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                          Pay when your order arrives
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                      COD
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-sm font-medium text-white transition ${
                  isSubmitting
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {isSubmitting ? "Processing Order..." : "Continue to Order"}
              </button>
            </form>
          </section>

          {/* Order Summary */}

          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="border border-black/10 p-6 md:p-8">
              <h2 className="text-[11px] uppercase tracking-[0.18em] text-neutral-900">
                Order Summary
              </h2>

              <div className="mt-7 space-y-5">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4">
                    <div className="w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm text-neutral-900">{item.title}</h3>

                      {(item.selectedSize || item.selectedColor) && (
                        <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                          {item.selectedSize && item.selectedColor && " · "}
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[11px] text-neutral-500">
                          Qty {item.quantity}
                        </span>

                        <span className="text-sm text-neutral-900">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-black/10 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>

                  <span className="text-neutral-900">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Shipping</span>

                  <span className="text-neutral-900">
                    {shipping === 0 ? "Free" : `$${shipping.toLocaleString()}`}
                  </span>
                </div>

                <div className="pt-4 border-t border-black/10 flex justify-between">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-900">
                    Total
                  </span>

                  <span className="text-lg text-neutral-900">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
