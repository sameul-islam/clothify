import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../features/auth/authThunks";
import { setCredentials } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
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

    const resultAction = await dispatch(login(formData));

    if (login.fulfilled.match(resultAction)) {
      const { token, user } = resultAction.payload;

      localStorage.setItem("sepy-token", token);

      dispatch(
        setCredentials({
          token,
          user,
        })
      );

      const redirectTo = location.state?.from || "/";

      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <main className="min-h-[calc(100vh-180px)] bg-[#FAFAF7] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        {/* Heading */}

        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C5A882] mb-3">
            Welcome Back
          </p>

          <h1 className="font-serif text-4xl text-[--text-primary]">
            Sign In
          </h1>

          <p className="mt-3 text-sm text-[--text-secondary]">
            Sign in to continue to your SEPY account.
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              autoComplete="current-password"
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
              placeholder="Enter your password"
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Register */}

        <p className="text-center text-sm text-[--text-secondary] mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[--text-primary] underline underline-offset-4 hover:text-[#C5A882] transition-colors"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;