import { FiFeather, FiBox, FiGlobe } from "react-icons/fi";

const values = [
  {
    icon: FiFeather,
    title: "Crafted Lightly",
    desc: "Every piece is designed with precision, balance and timeless simplicity."
  },
  {
    icon: FiBox,
    title: "Premium Materials",
    desc: "We select only refined fabrics that feel as good as they look."
  },
  {
    icon: FiGlobe,
    title: "Worldwide Presence",
    desc: "Delivered across the globe with a seamless luxury experience."
  }
];

export default function BrandValue() {
  return (
    <section className="w-full bg-white py-24 border-t border-black/5">

      {/* Header */}
      <div className="text-center mb-16 px-5">
        <p className="text-[11px] tracking-[0.35em] uppercase text-black/40">
          Philosophy
        </p>

        <h2 className="mt-3 text-2xl md:text-3xl font-light tracking-[0.25em] uppercase text-black">
          What We Stand For
        </h2>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

        {values.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center border border-black/10 rounded-full mb-6 group-hover:border-black/30 transition duration-300 ease-in-out">
                <Icon size={18} className="text-black/70" />
              </div>

              {/* Title */}
              <h3 className="text-[13px] tracking-[0.2em] uppercase text-black">
                {item.title}
              </h3>

              {/* Line */}
              <div className="w-8 h-px bg-black/20 my-4" />

              {/* Description */}
              <p className="text-[12px] leading-relaxed text-black/50 max-w-65">
                {item.desc}
              </p>
            </div>
          );
        })}

      </div>

      {/* Bottom subtle line */}
      <div className="max-w-6xl mx-auto px-5 mt-20">
        <div className="w-full h-px bg-black/5" />
      </div>

    </section>
  );
}