import Link from 'next/link';
import * as React from 'react';
import { useContext } from 'react';

import { CartContext } from '@/contexts/CartContext';
import type DetailProductProps from '@/types/DetailProductProps';

export default function App() {
  const { cartItems } = useContext(CartContext);

  interface CartItemProps {
    item: DetailProductProps;
  }

  function CartItem({ item }: CartItemProps) {
    const { removeItem } = useContext(CartContext);

    const handleDeleteCartItem = (
      event: React.MouseEvent<HTMLButtonElement>,
      product: DetailProductProps
    ) => {
      event.preventDefault();
      removeItem(product);
    };

    return (
      <Link href={`/shop/${item.slug}`}>
        <li className="mb-1 flex items-center gap-4 rounded px-2 py-0.5 hover:bg-slate-100">
          <img
            src={item.image}
            alt=""
            className="h-16 w-16 rounded object-cover"
          />

          <div>
            <h3 className="line-clamp-1 text-sm text-gray-900">{item.name}</h3>

            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
              <div>
                <dt className="inline">Giá: </dt>
                <dd className="inline">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(
                    (item.price - (item.price * item.discount) / 100) *
                      item.amount
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="text-sm text-gray-900">x{item.amount}</div>

            <button
              className="p-2 text-gray-600 transition hover:text-red-600"
              onClick={(event) => handleDeleteCartItem(event, item)}
              id="btn-delete"
            >
              <span className="sr-only">Remove item</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </li>
      </Link>
    );
  }

  return (
    <div>
      <div className="relative">
        <div
          className="absolute end-0 z-10 mt-2 w-60 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg sm:w-60 md:w-96 lg:w-96 xl:w-96 2xl:w-96"
          role="menu"
        >
          <div className="mt-2 max-h-96 overflow-y-auto p-2">
            <strong className="block p-2 text-base font-medium  text-gray-400">
              Giỏ hàng của tôi
            </strong>

            <ul className="">
              {cartItems.map((item: DetailProductProps, index) => (
                <CartItem item={item} key={index} />
              ))}
            </ul>
          </div>
          <div className="p-2">
            <div className="space-y-2 text-center">
              <Link
                href={`/cart`}
                className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:border-[#E6B325] hover:text-[#E6B325] hover:ring-1 hover:ring-[#E6B325]"
              >
                Xem chi tiết giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
