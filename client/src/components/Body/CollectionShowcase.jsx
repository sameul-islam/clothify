import { Link } from "react-router-dom";

import womenImg from "../../assets/collections/women.png";
import menImg from "../../assets/collections/men.png";
import newArrivalImg from "../../assets/collections/new-arrival.png";

export default function CollectionShowcase() {
  return (
    <section className="w-[95vw] mx-auto py-20 md:py-28">

      {/* Section Heading */}
      <div className="text-center mb-14">
        <p className="text-[11px] tracking-[0.35em] uppercase text-[--text-secondary] mb-3">
          Curated Collections
        </p>

        <h2
          className="
            text-3xl
            md:text-5xl
            font-light
            tracking-[0.08em]
            text-[--text-primary]
          "
        >
          Discover Your Style
        </h2>
      </div>

      {/* Top Grid */}
      <div className="grid md:grid-cols-2 gap-5">

        <CollectionCard
          image={womenImg}
          title="Women"
          subtitle="Refined silhouettes crafted for modern elegance."
          link="/products?gender=women"
        />

        <CollectionCard
          image={menImg}
          title="Men"
          subtitle="Tailored essentials designed with timeless appeal."
          link="/products?gender=men"
        />
      </div>

      {/* Bottom Large Card */}
      <div className="mt-5">
        <CollectionCard
          image={newArrivalImg}
          title="New Arrivals"
          subtitle="The latest pieces from our seasonal collection."
          link="/products?collection=newArraivals"
          large
        />
      </div>

    </section>
  );
}

function CollectionCard({
  image,
  title,
  subtitle,
  link,
  large = false,
}) {
  return (
    <Link
      to={link}
      className={`
        group
        relative
        overflow-hidden
        block
        ${
          large
            ? "h-112.5 md:h-150"
            : "h-95 md:h-130"
        }
      `}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="
          w-full
          h-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-105
        "
      />

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-linear-to-t
          from-black/60
          via-black/15
          to-transparent
        "
      />

      {/* Border */}
      <div
        className="
          absolute
          inset-4
          border
          border-white/20
          pointer-events-none
        "
      />

      {/* Content */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          p-8
          md:p-12
        "
      >
        <p
          className="
            text-white/80
            text-[11px]
            tracking-[0.3em]
            uppercase
            mb-3
          "
        >
          Collection
        </p>

        <h3
          className="
            text-white
            text-3xl
            md:text-5xl
            font-light
            tracking-[0.08em]
            mb-3
          "
        >
          {title}
        </h3>

        <p
          className="
            text-white/80
            max-w-md
            text-sm
            md:text-base
            leading-relaxed
          "
        >
          {subtitle}
        </p>

        <span
          className="
            inline-flex
            items-center
            mt-6
            text-white
            text-[11px]
            uppercase
            tracking-[0.25em]
            border-b
            border-white/60
            pb-1
          "
        >
          Explore Collection
        </span>
      </div>
    </Link>
  );
}