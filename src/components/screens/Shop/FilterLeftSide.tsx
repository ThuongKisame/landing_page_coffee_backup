import React, { useEffect, useState } from 'react';

const FilterLeftSide = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(['Cà phê', 'Trà', 'Trà đào']);
    };
    fetchCategories();
  }, []);

  const handleOnChange = (item: string) => {
    const index = activeCategories.indexOf(item);
    if (index === -1) {
      setActiveCategories([...activeCategories, item]);
    } else {
      const newState = JSON.parse(JSON.stringify(activeCategories));
      newState.splice(index, 1);
      setActiveCategories(newState);
    }
  };
  const clearListActiveCategories = () => {
    setActiveCategories([]);
  };
  return (
    <div className="w-full space-y-2">
      <div className=" rounded border border-gray-300">
        <summary className="flex items-center justify-between gap-2 p-4 text-gray-900 transition">
          <span className="text-sm font-medium"> Thể loại </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700">
              {activeCategories.length} đã chọn
            </span>

            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
              onClick={clearListActiveCategories}
            >
              Làm mới
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            {categories.map((item: string, index: number) => (
              <li key={index}>
                <label
                  htmlFor={item}
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id={item}
                    className="h-5 w-5 rounded border-gray-300"
                    checked={activeCategories.some(
                      (activeItem) => activeItem === item
                    )}
                    onChange={() => {
                      handleOnChange(item);
                    }}
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {item}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterLeftSide;
