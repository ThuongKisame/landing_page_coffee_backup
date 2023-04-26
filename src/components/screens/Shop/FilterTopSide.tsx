import React, { useRef, useState } from 'react';

import type { FilterType } from '.';

type ItemSortFilterType = {
  title: string;
  key: string;
  type: 'wording' | 'price' | 'createAt';
  order: 'asc' | 'desc';
};

interface FilterTopSideProps {
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

const FilterTopSide = ({ setFilter }: FilterTopSideProps) => {
  const [activeItem, setActiveItem] = useState<string>('Mặc định');
  const itemsRef = useRef<ItemSortFilterType[]>([
    { title: 'A -> Z', key: 'a-z', type: 'wording', order: 'asc' },
    { title: 'Z -> A', key: 'z-a', type: 'wording', order: 'desc' },
    {
      title: 'Giá tăng dần',
      key: 'gia-tang-dan',
      type: 'price',
      order: 'asc',
    },
    {
      title: 'Giá giảm dần',
      key: 'gia-giam-dan',
      type: 'price',
      order: 'desc',
    },
    {
      title: 'Hàng mới nhất',
      key: 'hang-moi-nhat',
      type: 'createAt',
      order: 'asc',
    },
    {
      title: 'Hàng cũ nhất',
      key: 'hang-cu-nhat',
      type: 'createAt',
      order: 'desc',
    },
  ]);

  const handleOnClickItem = (item: ItemSortFilterType) => {
    setActiveItem(item.title);
    setFilter((prev) => {
      return { ...prev, orderBy: { type: item.type, order: item.order } };
    });
  };
  return (
    <div className="group relative ">
      <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
        <div className="cursor-default border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          Sắp xếp: <span>{activeItem}</span>
        </div>

        <button className=" h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
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

      <div
        className="invisible absolute end-0 z-20 w-56 rounded-md border border-gray-100 bg-white opacity-0 shadow-lg group-hover:visible group-hover:opacity-100"
        role="menu"
      >
        <div className="p-2">
          {itemsRef.current.map((item: ItemSortFilterType, index: number) => (
            <div
              key={index}
              className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              role="menuitem"
              onClick={() => {
                handleOnClickItem(item);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterTopSide;
