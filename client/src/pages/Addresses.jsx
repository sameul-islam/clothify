import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAddresses,
  addAddress,
  editAddress,
  removeAddress,
  makeDefaultAddress,
} from "../features/addresses/addressThunks";

const initialFormData = {
  label: "",
  recipientName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  area: "",
  city: "",
  postalCode: "",
  country: "Bangladesh",
};

export default function Addresses() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.addresses,
  );

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setFormErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.label.trim()) {
      newErrors.label = "Label is required";
    }

    if (!formData.recipientName.trim()) {
      newErrors.recipientName = "Recipient name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address is required";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setFormErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingId) {
      const resultAction = await dispatch(
        editAddress({
          id: editingId,
          addressData: formData,
        }),
      );

      if (editAddress.fulfilled.match(resultAction)) {
        resetForm();

        // Backend is the source of truth.
        dispatch(getAddresses());
      }

      return;
    }

    const resultAction = await dispatch(addAddress(formData));

    if (addAddress.fulfilled.match(resultAction)) {
      resetForm();
    }
  };

  const handleEdit = (address) => {
    setEditingId(address._id);

    setFormData({
      label: address.label || "",
      recipientName: address.recipientName || "",
      phone: address.phone || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      area: address.area || "",
      city: address.city || "",
      postalCode: address.postalCode || "",
      country: address.country || "Bangladesh",
    });

    setFormErrors({});
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) {
      return;
    }

    const resultAction = await dispatch(removeAddress(id));

    if (removeAddress.fulfilled.match(resultAction)) {
      // Important:
      // If the deleted address was the default,
      // backend may automatically choose another default.
      // So refresh from backend.
      dispatch(getAddresses());
    }
  };

  const handleSetDefault = async (id) => {
    const resultAction = await dispatch(makeDefaultAddress(id));

    if (makeDefaultAddress.fulfilled.match(resultAction)) {
      // Redux already updates the UI,
      // so no extra request is necessary.
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF7] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-5 md:px-10">

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
            Account
          </p>

          <div className="flex items-end justify-between gap-5">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
              My Addresses
            </h1>

            <button
              type="button"
              onClick={() => {
                if (showForm) {
                  resetForm();
                } else {
                  setShowForm(true);
                }
              }}
              className="border border-black px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-neutral-900 hover:bg-black hover:text-white transition-colors"
            >
              {showForm ? "Cancel" : "+ Add Address"}
            </button>
          </div>
        </div>

        {/* Address Form */}
        {showForm && (
          <section className="mb-10 border border-black/10 bg-white/30 p-6 md:p-8">
            <div className="border-b border-black/10 pb-5">
              <h2 className="text-[11px] uppercase tracking-[0.18em] text-neutral-900">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-6"
            >
              {/* Label */}
              <div>
                <label
                  htmlFor="label"
                  className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                >
                  Address Label
                </label>

                <input
                  id="label"
                  name="label"
                  type="text"
                  placeholder="Home"
                  value={formData.label}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 border bg-transparent text-sm outline-none ${
                    formErrors.label
                      ? "border-red-500"
                      : "border-black/15 focus:border-black"
                  }`}
                />

                {formErrors.label && (
                  <p className="mt-2 text-xs text-red-500">
                    {formErrors.label}
                  </p>
                )}
              </div>

              {/* Recipient + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="recipientName"
                    className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                  >
                    Recipient Name
                  </label>

                  <input
                    id="recipientName"
                    name="recipientName"
                    type="text"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className={`w-full h-12 px-4 border bg-transparent text-sm outline-none ${
                      formErrors.recipientName
                        ? "border-red-500"
                        : "border-black/15 focus:border-black"
                    }`}
                  />

                  {formErrors.recipientName && (
                    <p className="mt-2 text-xs text-red-500">
                      {formErrors.recipientName}
                    </p>
                  )}
                </div>

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
                    className={`w-full h-12 px-4 border bg-transparent text-sm outline-none ${
                      formErrors.phone
                        ? "border-red-500"
                        : "border-black/15 focus:border-black"
                    }`}
                  />

                  {formErrors.phone && (
                    <p className="mt-2 text-xs text-red-500">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Line 1 */}
              <div>
                <label
                  htmlFor="addressLine1"
                  className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                >
                  Address
                </label>

                <input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 border bg-transparent text-sm outline-none ${
                    formErrors.addressLine1
                      ? "border-red-500"
                      : "border-black/15 focus:border-black"
                  }`}
                />

                {formErrors.addressLine1 && (
                  <p className="mt-2 text-xs text-red-500">
                    {formErrors.addressLine1}
                  </p>
                )}
              </div>

              {/* Address Line 2 */}
              <div>
                <label
                  htmlFor="addressLine2"
                  className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                >
                  Apartment / Floor / Additional Details
                </label>

                <input
                  id="addressLine2"
                  name="addressLine2"
                  type="text"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-black/15 bg-transparent text-sm outline-none focus:border-black"
                />
              </div>

              {/* Area + City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="area"
                    className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                  >
                    Area
                  </label>

                  <input
                    id="area"
                    name="area"
                    type="text"
                    value={formData.area}
                    onChange={handleChange}
                    className={`w-full h-12 px-4 border bg-transparent text-sm outline-none ${
                      formErrors.area
                        ? "border-red-500"
                        : "border-black/15 focus:border-black"
                    }`}
                  />

                  {formErrors.area && (
                    <p className="mt-2 text-xs text-red-500">
                      {formErrors.area}
                    </p>
                  )}
                </div>

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
                    className={`w-full h-12 px-4 border bg-transparent text-sm outline-none ${
                      formErrors.city
                        ? "border-red-500"
                        : "border-black/15 focus:border-black"
                    }`}
                  />

                  {formErrors.city && (
                    <p className="mt-2 text-xs text-red-500">
                      {formErrors.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Postal + Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    className="w-full h-12 px-4 border border-black/15 bg-transparent text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3"
                  >
                    Country
                  </label>

                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border border-black/15 bg-transparent text-sm outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 text-sm font-medium text-white transition-colors ${
                  loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {loading
                  ? editingId
                    ? "Updating Address..."
                    : "Saving Address..."
                  : editingId
                    ? "Update Address"
                    : "Save Address"}
              </button>
            </form>
          </section>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-4 py-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && items.length === 0 && (
          <p className="text-sm text-neutral-500">
            Loading addresses...
          </p>
        )}

        {/* Empty State */}
        {!loading && !error && items.length === 0 && !showForm && (
          <div className="border border-black/10 p-8 text-center">
            <p className="text-sm text-neutral-500">
              You have no saved addresses yet.
            </p>
          </div>
        )}

        {/* Address List */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items.map((address) => (
              <div
                key={address._id}
                className="border border-black/10 bg-white/30 p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                      {address.label}
                    </p>

                    <h2 className="mt-2 text-sm font-medium text-neutral-900">
                      {address.recipientName}
                    </h2>
                  </div>

                  {address.isDefault && (
                    <span className="text-[9px] uppercase tracking-[0.15em] border border-black px-2 py-1">
                      Default
                    </span>
                  )}
                </div>

                {/* Address Details */}
                <div className="mt-5 space-y-1 text-sm text-neutral-600">
                  <p>{address.phone}</p>

                  <p>{address.addressLine1}</p>

                  {address.addressLine2 && (
                    <p>{address.addressLine2}</p>
                  )}

                  <p>
                    {address.area}, {address.city}
                  </p>

                  {address.postalCode && (
                    <p>{address.postalCode}</p>
                  )}

                  <p>{address.country}</p>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-5 border-t border-black/10 flex items-center gap-5">
                  <button
                    type="button"
                    onClick={() => handleEdit(address)}
                    className="text-[10px] uppercase tracking-[0.15em] text-neutral-900 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(address._id)}
                    disabled={loading}
                    className="text-[10px] uppercase tracking-[0.15em] text-red-600 hover:underline disabled:opacity-50"
                  >
                    Delete
                  </button>

                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(address._id)}
                      disabled={loading}
                      className="ml-auto text-[10px] uppercase tracking-[0.15em] text-neutral-900 hover:underline disabled:opacity-50"
                    >
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}