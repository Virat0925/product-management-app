import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const safeChange = (page) => {
    if (typeof page !== "number") return;
    const clamped = Math.max(1, Math.min(totalPages || 1, page));
    if (clamped !== currentPage) onPageChange(clamped);
  };

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div
      className="flex items-center justify-center gap-2 mt-6"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => safeChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, index) => {
        const isEllipsis = page === "...";
        const isActive = page === currentPage;
        const key = isEllipsis ? `ellipsis-${index}` : `page-${page}`;

        if (isEllipsis) {
          
          return (
            <span
              key={key}
              className="min-w-[40px] px-3 py-2 rounded-lg font-medium text-center cursor-default select-none text-gray-500"
              aria-hidden="true"
            >
              …
            </span>
          );
        }

        return (
          <button
            key={key}
            type="button"
            onClick={() => safeChange(page)}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Go to page ${page}`}
            className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => safeChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
