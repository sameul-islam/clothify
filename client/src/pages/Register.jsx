import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../features/auth/authThunks";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resultAction = await dispatch(register(formData));

    if (register.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  return (
    <main className="min-h-[calc(100vh-180px)] bg-[#FAFAF7] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        {/* Heading */}

        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C5A882] mb-3">
            Join SEPY
          </p>

          <h1 className="font-serif text-4xl text-[--text-primary]">
            Create Account
          </h1>

          <p className="mt-3 text-sm text-[--text-secondary]">
            Create your account to continue with SEPY.
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}

          <div>
            <label
              htmlFor="name"
              className="block text-[11px] tracking-[0.15em] uppercase mb-2"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
              className="
                w-full
                border-b
                border-black/20
                bg-transparent
                px-0
                py-3
                text-sm
                outline-none
                transition-colors
                focus:border-[#C5A882]
              "
              placeholder="Your name"
            />
          </div>

          {/* Email */}

          <div>
            <label
              htmlFor="email"
              className="block text-[11px] tracking-[0.15em] uppercase mb-2"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="
                w-full
                border-b
                border-black/20
                bg-transparent
                px-0
                py-3
                text-sm
                outline-none
                transition-colors
                focus:border-[#C5A882]
              "
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}

          <div>
            <label
              htmlFor="password"
              className="block text-[11px] tracking-[0.15em] uppercase mb-2"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              className="
                w-full
                border-b
                border-black/20
                bg-transparent
                px-0
                py-3
                text-sm
                outline-none
                transition-colors
                focus:border-[#C5A882]
              "
              placeholder="Create a password"
            />
          </div>

          {/* Error */}

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-[--text-primary]
              text-gray-800
              py-3.5
              text-[11px]
              tracking-[0.2em]
              uppercase
              transition-opacity
              duration-200
              hover:opacity-90
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}

        <p className="text-center text-sm text-[--text-secondary] mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[--text-primary] underline underline-offset-4 hover:text-[#C5A882] transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;