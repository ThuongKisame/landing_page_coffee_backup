import React from 'react';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const handleIncrement = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleDecrement = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="inline-flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={handleDecrement}
        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 rtl:rotate-180"
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <p className="text-xs">
        {currentPage}
        <span className="mx-0.25">/</span>
        {totalPage}
      </p>

      <button
        type="button"
        onClick={handleIncrement}
        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 rtl:rotate-180"
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
