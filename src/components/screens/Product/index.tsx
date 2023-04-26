import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import React, { useContext } from 'react';
import YouTube from 'react-youtube';

import { CartContext } from '@/contexts/CartContext';
import { urlFor } from '@/libs/sanity';
import type DetailProductType from '@/types/DetailProductType';

import ImagesProduct from './ImagesProduct';
import RelatedProducts from './RelatedProducts';

const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) { // eslint-disable-line
        return null;
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={`${urlFor(value)
            .width(320)
            .height(240)
            .fit('max')
            .auto('format')}`}
        />
      );
    },
  },
};

const Index = ({
  id,
  price,
  name,
  images,
  status,
  linkVideo,
  discount,
  description,
  categories,
  slug,
}: DetailProductType) => {
  const { addToCart } = useContext(CartContext);
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <section>
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">{name}</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:items-start">
            <ImagesProduct images={images} />

            <div className="lg:sticky lg:top-0">
              <div className="space-y-4 lg:pt-8">
                <fieldset>
                  <legend className="text-lg font-bold">Thể loại</legend>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {categories.map((item, index) => (
                      <span
                        key={index}
                        className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-checked:bg-gray-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-lg font-bold">Trạng thái</legend>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {status ? (
                      <span className="block rounded-full border border-gray-200 px-3 py-1 text-xs text-green-500 peer-checked:bg-gray-100">
                        Còn hàng
                      </span>
                    ) : (
                      <span className="block rounded-full border border-gray-200 px-3 py-1 text-xs text-red-500 peer-checked:bg-gray-100">
                        Hết hàng
                      </span>
                    )}
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
                  {discount !== 0 && (
                    <span className="text-base font-semibold tracking-wider text-gray-500 line-through">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(price)}
                    </span>
                  )}
                </div>

                {status && (
                  <>
                    <button
                      className="w-full rounded bg-[#A47E3B] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
                      onClick={() =>
                        addToCart({
                          price,
                          name,
                          image: images[0],
                          discount,
                          id,
                          slug,
                          quantity: 1,
                        })
                      }
                    >
                      Thêm vào giỏ hàng
                    </button>
                    <button className="w-full rounded border border-gray-300 bg-gray-100 px-6 py-3 text-sm font-bold uppercase tracking-wide">
                      <Link href={`/cart`}>Thanh toán</Link>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="prose max-w-none">
                <PortableText value={description} components={ptComponents} />
              </div>
            </div>

            {linkVideo && (
              <div className="lg:col-span-3">
                <legend className="py-2 text-lg font-bold">
                  Video đánh giá sản phẩm
                </legend>
                <div className="prose max-w-none">
                  <YouTube videoId={linkVideo} opts={opts} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {id && categories && (
        <RelatedProducts categories={categories} currentId={id} />
      )}
    </>
  );
};

export default Index;
