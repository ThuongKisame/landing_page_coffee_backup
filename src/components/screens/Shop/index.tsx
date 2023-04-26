import React, { useEffect, useRef, useState } from 'react';

import Product from '@/components/common/Product';
import Skeleton from '@/components/common/Skeleton';
import { getAllProducts } from '@/libs/getData';
import { urlFor } from '@/libs/sanity';

import FilterLeftSide from './FilterLeftSide';
import FilterTopSide from './FilterTopSide';
import Pagination from './Pagination';

interface OrderByFilterType {
  type: string;
  order: string;
}
export interface FilterType {
  orderBy: OrderByFilterType;
  categories: string[];
  search: string;
}

const Index = () => {
  const [products, setProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<FilterType>({
    orderBy: { type: '', order: '' },
    categories: [],
    search: '',
  });
  const perPage = useRef<number>(8);
  console.log('filter', filter);
  // console.log('products', products);

  useEffect(() => {
    const fetchListProducts = async () => {
      setIsLoading(true);
      try {
        const data =
          (await getAllProducts({
            perPage: perPage.current,
            currentPage,
            filter,
          })) ?? [];
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
          <FilterTopSide setFilter={setFilter} />
        </header>

        <div className="mt-8 flex w-full gap-8">
          <div className="w-[20rem]">
            <FilterLeftSide setFilter={setFilter} />
          </div>
          <div className="w-full grow">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </div>
    </section>
  );
};

export default Index;
