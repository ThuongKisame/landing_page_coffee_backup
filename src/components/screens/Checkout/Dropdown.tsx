import React, { useState } from 'react';

import type { InputFiledTypeAddress, ItemsAddressType } from '.';

interface DropDownProps {
  label: string;
  items: ItemsAddressType[];
  value: ItemsAddressType;
  setValue: React.Dispatch<React.SetStateAction<InputFiledTypeAddress>>;
  error: string;
}

const Dropdown = ({ label, items, value, setValue, error }: DropDownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOnClickItem = (item: ItemsAddressType) => {
    setValue((prev) => {
      return { ...prev, value: { name: item.name, code: item.code } };
    });
    handleOpen();
  };
  return (
    <div className="relative w-full">
      {error && (
        <p className="absolute top-full text-xs text-red-700">{error}</p>
      )}
      <label
        htmlFor="dropdown"
        className="block text-xs font-medium text-gray-700"
      >
        {label}
      </label>
      <div
        className="relative mt-1 inline-flex w-full items-center overflow-hidden rounded-md border bg-white shadow"
        onClick={handleOpen}
      >
        <div className="w-full border-e px-4 py-3 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700 ">
          {value.name || `Chọn ${label.toLowerCase()}`}
        </div>

        <button
          type="button"
          className="h-full p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
        >
          <span className="sr-only">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          className="absolute end-0 z-10 mt-2 max-h-[20rem] w-full overflow-y-auto rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            {items?.map((item: ItemsAddressType, index: number) => (
              <div
                key={index}
                onClick={() => {
                  handleOnClickItem(item);
                }}
                className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
