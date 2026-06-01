import { useState } from "react";

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

import { NAV_ITEMS, SECONDARY_LINKS, ANNOUNCEMENT_TEXT } from "./navbarData";
import { Link, Links } from "react-router-dom";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [activeSecondary, setActiveSecondary] = useState("All");

  // Later connect with Redux
  const cartCount = 2;
  const wishCount = 3;

  return (
    <>
      {/* Announcement Bar */}

      <div
        className="
          bg-[--text-primary]
          text-[--bg]
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
          bg-[--bg]
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
            h-17
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
                <a
                  key={item.label}
                  href="#"
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
                </a>
              ),
            )}
          </div>

          {/* LOGO */}

          <Link
            to="/"
            className="
              font-Cormorant
              text-[26px]
              font-light
              tracking-[0.25em]
              uppercase
              text-[--text-primary]
              shrink-0
              select-none
              max-sm:text-[22px]
              max-sm:tracking-[0.2em]
            "
          >
          SE
            <span className="italic font-normal">PY</span>
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

            <IconBtn label="Account" className="max-lg:hidden">
              <FiUser size={18} />
            </IconBtn>

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

            <IconBtn label="Cart">
              <FiShoppingBag size={18} />

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    top-0.5
                    right-0.5
                    w-4
                    h-4
                    bg-[--text-primary]
                    text-[--bg]
                    text-[9px]
                    font-semibold
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cartCount}
                </span>
              )}
            </IconBtn>

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
