import React, { useEffect, useRef, useState } from 'react';

import Product from '@/components/common/Product';
import Skeleton from '@/components/common/Skeleton';
import { getAllProducts } from '@/libs/getData';
import { urlFor } from '@/libs/sanity';

import Filter from './Filter';
import Pagination from './Pagination';

const Index = () => {
  const [products, setProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = useRef<number>(8);

  console.log('products', products);

  useEffect(() => {
    const fetchListProducts = async () => {
      setIsLoading(true);
      try {
        const data =
          (await getAllProducts({ perPage: perPage.current, currentPage })) ??
          [];
        setProducts(data?.items);
        setTotalPage(Math.round((data?.total || 1) / perPage.current));
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchListProducts();
  }, [currentPage]);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Cửa hàng
          </h2>
          <Filter />
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* eslint-disable */}

          {isLoading ? <>{
            Array.from(Array(perPage.current).keys()).map(item=><Skeleton key={item}/>)
          }</>: <>{
            products.map((product: any, index: any) => {
              return (
                <Product
                  key={index}
                  image={urlFor(product.mainImage.asset._ref).url()}
                  price={product.price}
                  name={product.name}
                  discount={product.discount}
                  slug={product.slug.current}
                />
              );
            })
          }</>}
          {/* eslint-enable */}
        </ul>
        {/* Pagination */}
        <div className="mt-8 flex w-full justify-center">
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
};

export default Index;
