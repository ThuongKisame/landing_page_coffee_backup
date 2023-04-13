import React from 'react';

import Product from '@/components/common/Product';

const HotDeal = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Hot Deal trong tuần
          </h2>

          <p className="mx-auto mt-4 max-w-md text-gray-500">
            Nhận ngay ưu đãi giảm giá sập sàn vào mỗi tuần
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Product
            image="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            price="100000"
            name="Basic Tee"
            discount={10}
            slug="product-1"
          />
          <Product
            image="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            price="100000"
            name="Basic Tee"
            discount={10}
            slug="product-1"
          />
          <Product
            image="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            price="100000"
            name="Basic Tee"
            discount={10}
            slug="product-1"
          />
          <Product
            image="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            price="100000"
            name="Basic Tee"
            discount={10}
            slug="product-1"
          />
        </ul>
      </div>
    </section>
  );
};

export default HotDeal;
