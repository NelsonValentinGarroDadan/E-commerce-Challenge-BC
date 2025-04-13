// components/Pagination.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Pagination({
  actual,
  totalPages,
  next,
  prev,
  onPageSelect,
}: {
    actual: number;
    totalPages: number;
    next: () => void;
    prev: () => void;
    onPageSelect: (page: number) => void;
  }
) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-6 max-w-90 min-w-30 w-auto">
        <div className="w-full">
            {actual > 1 && (
                <button
                onClick={prev}
                className="p-2 rounded text-text/80 hover:text-text  cursor-pointer"
                >
                <ChevronLeft />
                </button>
            )}
        </div>
        <div className="w-full flex gap-2">
            {pages.map((page) => (
                <button
                key={page}
                onClick={() => onPageSelect(page)}
                className={`px-3 py-1 rounded ${
                    page === actual ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                }`}
                >
                {page}
                </button>
            ))}
        </div>
        <div className="w-full">
            {actual < totalPages && (
            <button
            onClick={next}
            className="p-2 rounded text-text/80 hover:text-text cursor-pointer"
            >
            <ChevronRight />
            </button>
        )}
        </div>
    </div>
  );
}
