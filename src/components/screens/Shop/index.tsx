import React, { useEffect, useState } from 'react';

import Product from '@/components/common/Product';
import { client, urlFor } from '@/libs/sanity';

const Index = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  const renderPages = () => {
    const pages = [];
    for (let i = 0; i < totalPage; i += 1) {
      pages.push(
        <li key={i}>
          <span
            className={`block h-8 w-8 rounded border border-gray-100 text-center leading-8 ${
              i + 1 === currentPage ? 'bg-blue-300' : ' hover:cursor-pointer'
            }`}
          >
            {i + 1}
          </span>
        </li>
      );
    }
    return pages;
  };

  const getAllProduct = async (page: number) => {
    const query = `*[_type == "product"]{
      name,
      slug,
      mainImage,
      discount,
      thumbnailImages[],
      price,
      linkvideo,
      status,
      categories[]->{
        title
      },
      body
    }[${(page - 1) * limit}...${(page - 1) * limit + limit - 1}]`;
    const resProducts = await client.fetch(query);
    setProducts(resProducts);
  };

  const getCountAllProduct = async () => {
    const query = `count(*[_type == "product"])`;
    const resCount = await client.fetch(query);
    setTotalPage(Math.ceil(resCount / limit));
  };

  const getProductByName = async (page: number, searchValue: string) => {
    const query = `*[_type == "product" && name match "${searchValue}*"]{
      name,
      slug,
      mainImage,
      discount,
      thumbnailImages[],
      price,
      linkvideo,
      status,
      categories[]->{
        title
      },
      body
    }[${(page - 1) * limit}...${(page - 1) * limit + limit - 1}]`;
    const resProducts = await client.fetch(query);
    setProducts(resProducts);
  };

  const getCountProductByName = async (searchValue: string) => {
    const query = `count(*[_type == "product" && name match "${searchValue}*"])`;
    const resCount = await client.fetch(query);
    setTotalPage(Math.ceil(resCount / limit));
  };

  const getProductByCategoy = async (page: number, categoryTitle: string) => {
    const query = `*[_type == "product" && references(*[_type == "category" && title == "${categoryTitle}"]._id)]{
      name,
      slug,
      mainImage,
      discount,
      thumbnailImages[],
      price,
      linkvideo,
      status,
      categories[]->{
        title
      },
      body
    }}[${page - 1}...${page + limit - 1}]`;
    const resProducts = await client.fetch(query);
    setProducts(resProducts);
  };

  const getCountProductByCategoy = async (categoryTitle: string) => {
    const query = `count(*[_type == "product" && references(*[_type == "category" && title == "${categoryTitle}"]._id)])`;
    const resCount = await client.fetch(query);
    setTotalPage(Math.ceil(resCount / limit));
  };

  /* eslint-enable */

  useEffect(() => {
    getAllProduct(currentPage);

    // fix lỗi
    const t = false;
    if (t) {
      setCurrentPage(1);
      getCountAllProduct();
      getProductByName(1, 'cf');
      getCountProductByName('cf');
      getProductByCategoy(1, 'abc');
      getCountProductByCategoy('cbs');
    }
  }, []);

  // console.log("fetch products", products);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Cửa hàng
          </h2>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* eslint-disable */}
          {products.map((product: any, index: any) => {
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
          })}
          {/* eslint-enable */}
        </ul>

        {/* Pagination */}
        <ol className="flex justify-center gap-1 text-xs font-medium">
          <li>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 hover:cursor-pointer  rtl:rotate-180">
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </li>

          {renderPages()}

          <li>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 hover:cursor-pointer rtl:rotate-180">
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default Index;
