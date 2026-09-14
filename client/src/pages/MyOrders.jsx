import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { fetchMyOrders } from "../services/orderApi";
import OrderStatus from "../components/OrderStatus";

const MyOrders = () => {
  const { isAuthenticated, authInitialized, user } = useSelector(
    (state) => state.auth,
  );

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authInitialized || !isAuthenticated) {
      return;
    }

    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchMyOrders();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch orders.");
        }

        setOrders(data.orders);
      } catch (error) {
        console.error("Orders fetch failed:", error);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load your orders.",
        );

        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [authInitialized, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Account
          </p>

          <h1 className="mt-3 text-3xl font-medium tracking-tight text-black">
            Sign in to view your orders
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Your order history is available after signing in to your SEPY
            account.
          </p>

          <Link
            to="/login"
            className="mt-7 bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Account
            </p>

            <h1 className="mt-2 text-3xl font-medium tracking-tight text-black">
              My Orders
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Welcome back{user?.name ? `, ${user.name}` : ""}. Here you can
              view your order history.
            </p>
          </div>

          <Link
            to="/products"
            className="text-sm font-medium text-black underline underline-offset-4"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Loading */}

        {loading && (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500">Loading your orders...</p>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="mb-8 border border-red-200 bg-red-50 px-4 py-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Empty State */}

        {!loading && !error && orders.length === 0 && (
          <div className="border border-gray-200 px-6 py-12 text-center">
            <h2 className="text-lg font-medium text-black">No orders yet</h2>

            <p className="mt-2 text-sm text-gray-500">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Orders */}

        {!loading && !error && orders.length > 0 && (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-medium text-black">Order History</h2>

              <p className="text-sm text-gray-500">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 p-5 sm:p-6"
                >
                  {/* Order Header */}

                  <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Order
                      </p>

                      <p className="mt-1 break-all text-sm font-medium text-black">
                        #{order._id.slice(-8)}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Date
                      </p>

                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Order Details */}

                  <div className="grid grid-cols-2 gap-4 py-5 sm:grid-cols-4">
                    <div>
                      <p className="text-xs text-gray-500">Status</p>

                      <div className="mt-1">
                        <OrderStatus status={order.status} />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Payment</p>

                      <p className="mt-1 text-sm font-medium capitalize text-black">
                        {order.paymentStatus}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Items</p>

                      <p className="mt-1 text-sm font-medium text-black">
                        {order.items.length}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Total</p>

                      <p className="mt-1 text-sm font-medium text-black">
                        ৳{order.pricing.total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Items Preview */}

                  <div className="border-t border-gray-100 pt-5">
                    <div className="space-y-4">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div
                          key={`${order._id}-${index}`}
                          className="flex items-center gap-4"
                        >
                          <div className="h-16 w-16 shrink-0 overflow-hidden bg-gray-100">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                No image
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            {item.slug ? (
                              <Link
                                to={`/product/${item.slug}`}
                                className="truncate text-sm font-medium text-black transition hover:underline"
                              >
                                {item.title}
                              </Link>
                            ) : (
                              <p className="truncate text-sm font-medium text-black">
                                {item.title}
                              </p>
                            )}

                            <p className="mt-1 text-xs text-gray-500">
                              Qty: {item.quantity}
                              {item.selectedSize &&
                                ` • Size: ${item.selectedSize}`}
                              {item.selectedColor &&
                                ` • Color: ${item.selectedColor}`}
                            </p>
                          </div>

                          <p className="text-sm text-gray-900">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    {order.items.length > 3 && (
                      <p className="mt-4 text-xs text-gray-500">
                        + {order.items.length - 3} more item
                        {order.items.length - 3 > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>

                  {/* Footer */}

                  <div className="mt-5 flex justify-end border-t border-gray-100 pt-5">
                    <Link
                      to={`/order-confirmation/${order._id}`}
                      className="border border-black px-5 py-2.5 text-sm font-medium text-black transition hover:bg-black hover:text-white"
                    >
                      View Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyOrders;
