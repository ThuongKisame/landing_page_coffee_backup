import React from 'react';

const FilterLeftSide = () => {
  return (
    <div className="w-full space-y-2">
      <div className=" rounded border border-gray-300">
        <summary className="flex items-center justify-between gap-2 p-4 text-gray-900 transition">
          <span className="text-sm font-medium"> Thể loại </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700"> 0 đã chọn </span>

            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
            >
              Làm mới
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            <li>
              <label
                htmlFor="FilterInStock"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterInStock"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">
                  In Stock (5+)
                </span>
              </label>
            </li>

            <li>
              <label
                htmlFor="FilterPreOrder"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterPreOrder"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">
                  Pre Order (3+)
                </span>
              </label>
            </li>

            <li>
              <label
                htmlFor="FilterOutOfStock"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterOutOfStock"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">
                  Out of Stock (10+)
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterLeftSide;
