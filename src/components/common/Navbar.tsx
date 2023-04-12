import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import { CgShoppingBag } from 'react-icons/cg';

import { navBar } from '@/masterdata/common';

const Navbar = () => {
  const navRef = useRef(navBar);
  return (
    <header
      aria-label="Site Header"
      className="fixed top-0 z-40 w-full bg-white"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" href="/">
              <Image
                src="/assets/logo/logo-mr-go.png"
                alt="logo"
                width={70}
                height={70}
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Site Nav">
              <ul className="flex items-center gap-6 text-base font-medium">
                {navRef.current.map((item, index) => (
                  <li key={index}>
                    <Link
                      className=" text-gray-900 duration-200 hover:border-b hover:border-[#E6B325] hover:text-[#E6B325]"
                      href={item.link}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-lg sm:flex sm:gap-6">
              <div className="relative cursor-pointer duration-200 hover:text-[#E6B325]">
                <CgShoppingBag size={26} />
                <span className="absolute right-0 top-0 -translate-y-2.5 translate-x-2.5 whitespace-nowrap rounded-full bg-yellow-300 px-2 py-0.5 text-xs text-yellow-700">
                  0
                </span>
              </div>

              <div className="hidden cursor-pointer duration-200 hover:text-[#E6B325] sm:flex">
                <BiSearch size={26} />
              </div>
            </div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
