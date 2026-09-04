import { useState } from "react";

export default function ProductGallery({ images = [], title }) {
  const [activeImage, setActiveImage] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-3/4 bg-neutral-100 flex items-center justify-center">
        <p className="text-xs tracking-[0.15em] uppercase text-neutral-400">
          No image available
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* Main Image */}
      <div className="aspect-3/4 overflow-hidden bg-neutral-100">
        <img
          src={images[activeImage]}
          alt={title}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            hover:scale-[1.02]
          "
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={activeImage === index}
              className={`
                relative
                aspect-3/4
                overflow-hidden
                bg-neutral-100
                transition-opacity
                ${
                  activeImage === index
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100"
                }
              `}
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {activeImage === index && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}