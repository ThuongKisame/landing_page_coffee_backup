import { memo } from 'react';

import Product from '@/components/common/Product';
import { urlFor } from '@/libs/sanity';

const RelatedProducts = ({ productsByCategories }: any) => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Các sản phẩm liên quan
          </h2>
        </header>
        {/* eslint-disable */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productsByCategories.map((product: any, index: any) => {
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
        </ul>
        {/* eslint-enable */}
      </div>
    </section>
  );
};

export default memo(RelatedProducts);
