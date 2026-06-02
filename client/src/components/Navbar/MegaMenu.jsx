import { Link } from "react-router-dom";

export default function MegaMenu({ columns }) {
  return (
    <div
      className="
        absolute
        top-full
        left-1/2
        -translate-x-10
        w-195
        bg-[#FAFAF7]
        border-t
        border-b
        border-black/10
        z-50
        grid
        grid-cols-4
        gap-0
        px-12
        py-9
        opacity-0
        invisible
        -translate-y-1.5
        transition-all
        duration-300
        ease-out
        group-hover:opacity-100
        group-hover:visible
        group-hover:translate-y-0
      "
    >
      {columns.map((col, index) => (
        <div
          key={index}
          className={`
            pr-6
            ${
              index > 0
                ? "border-l border-black/5 pl-6 pr-0"
                : ""
            }
          `}
        >
          {/* Column Title */}
          <p
            className="
              text-[10px]
              tracking-[0.18em]
              uppercase
              text-[--text-secondary]
              font-bold
              mb-4
            "
          >
            {col.title}
          </p>

          {/* Links */}
          {col.links.map((link) => (
            <Link
              key={link.label}
              to="/"
              className={`
                block
                text-[13px]
                mb-2.5
                tracking-[0.03em]
                transition-colors
                duration-200
                ${
                  link.featured
                    ? "text-[#C5A882] italic hover:text-[#a8895f]"
                    : "text-[--text-primary] hover:text-[#C5A882]"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}