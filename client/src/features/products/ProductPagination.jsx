import { useSearchParams } from "react-router-dom";

export default function ProductPagination({
  currentPage,
  totalPages,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page);

    setSearchParams(params);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="flex items-center gap-2">

        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          className="
            px-3
            py-2
            text-[11px]
            tracking-[0.15em]
            uppercase
            text-neutral-500
            disabled:opacity-30
            disabled:cursor-not-allowed
            hover:text-neutral-900
            transition-colors
          "
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => goToPage(page)}
            className={`
              min-w-9
              h-9
              text-[11px]
              transition-colors
              ${
                currentPage === page
                  ? "bg-black text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              }
            `}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className="
            px-3
            py-2
            text-[11px]
            tracking-[0.15em]
            uppercase
            text-neutral-500
            disabled:opacity-30
            disabled:cursor-not-allowed
            hover:text-neutral-900
            transition-colors
          "
        >
          Next
        </button>

      </div>
    </div>
  );
}