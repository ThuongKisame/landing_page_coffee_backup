import React from 'react';

import RelatedProducts from './RelatedProducts';

interface DetailProductProps {
  price: number;
  name: string;
  image: string;
  thumbnail: string[];
  discount: number;
  description: string;
  category: string[];
}
const Index = ({
  price,
  name,
  image,
  discount,
  description,
  category,
  thumbnail,
}: DetailProductProps) => {
  return (
    <>
      <section>
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">{name}</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:items-start">
            <div className="lg:col-span-3">
              <div className="relative mt-4">
                <img
                  alt="image product"
                  src={image}
                  className="h-72 w-full rounded-xl object-cover lg:h-[540px]"
                />

                {/* <div className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-black/75 px-3 py-1.5 text-white">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>

                <span className="ml-1.5 text-xs"> Hover to zoom </span>
              </div> */}
              </div>

              <ul className="mt-1 flex gap-1">
                {thumbnail.map((item, index) => (
                  <li key={index}>
                    <img
                      alt="small image"
                      src={item}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:sticky lg:top-0">
              <form className="space-y-4 lg:pt-8">
                {/* <fieldset>
                <legend className="text-lg font-bold">Color</legend>

                <div className="mt-2 flex flex-wrap gap-1">
                  <label htmlFor="color_green" className="cursor-pointer">
                    <input
                      type="radio"
                      id="color_green"
                      name="color"
                      className="peer sr-only"
                      checked
                    />

                    <span className="block h-6 w-6 rounded-full border border-gray-200 bg-green-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                  </label>

                  <label htmlFor="color_blue" className="cursor-pointer">
                    <input
                      type="radio"
                      id="color_blue"
                      name="color"
                      className="peer sr-only"
                    />

                    <span className="block h-6 w-6 rounded-full border border-gray-200 bg-blue-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                  </label>

                  <label htmlFor="color_pink" className="cursor-pointer">
                    <input
                      type="radio"
                      id="color_pink"
                      name="color"
                      className="peer sr-only"
                    />

                    <span className="block h-6 w-6 rounded-full border border-gray-200 bg-pink-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                  </label>

                  <label htmlFor="color_red" className="cursor-pointer">
                    <input
                      type="radio"
                      id="color_red"
                      name="color"
                      className="peer sr-only"
                    />

                    <span className="block h-6 w-6 rounded-full border border-gray-200 bg-red-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                  </label>

                  <label htmlFor="color_indigo" className="cursor-pointer">
                    <input
                      type="radio"
                      id="color_indigo"
                      name="color"
                      className="peer sr-only"
                    />

                    <span className="block h-6 w-6 rounded-full border border-gray-200 bg-indigo-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                  </label>
                </div>
              </fieldset> */}

                <fieldset>
                  <legend className="text-lg font-bold">Thể loại</legend>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {category.map((item, index) => (
                      <span
                        key={index}
                        className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-checked:bg-gray-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </fieldset>

                <div className="rounded border bg-gray-100 p-4">
                  <p className="text-sm">
                    <span className="block">Khuyến mãi: {discount}%</span>
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <p className="text-xl font-bold">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(price - (price * discount) / 100)}
                  </p>
                  <span className="text-base font-semibold tracking-wider text-gray-500 line-through">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(price)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-[#A47E3B] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
                >
                  Thêm vào giỏ hàng
                </button>

                <button
                  type="button"
                  className="w-full rounded border border-gray-300 bg-gray-100 px-6 py-3 text-sm font-bold uppercase tracking-wide"
                >
                  Thanh toán
                </button>
              </form>
            </div>

            <div className="lg:col-span-3">
              <div className="prose max-w-none">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedProducts />
    </>
  );
};

export default Index;
