import Tippy from '@tippyjs/react/headless';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { CgShoppingBag } from 'react-icons/cg';
import { IoCloseSharp } from 'react-icons/io5';

import { CartContext } from '@/contexts/CartContext';
import { navBar } from '@/masterdata/common';

import Cart from './Cart';
import InputSearch from './InputSearch';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
  const router = useRouter();

  const currentPath = router.pathname;

  const navRef = useRef(navBar);

  const { totalQuantity } = useContext(CartContext);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const toggleMobileNav = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  const [isCartNavVisible, setIsCartNavVisible] = useState(false);
  const toggleCartNav = () => {
    setIsCartNavVisible(!isCartNavVisible);
  };

  return (
    <header
      aria-label="Site Header"
      className="fixed top-0 z-30 w-full border-b-2 bg-white"
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
                      className={`  duration-200 hover:border-b hover:border-[#E6B325] hover:text-[#E6B325] ${
                        currentPath === item.link
                          ? 'text-[#E6B325]'
                          : 'text-gray-900'
                      }`}
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
              <Tippy
                interactive
                placement="bottom-end"
                visible={isCartNavVisible}
                onClickOutside={toggleCartNav}
                render={(attrs) => (
                  <div className="mt-1 shadow" tabIndex={-1} {...attrs}>
                    {isCartNavVisible && <Cart />}
                  </div>
                )}
              >
                <div
                  className=" relative cursor-pointer duration-200 hover:text-[#E6B325]"
                  onClick={toggleCartNav}
                >
                  <CgShoppingBag size={26} />
                  <span className="absolute right-0 top-0 -translate-y-2.5 translate-x-2.5 whitespace-nowrap rounded-full bg-yellow-300 px-2 py-0.5 text-xs text-yellow-700">
                    {totalQuantity}
                  </span>
                </div>
              </Tippy>

              <Tippy
                interactive
                placement="bottom-end"
                visible={isSearchVisible}
                onClickOutside={toggleSearch}
                render={(attrs) => (
                  <div
                    className="mt-3 hidden w-56 md:block"
                    tabIndex={-1}
                    {...attrs}
                  >
                    {isSearchVisible && <InputSearch />}
                  </div>
                )}
              >
                <div
                  className="hidden cursor-pointer duration-200 hover:text-[#E6B325] md:block "
                  onClick={toggleSearch}
                >
                  <BiSearch size={26} />
                </div>
              </Tippy>
            </div>
            <div
              className="block md:hidden"
              // toggle
            >
              <Tippy
                interactive
                placement="bottom-end"
                visible={isMobileNavVisible}
                onClickOutside={toggleMobileNav}
                render={(attrs) => (
                  <div className="" tabIndex={-1} {...attrs}>
                    {isMobileNavVisible && (
                      <MobileNavbar currentPath={currentPath} />
                    )}
                  </div>
                )}
              >
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={toggleMobileNav}
                >
                  {isMobileNavVisible ? (
                    <IoCloseSharp className="text-xl" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </Tippy>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
