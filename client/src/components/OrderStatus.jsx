const OrderStatus = ({ status }) => {
  const statusStyles = {
    pending: "bg-gray-100 text-gray-700",
    confirmed: "bg-blue-50 text-blue-700",
    processing: "bg-yellow-50 text-yellow-700",
    shipped: "bg-purple-50 text-purple-700",
    delivered: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-700",
  };

  const style =
    statusStyles[status] || "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex px-2.5 py-1 text-xs font-medium capitalize ${style}`}
    >
      {status}
    </span>
  );
};

export default OrderStatus;