import Link from 'next/link';
import React, { useContext } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

import { CartContext } from '@/contexts/CartContext';
import type DetailProductProps from '@/types/DetailProductProps';

const Index = () => {
  const {
    cartItems,
    removeItem,
    increaseItemAmount,
    decreaseItemAmount,
    totalMoney,
  } = useContext(CartContext);

  const handleDeleteCartItem = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: DetailProductProps
  ) => {
    event.preventDefault();
    removeItem(product);
  };

  return (
    <>
      <section>
        <div className=" mx-auto  grid min-h-[calc(100vh-64px)] max-w-screen-xl grid-cols-1 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className=" py-12 md:col-span-2 md:py-12">
            <div className=" w-full space-y-8">
              <h1 className="text-3xl uppercase text-black">Giỏ hàng</h1>
              <div>
                <div className="flow-root">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                      <thead className="border-t-2 border-gray-600 ltr:text-left rtl:text-right">
                        <tr>
                          <th className="px-0 py-2 text-left font-medium text-gray-900 sm:px-4 ">
                            Sản phẩm
                          </th>
                          <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900 sm:px-4">
                            Số lượng
                          </th>
                          <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900 sm:px-4">
                            Giá
                          </th>
                          <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900 sm:px-4">
                            Xóa
                          </th>
                          <th className="px-4 py-2"></th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {cartItems.map((product: DetailProductProps, index) => (
                          <tr key={index}>
                            <td className=" px-0 py-2 font-medium text-gray-900 sm:px-4">
                              <div className="flex-row md:flex">
                                <img
                                  alt=""
                                  src={product.image}
                                  className="h-16 w-16 rounded object-cover"
                                />

                                <div className="flex flex-col  justify-center px-1">
                                  <h3 className="line-clamp-1 text-sm text-gray-900">
                                    {product.name}
                                  </h3>

                                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                    <div>
                                      <dt className="inline">Giá: </dt>
                                      <dd className="inline">
                                        {new Intl.NumberFormat('vi-VN', {
                                          style: 'currency',
                                          currency: 'VND',
                                        }).format(
                                          product.price -
                                            (product.price * product.discount) /
                                              100
                                        )}
                                      </dd>
                                    </div>
                                  </dl>
                                </div>
                              </div>
                            </td>
                            <td className="relative whitespace-nowrap px-0 py-2 text-gray-700 sm:px-4 ">
                              <div>
                                <div className="flex items-center justify-center rounded border border-gray-200">
                                  <button
                                    onClick={() => decreaseItemAmount(product)}
                                    id="minus"
                                    className="flex w-8 justify-center leading-8 text-gray-600 transition hover:opacity-75"
                                  >
                                    <FaMinus />
                                  </button>
                                  <span className="my-0.5 block w-8 rounded border-y-0 border-gray-200 bg-slate-50 text-center text-base font-semibold leading-8">
                                    {product.amount}
                                  </span>
                                  <button
                                    id="plus"
                                    className="flex w-8 justify-center leading-8 text-gray-600 transition hover:opacity-75"
                                    onClick={() => increaseItemAmount(product)}
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-0 py-2 text-center text-gray-700 sm:px-4">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(
                                (product.price -
                                  (product.price * product.discount) / 100) *
                                  product.amount
                              )}
                            </td>
                            <td className="whitespace-nowrap px-0 py-2 text-center text-gray-700 sm:px-4">
                              <button
                                className="p-2 text-gray-600 transition hover:text-red-600"
                                onClick={(event) =>
                                  handleDeleteCartItem(event, product)
                                }
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
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" pt-8 md:px-4 md:pt-[125px]">
            <div className="w-full   border-t-2 border-gray-600 bg-slate-50">
              <div className="flex justify-between border-b border-gray-600 px-4">
                <span className="py-2 font-medium">Tổng tiền</span>
                <span className="py-2 text-gray-700">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(totalMoney)}
                </span>
              </div>
              <div className="p-4">
                <div className="space-y-2 pb-10 pt-2 text-center">
                  <Link
                    href={`/cart/checkout`}
                    className="block rounded border border-gray-600 px-5 py-3 text-sm font-medium text-gray-600 transition hover:border-[#E6B325] hover:text-[#E6B325] hover:ring-1 hover:ring-[#E6B325]"
                  >
                    Đặt hàng
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
