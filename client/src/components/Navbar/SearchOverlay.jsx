import { useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { TRENDING_TAGS } from "./navbarData";

export default function SearchOverlay({
  open,
  onClose,
}) {
  const inputRef = useRef(null);

  // Auto Focus
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [open]);

  // ESC Key Close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className={`
        fixed
        inset-0
        z-200
        flex
        flex-col
        items-center
        justify-start
        pt-28
        px-6
        bg-[#FAFAF7]/97
        backdrop-blur-sm
        transition-opacity
        duration-300
        ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      <div className="w-full max-w-150">

        {/* Heading */}
        <span
          className="
            block
            text-[11px]
            tracking-[0.2em]
            uppercase
            text-[--text-secondary]
            mb-6
            font-Cormorant
          "
        >
          Search the collection
        </span>

        {/* Search Input */}
        <div
          className="
            flex
            items-center
            gap-3
            border-b-[1.5px]
            border-[--text-primary]
            pb-3
          "
        >
          <span className="text-[--text-secondary] shrink-0">
            <FiSearch size={22} />
          </span>

          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            placeholder="Search..."
            className="
              flex-1
              bg-transparent
              border-none
              outline-none
              text-[32px]
              font-light
              tracking-wider
              text-[--text-primary]
              placeholder:text-black/20
              font-Cormorant
            "
          />

          <button
            onClick={onClose}
            className="
              flex
              items-center
              gap-1.5
              text-[11px]
              tracking-[0.12em]
              uppercase
              text-[--text-secondary]
              hover:text-[--text-primary]
              transition-colors
              shrink-0
            "
          >
            <FiX size={14} />
            Esc
          </button>
        </div>

        {/* Trending */}
        <div className="mt-10">

          <p
            className="
              text-[10px]
              tracking-[0.18em]
              uppercase
              text-[--text-secondary]
              mb-4
            "
          >
            Trending searches
          </p>

          <div className="flex flex-wrap gap-2">
            {TRENDING_TAGS.map((tag) => (
              <button
                key={tag}
                className="
                  text-[12px]
                  px-3.5
                  py-1.5
                  border
                  border-black/15
                  rounded-xs
                  text-[--text-primary]
                  tracking-wider
                  transition-all
                  duration-200
                  hover:bg-[--text-primary]
                  hover:text-[--bg]
                  hover:border-[--text-primary]
                "
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}