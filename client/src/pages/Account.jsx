import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  updateUserProfile,
  updateUserPassword,
} from "../features/auth/authThunks";

const Account = () => {
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");

    const result = await dispatch(
      updateUserProfile({
        name,
        email,
      }),
    );

    if (updateUserProfile.fulfilled.match(result)) {
      setSuccessMessage("Profile updated successfully.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    setPasswordSuccess("");
    setPasswordError("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    const result = await dispatch(
      updateUserPassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }),
    );

    if (updateUserPassword.fulfilled.match(result)) {
      setPasswordSuccess("Password updated successfully.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setPasswordError(result.payload || "Failed to update password.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-5 py-12 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[--text-secondary]">
          My Account
        </p>

        <h1 className="text-3xl font-light tracking-tight text-[--text-primary] md:text-4xl">
          Account
        </h1>

        <nav
          aria-label="Account navigation"
          className="mt-8 flex gap-6 border-b border-black/10 overflow-x-auto"
        >
          <Link
            to="/account"
            className="border-b-2 border-[--text-primary] pb-3 text-xs uppercase tracking-[0.15em] text-[--text-primary] whitespace-nowrap"
          >
            Profile
          </Link>

          <Link
            to="/addresses"
            className="pb-3 text-xs uppercase tracking-[0.15em] text-[--text-secondary] whitespace-nowrap transition-colors hover:text-[--text-primary]"
          >
            Addresses
          </Link>

          <Link
            to="/my-orders"
            className="pb-3 text-xs uppercase tracking-[0.15em] text-[--text-secondary] whitespace-nowrap transition-colors hover:text-[--text-primary]"
          >
            My Orders
          </Link>
        </nav>

        <div className="mt-10 border border-black/10 bg-white p-6 md:p-8">
          <h2 className="text-lg font-medium text-[--text-primary]">Profile</h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs uppercase tracking-wider text-[--text-secondary]"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSuccessMessage("");
                }}
                className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs uppercase tracking-wider text-[--text-secondary]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSuccessMessage("");
                }}
                className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
                required
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {successMessage && (
              <p className="text-sm text-green-700">{successMessage}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 mx-auto max-w-5xl border border-black/10 bg-white p-6 md:p-8">
        <h2 className="text-lg font-medium text-[--text-primary]">
          Change Password
        </h2>

        <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-2 block text-xs uppercase tracking-wider text-[--text-secondary]"
            >
              Current Password
            </label>

            <input
              id="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => {
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                });
                setPasswordError("");
                setPasswordSuccess("");
              }}
              className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
              required
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-xs uppercase tracking-wider text-[--text-secondary]"
            >
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => {
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                });
                setPasswordError("");
                setPasswordSuccess("");
              }}
              minLength={6}
              className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-xs uppercase tracking-wider text-[--text-secondary]"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => {
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                });
                setPasswordError("");
                setPasswordSuccess("");
              }}
              minLength={6}
              className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
              required
            />
          </div>

          {passwordError && (
            <p className="text-sm text-red-600">{passwordError}</p>
          )}

          {passwordSuccess && (
            <p className="text-sm text-green-700">{passwordSuccess}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Account;
