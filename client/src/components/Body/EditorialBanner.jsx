import { Link } from "react-router-dom";

import desktopBanner from "../../assets/editorial-desktop.png";
import mobileBanner from "../../assets/editorial-mobile.png";

export default function EditorialBanner() {
  return (
    <section className="px-4 md:px-8 lg:px-10 py-10 md:py-16">

      <div className="relative overflow-hidden">

        {/* Desktop Image */}
        <img
          src={desktopBanner}
          alt="Editorial Collection"
          className="
            hidden
            md:block
            w-full
            h-162.5
            lg:h-187.5
            object-cover
          "
        />

        {/* Mobile Image */}
        <img
          src={mobileBanner}
          alt="Editorial Collection"
          className="
            block
            md:hidden
            w-full
            h-130
            object-cover
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-linear-to-t
            from-black/55
            via-black/20
            to-transparent
          "
        />

        {/* Content */}
        <div
          className="
            absolute
            inset-0
            flex
            items-end
            justify-center
            text-center
            pb-12
            md:pb-20
            px-6
          "
        >
          <div className="max-w-3xl">

            {/* Small Label */}
            <p
              className="
                text-white/80
                text-[11px]
                md:text-[12px]
                uppercase
                tracking-[0.35em]
                mb-4
              "
            >
              Editorial Selection
            </p>

            {/* Heading */}
            <h2
              className="
                text-white
                text-3xl
                md:text-5xl
                lg:text-6xl
                font-light
                leading-tight
              "
            >
              Crafted For
              <span className="font-Cormorant">
                {" "}Modern Elegance
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mt-5
                text-white/80
                text-sm
                md:text-base
                max-w-xl
                mx-auto
                leading-relaxed
              "
            >
              Discover timeless silhouettes, refined tailoring,
              and elevated essentials designed for every season.
            </p>

            {/* Button */}
            <div className="mt-8">

              <Link
                to="/collections"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-8
                  md:px-10
                  py-3.5
                  border
                  border-white/40
                  bg-white/10
                  backdrop-blur-md
                  text-white
                  text-[11px]
                  uppercase
                  tracking-[0.22em]
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-black
                "
              >
                Discover Collection
              </Link>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}