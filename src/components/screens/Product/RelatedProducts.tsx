import { useEffect, useState } from 'react';

import Product from '@/components/common/Product';
import { getProductByCategories } from '@/libs/getData';
import { urlFor } from '@/libs/sanity';

const RelatedProducts = ({
  categories,
  currentId,
}: {
  categories: string[];
  currentId: string;
}) => {
  const [listProducts, setListProducts] = useState<any>([]);
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const productsByCategories =
          (await getProductByCategories({ categories, currentId })) ?? [];
        setListProducts(productsByCategories);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchRelatedProducts();
  }, [categories]);

  console.log('listProducts', listProducts);

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
          {listProducts.map((product: any, index: any) => {
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

export default RelatedProducts;
