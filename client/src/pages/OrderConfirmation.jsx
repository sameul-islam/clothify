import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSingleOrder } from "../services/orderApi";

const OrderConfirmation = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchSingleOrder(id);

        if (!data.success) {
          throw new Error(data.message || "Failed to load order");
        }

        setOrder(data.order);
      } catch (error) {
        console.error("Order fetch failed:", error);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load your order.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black" />

          <p className="mt-4 text-sm text-gray-500">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Order not found
          </h1>

          <p className="mt-2 text-gray-500">
            {error || "We couldn't find your order."}
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-black px-6 py-3 text-sm text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-white px-6 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Success */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <span className="text-2xl text-green-600">✓</span>
          </div>

          <h1 className="mt-6 text-3xl font-semibold text-gray-900">
            Order Confirmed
          </h1>

          <p className="mt-3 text-gray-500">
            Thank you for your order. Your order has been placed successfully.
          </p>

          <div className="mt-5 space-y-1">
            <p className="text-sm text-gray-500">
              Order ID:{" "}
              <span className="font-medium text-gray-900">{order._id}</span>
            </p>

            <p className="text-sm text-gray-500">
              Order Date:{" "}
              <span className="font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleDateString("en-BD", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border border-gray-200 px-5 py-5">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Order Status
            </p>

            <p className="mt-2 text-sm font-medium capitalize text-gray-900">
              {order.status}
            </p>
          </div>

          <div className="border border-gray-200 px-5 py-5">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Payment Status
            </p>

            <p className="mt-2 text-sm font-medium capitalize text-gray-900">
              {order.paymentStatus}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-12 border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {order.items?.map((item) => (
              <div
                key={`${item.product}-${item.selectedSize}-${item.selectedColor}`}
                className="flex gap-4 px-6 py-5"
              >
                <div className="h-24 w-20 shrink-0 overflow-hidden bg-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.title}
                  </h3>

                  {item.selectedSize && (
                    <p className="mt-1 text-sm text-gray-500">
                      Size: {item.selectedSize}
                    </p>
                  )}

                  {item.selectedColor && (
                    <p className="text-sm text-gray-500">
                      Color: {item.selectedColor}
                    </p>
                  )}

                  <p className="mt-2 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="text-sm font-medium text-gray-900">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="border-t border-gray-200 px-6 py-6">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>

              <span>৳{order.pricing?.subtotal?.toLocaleString()}</span>
            </div>

            <div className="mt-3 flex justify-between text-sm text-gray-600">
              <span>Shipping</span>

              <span>
                {order.pricing?.shipping === 0
                  ? "Free"
                  : `৳${order.pricing?.shipping?.toLocaleString()}`}
              </span>
            </div>

            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-semibold text-gray-900">
              <span>Total</span>

              <span>৳{order.pricing?.total?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mt-8 border border-gray-200 px-6 py-6">
          <h2 className="text-lg font-medium text-gray-900">
            Delivery Information
          </h2>

          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p>{order.customer?.name}</p>
            <p>{order.customer?.phone}</p>
            <p>{order.customer?.email}</p>
            <p>{order.customer?.address}</p>
            <p>
              {order.customer?.city}, {order.customer?.postalCode}
            </p>
            <p>{order.customer?.country}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="mt-8 border border-gray-200 px-6 py-6">
          <h2 className="text-lg font-medium text-gray-900">Payment</h2>

          <p className="mt-3 text-sm text-gray-600">
            Method:{" "}
            <span className="font-medium uppercase">{order.paymentMethod}</span>
          </p>

          <p className="mt-1 text-sm text-gray-600">
            Payment Status:{" "}
            <span className="font-medium capitalize">
              {order.paymentStatus}
            </span>
          </p>

          {order.paymentMethod === "cod" && (
            <p className="mt-3 text-sm text-gray-500">
              You will pay when your order is delivered.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/products"
            className="bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
