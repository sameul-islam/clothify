import { useState } from "react";
import Logo from "../../assets/logo (1).png";
import { useSelector, useDispatch } from "react-redux";

import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
  FiMenu,
} from "react-icons/fi";

import IconBtn from "./IconBtn";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";
import MobileDrawer from "./MobileDrawer";

import CartDrawer from "../../features/cart/CartDrawer";

import { logout } from "../../features/auth/authSlice";

import { NAV_ITEMS, SECONDARY_LINKS, ANNOUNCEMENT_TEXT } from "./navbarData";
import { Link } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();

  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  const [activeSecondary, setActiveSecondary] = useState("All");

  // cart logic
  const cartItems = useSelector((state) => state.cart.items);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const wishCount = 3;

  const handleLogout = () => {
    localStorage.removeItem("sepy-token");
    dispatch(logout());
  };

  return (
    <>
      {/* Announcement Bar */}

      <div
        className="
          bg-[--text-primary]
          text-center
          text-[11px]
          tracking-[0.15em]
          py-2.5
          px-4
        "
      >
        {ANNOUNCEMENT_TEXT}
      </div>

      {/* Navbar */}

      <header
        className="
          bg-[#FAFAF7]
          border-b
          border-black/10
          sticky
          top-0
          z-100
        "
      >
        <nav
          className="
            flex
            items-center
            justify-between
            px-10
            h-15
            md:h-17
            gap-6
            max-md:px-5
          "
        >
          {/* LEFT */}

          <div
            className="
              flex
              items-center
              gap-8
              flex-1
              max-lg:hidden
            "
          >
            {NAV_ITEMS.map((item) =>
              item.mega ? (
                <div key={item.label} className="relative group">
                  <Link
                    to="/"
                    className="
                      relative
                      text-[12px]
                      tracking-widest
                      uppercase
                      text-[--text-primary]
                      pb-0.5
                      after:absolute
                      after:-bottom-px
                      after:left-0
                      after:h-px
                      after:w-0
                      after:bg-[--text-primary]
                      after:transition-all
                      after:duration-300
                      hover:after:w-full
                    "
                  >
                    {item.label}

                    {item.badge && (
                      <span
                        className="
                          absolute
                          -top-2
                          -right-4
                          text-[8px]
                          bg-[#C5A882]
                          text-white
                          px-1
                          py-px
                          rounded-xs
                          tracking-wider
                          font-semibold
                        "
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  <MegaMenu columns={item.mega} />
                </div>
              ) : (
                <Link
                  key={item.label}
                  to="/"
                  className="
                    relative
                    text-[12px]
                    tracking-widest
                    uppercase
                    text-[--text-primary]
                    pb-0.5
                    after:absolute
                    after:-bottom-px
                    after:left-0
                    after:h-px
                    after:w-0
                    after:bg-[--text-primary]
                    after:transition-all
                    after:duration-300
                    hover:after:w-full
                  "
                >
                  {item.label}

                  {item.badge && (
                    <span
                      className="
                        absolute
                        -top-2
                        -right-4
                        text-[8px]
                        bg-[#C5A882]
                        text-white
                        px-1
                        py-px
                        rounded-xs
                        tracking-wider
                        font-semibold
                      "
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ),
            )}
          </div>

          {/* LOGO */}

          <Link to="/">
            <img
              src={Logo}
              alt="logo"
              className=" max-h-6 md:max-h-7 cursor-pointer"
            />
          </Link>

          {/* RIGHT */}

          <div
            className="
              flex
              items-center
              gap-5
              flex-1
              justify-end
            "
          >
            {/* Search */}

            <IconBtn label="Search" onClick={() => setSearchOpen(true)}>
              <FiSearch size={18} />
            </IconBtn>

            <div
              className="
                w-px
                h-4.5
                bg-black/10
                max-lg:hidden
              "
            />

            {/* Account */}

            <Link
              to={isAuthenticated ? "/my-orders" : "/login"}
              aria-label={isAuthenticated ? "My Orders" : "Login"}
              className="flex items-center justify-center"
            >
              <FiUser size={18} />
            </Link>

            {/* Wishlist */}

            <IconBtn label="Wishlist" className="max-lg:hidden">
              <FiHeart size={18} />

              {wishCount > 0 && (
                <span
                  className="
                    absolute
                    top-0.5
                    right-0.5
                    w-4
                    h-4
                    bg-[#C5A882]
                    text-white
                    text-[9px]
                    font-semibold
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {wishCount}
                </span>
              )}
            </IconBtn>

            {/* Cart */}

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[--text-primary] transition-colors duration-200 hover:bg-black/5"
            >
              <FiShoppingBag />

              {cartCount > 0 && (
                <span
                  className="
        absolute
        -top-1
        -right-1
        min-w-4
        h-4
        px-1
        rounded-full
        bg-black
        text-white
        text-[9px]
        flex
        items-center
        justify-center
        leading-none
      "
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu */}

            <IconBtn
              label="Menu"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden"
            >
              <FiMenu size={20} />
            </IconBtn>
          </div>
        </nav>

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

        {/* Secondary Category Bar */}

        <div
          role="navigation"
          aria-label="Category Filter"
          className="
            flex
            items-center
            justify-center
            gap-10
            h-11
            border-t
            border-black/8
            overflow-x-auto
            scrollbar-none
            max-md:justify-start
            max-md:px-5
          "
        >
          {SECONDARY_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => setActiveSecondary(link)}
              className={`
                text-[11px]
                tracking-[0.12em]
                uppercase
                cursor-pointer
                hover:text-[#C5A882]
                whitespace-nowrap
                transition-colors
                duration-200
                relative
                pb-px

                ${
                  activeSecondary === link
                    ? `
                      text-[--text-primary]
                      after:absolute
                      after:-bottom-2.75
                      after:left-0
                      after:right-0
                      after:h-[1.5px]
                      after:bg-[--text-primary]
                    `
                    : `
                      text-[--text-secondary]
                      hover:text-[--text-primary]
                    `
                }
              `}
            >
              {link}
            </button>
          ))}
        </div>
      </header>

      {/* Search Overlay */}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer */}

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        wishCount={wishCount}
      />
    </>
  );
}
