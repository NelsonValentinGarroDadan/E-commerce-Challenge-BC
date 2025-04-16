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
}) {
  // Función para generar el rango de páginas a mostrar
  const getPageRange = () => {
    const range = [];
    const maxVisible = 3; // Número máximo de páginas visibles a cada lado de la actual
    const ellipsis = <span className="px-3 py-1">...</span>;

    // Siempre mostrar la primera página
    range.push(1);

    // Páginas antes de la actual
    if (actual - maxVisible > 2) {
      range.push(ellipsis);
    } else if (actual > 2) {
      for (let i = 2; i < actual; i++) {
        range.push(i);
      }
    }

    // Página actual y adyacentes
    if (actual !== 1 && actual !== totalPages) {
      range.push(actual);
    }

    // Páginas después de la actual
    if (actual + maxVisible < totalPages - 1) {
      for (let i = actual + 1; i <= actual + maxVisible; i++) {
        range.push(i);
      }
      range.push(ellipsis);
    } else if (actual < totalPages - 1) {
      for (let i = actual + 1; i < totalPages; i++) {
        range.push(i);
      }
    }

    // Siempre mostrar la última página si es diferente de la primera
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={prev}
        disabled={actual === 1}
        className={`p-2 rounded ${
          actual === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-text/80 hover:text-text cursor-pointer"
        }`}
      >
        <ChevronLeft />
      </button>

      <div className="flex gap-1">
        {getPageRange().map((item, index) =>
          typeof item === "number" ? (
            <button
              key={index}
              onClick={() => onPageSelect(item)}
              className={`px-3 py-1 rounded ${
                item === actual
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              {item}
            </button>
          ) : (
            <span key={index} className="px-3 py-1">
              ...
            </span>
          )
        )}
      </div>

      <button
        onClick={next}
        disabled={actual === totalPages}
        className={`p-2 rounded ${
          actual === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-text/80 hover:text-text cursor-pointer"
        }`}
      >
        <ChevronRight />
      </button>
    </div>
  );
}