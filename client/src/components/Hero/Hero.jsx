import { Link } from "react-router-dom";

import desktopHero from "../../assets/hero-desktop.png";
import mobileHero from "../../assets/hero-mobile.png";

export default function Hero() {
  return (
    <section className="relative w-full max-h-175 md:max-h-200  overflow-hidden">
      {/* Desktop Image */}
      <img
        src={desktopHero}
        alt="Hero Banner"
        className="hidden sm:block m-auto w-[95vw] h-full object-cover"
      />

      {/* Mobile Image */}
      <img
        src={mobileHero}
        alt="Hero Banner"
        className="block sm:hidden w-full h-full object-cover"
      />

      {/* Premium Overlay */}
      <div className="absolute inset-0 w-full md:w-[95vw] h-full m-auto bg-linear-to-t from-black/40 via-black/10 to-transparent" />

      {/* Content Wrapper */}

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-20 px-5">
        {/* Small Luxury Title */}
        <h1 className="text-white text-[12px] md:text-[14px] tracking-[0.35em] uppercase font-light opacity-90 mb-6 text-center">
          New Season Collection
        </h1>

        {/* Buttons */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to="/women"
            className="
              px-7 md:px-9
              py-3
              text-[11px] md:text-[12px]
              tracking-[0.25em]
              uppercase
              bg-white/90
              text-black
              backdrop-blur-md
              border border-white/30
              transition-all duration-300
              hover:bg-white
            "
          >
            Shop Women
          </Link>

          {/* Divider line (luxury touch) */}
          <div className="w-px h-5 bg-white/40" />

          <Link
            to="/men"
            className="
              px-7 md:px-9
              py-3
              text-[11px] md:text-[12px]
              tracking-[0.25em]
              uppercase
              bg-black/40
              text-white
              backdrop-blur-md
              border border-white/20
              transition-all duration-300
              hover:bg-black/70
            "
          >
            Shop Men
          </Link>
        </div>
      </div>
    </section>
  );
}
