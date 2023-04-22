import Link from 'next/link';
import React, { useRef } from 'react';

import { navBar } from '@/masterdata/common';

import InputSearch from './InputSearch';

const MobileNavbar = ({ currentPath }: any) => {
  const navRef = useRef(navBar);

  return (
    <div
      className="absolute right-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
      role="menu"
    >
      <div className="p-2">
        <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
          Search
        </strong>
        <div className="px-2">
          <InputSearch />
        </div>
        <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
          Pages
        </strong>
        {navRef.current.map((item, index) => (
          <Link
            key={index}
            className={`block rounded-lg border-b border-transparent px-4 py-2 text-sm duration-200 hover:border-b hover:border-[#E6B325] hover:bg-gray-50 hover:text-[#E6B325] 
              ${currentPath === item.link ? 'text-[#E6B325]' : 'text-gray-900'}
              `}
            href={item.link}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;
