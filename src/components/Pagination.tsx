import React from "react";
import { usePosts } from "./PostProvider";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination: React.FC = () => {
  const { currentPage, totalPages, setPage } = usePosts();

  // Don't show pagination if only one page
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
      >
        <ChevronsLeft size={16} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => setPage(page as number)}
              className={`px-3 py-2 text-sm border rounded min-w-[40px] ${
                page === currentPage
                  ? "bg-orange-500 text-white border-orange-500"
                  : "hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          )}
        </div>
      ))}

      {/* Next Button */}
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
