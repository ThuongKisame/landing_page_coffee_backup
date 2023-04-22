import Link from 'next/link';
import React from 'react';

interface ProductProps {
  price: number;
  name: string;
  image: string;
  discount: number;
  slug: string;
}

const Product = ({ price, name, image, discount, slug }: ProductProps) => {
  return (
    <li>
      <Link
        href={`/shop/${slug}`}
        className="group relative block overflow-hidden"
      >
        {discount !== 0 && (
          <span className="absolute right-2 top-2 z-10 whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
            {discount}%
          </span>
        )}

        <img
          src={image}
          alt=""
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />

        <div className="relative bg-white pt-3">
          <h3 className="line-clamp-1 text-sm font-medium text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {name}
          </h3>

          <p className="mt-2 flex items-end gap-2">
            <span className="text-lg font-semibold tracking-wide text-[#A47E3B]">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(price - (price * discount) / 100)}
            </span>
            {discount !== 0 && (
              <span className="text-base font-semibold tracking-wider text-gray-500 line-through">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(price)}
              </span>
            )}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Product;
