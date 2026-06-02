import { useEffect, useState } from "react";

import { FiSearch, FiX, FiChevronRight, FiUser, FiHeart } from "react-icons/fi";

import { DRAWER_ITEMS } from "./navbarData";
import { Link } from "react-router-dom";

export default function MobileDrawer({ open, onClose, wishCount }) {
  const [openSub, setOpenSub] = useState(null);

  // Lock Body Scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleSub = (label) => {
    setOpenSub((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-300
          backdrop-blur-xs
          bg-white/10
          transition-opacity
          duration-300
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* Drawer */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`
          fixed
          top-0
          right-0
          z-301
          h-full
          w-[min(360px,85vw)]
          bg-[#FAFAF7]
          flex
          flex-col
          overflow-y-auto
          transition-transform
          duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            px-6
            py-5
            border-b
            border-black/10
          "
        >
          <span
            className="
              font-Cormorant
              text-xl
              font-light
              tracking-[0.2em]
              uppercase
            "
          >
            SE
            <span className="italic font-normal">py</span>
          </span>

          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="
              flex
              items-center
              justify-center
              w-8
              h-8
              rounded-full
              hover:bg-black/5
              transition-colors
            "
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Search */}

        <div
          className="
            mx-6
            mt-5
            flex
            items-center
            gap-2.5
            border
            border-black/12
            px-3.5
            py-2.5
            rounded-xs
          "
        >
          <FiSearch size={16} className="text-[--text-secondary]" />

          <input
            type="text"
            placeholder="Search collection..."
            className="
              flex-1
              bg-transparent
              border-none
              outline-none
              text-[13px]
              text-[--text-primary]
              placeholder:text-[--text-secondary]
            "
          />
        </div>

        {/* Navigation */}

        <nav className="flex-1 mt-6">
          {DRAWER_ITEMS.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => item.sub && toggleSub(item.label)}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  px-6
                  py-3.5
                  text-[13px]
                  tracking-widest
                  uppercase
                  text-[--text-primary]
                  border-b
                  border-black/8
                  hover:bg-black/3
                  transition-colors
                "
              >
                <span>{item.label}</span>

                {item.sub && (
                  <span
                    className={`
                      text-[--text-secondary]
                      transition-transform
                      duration-200
                      ${openSub === item.label ? "rotate-90" : ""}
                    `}
                  >
                    <FiChevronRight size={16} />
                  </span>
                )}
              </button>

              {item.sub && openSub === item.label && (
                <div className="bg-black/2">
                  {item.sub.map((link) => (
                    <a
                      key={link.label}
                      href="#"
                      className={`
                          block
                          px-6
                          pl-9
                          py-3
                          text-[13px]
                          border-b
                          border-black/6
                          tracking-[0.03em]
                          transition-colors
                          duration-200
                          ${
                            link.featured
                              ? "text-[#C5A882] italic hover:text-[#a8895f]"
                              : "text-[--text-secondary] hover:text-[--text-primary]"
                          }
                        `}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}

        <div
          className="
            border-t
            border-black/10
            px-6
            py-5
            space-y-4
          "
        >
          <div className="flex gap-3">
            <button
              className="
                flex-1
                flex
                items-center
                justify-center
                gap-2
                py-3
                text-[11px]
                tracking-widest
                uppercase
                border
                border-black/15
                hover:border-[--text-primary]
                transition-colors
              "
            >
              <FiUser size={16} />
              Account
            </button>

            <button
              className="
                flex-1
                flex
                items-center
                justify-center
                gap-2
                py-3
                text-[11px]
                tracking-widest
                uppercase
                border
                border-black/15
                hover:border-[--text-primary]
                transition-colors
              "
            >
              <FiHeart size={16} />
              Wishlist · {wishCount}
            </button>
          </div>

          <div
            className="
              flex
              justify-between
              text-[11px]
              text-[--text-secondary]
              tracking-[0.08em]
            "
          >
            <Link to="/" className="hover:text-[--text-primary]">
              Store Locator
            </Link>

            <Link to="/" className="hover:text-[--text-primary]">
              Contact Us
            </Link>

            <Link to="/" className="hover:text-[--text-primary]">
              Track Order
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
