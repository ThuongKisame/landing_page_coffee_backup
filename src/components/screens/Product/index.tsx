import Link from 'next/link';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';

import { CartContext } from '@/contexts/CartContext';
import type DetailProductProps from '@/types/DetailProductProps';

import RelatedProducts from './RelatedProducts';

interface Image {
  url: string;
  isActive: boolean;
}

const Index = React.memo(
  ({
    price,
    name,
    image,
    slug,
    amount,
    status,
    linkvideo,
    discount,
    description,
    category,
    thumbnail,
    productsByCategories,
  }: DetailProductProps) => {
    const { addToCart } = useContext(CartContext);

    const opts = {
      playerVars: {
        autoplay: 0,
      },
    };

    const handleAddToCart = (product: DetailProductProps) => {
      addToCart(product);
    };

    function transformImage(thumbnailArr: string[], imageUrl: string): Image[] {
      const transformedImages: Image[] = [
        {
          url: imageUrl,
          isActive: true,
        },
      ];

      for (const url of thumbnailArr) {
        transformedImages.push({
          url,
          isActive: false,
        });
      }

      return transformedImages;
    }

    const updateIsActive = useCallback(
      (
        listImage: { url: string; isActive: boolean }[],
        urlToUpdate: string
      ): { url: string; isActive: boolean }[] => {
        return listImage.map((item) => {
          if (item.url === urlToUpdate) {
            return { ...item, isActive: true };
          }
          return { ...item, isActive: false };
        });
      },
      []
    );

    const [listImages, setListImages] = useState(
      transformImage(thumbnail, image)
    );

    const handleClickImage = useCallback(
      (url: any) => {
        const newList = updateIsActive(listImages, url);
        setListImages(newList);
      },
      [listImages, updateIsActive]
    );

    useEffect(() => {
      setListImages(transformImage(thumbnail, image));
    }, [image, thumbnail]);

    console.log(linkvideo);

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
                    src={listImages.find((item) => item.isActive)?.url || ''}
                    className="h-72 w-full rounded-xl object-cover lg:h-[540px]"
                  />
                </div>

                <ul className="mt-1 flex gap-1">
                  {listImages.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => handleClickImage(item.url)}
                        className={`rounded ${item.isActive && 'ring-2'}`}
                      >
                        <img
                          alt="small image"
                          src={item.url}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="lg:sticky lg:top-0">
                <div className="space-y-4 lg:pt-8">
                  <fieldset>
                    <legend className="text-lg font-bold">Thể loại</legend>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {category.map((item, index) => (
                        <span
                          key={index}
                          className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-checked:bg-gray-100"
                        >
                          {item.title}
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

                  {/* {linkvideo&&
                    <fieldset>
                      <a className="font-bold " href={linkvideo}>
                        Link giới thiệu chi tiết sản phẩm  
                      </a>
                    </fieldset>
                  } */}

                  <button
                    className="w-full rounded bg-[#A47E3B] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
                    onClick={() =>
                      handleAddToCart({
                        price,
                        name,
                        image,
                        slug,
                        discount,
                        description,
                        status,
                        linkvideo,
                        amount,
                        category,
                        thumbnail,
                        productsByCategories: [],
                      })
                    }
                  >
                    Thêm vào giỏ hàng
                  </button>

                  <button className="w-full rounded border border-gray-300 bg-gray-100 px-6 py-3 text-sm font-bold uppercase tracking-wide">
                    <Link href={`/cart`}>Thanh toán</Link>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="prose max-w-none">
                  <p>{description}</p>
                </div>
              </div>

              {linkvideo && (
                <div className="lg:col-span-3">
                  <legend className="py-2 text-lg font-bold">
                    Video đánh giá sản phẩm
                  </legend>
                  <div className="prose max-w-none">
                    <YouTube videoId={linkvideo} opts={opts} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <RelatedProducts productsByCategories={productsByCategories} />
      </>
    );
  }
);

Index.displayName = 'MyComponent';

export default Index;
