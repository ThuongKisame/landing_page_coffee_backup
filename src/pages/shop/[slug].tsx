import type { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

import DetailProduct from '@/components/screens/Product';
import { getProductBySlug } from '@/libs/getData';
import { urlFor } from '@/libs/sanity';
import { Main } from '@/templates/Main';
import type DetailProductType from '@/types/DetailProductType';
import { YouTubeGetID } from '@/utils';

const Index = ({ product }: any) => {
  // console.log('detail product', product);
  const [data, setData] = useState<DetailProductType>({
    id: '',
    price: 0,
    name: '',
    images: [],
    discount: 0,
    description: '',
    slug: '',
    linkVideo: '',
    status: true,
    categories: [],
  });

  useEffect(() => {
    /* eslint-disable */
    const formatData = () => {
      setData({
        id: product._id,
        price: product.price,
        name: product.name,
        images: product?.thumbnailImages ? [
          urlFor(product.mainImage.asset._ref).url(),
          ...product?.thumbnailImages?.map((item: any) =>
            urlFor(item.asset._ref).url()
          ),
        ]:[
          urlFor(product.mainImage.asset._ref).url(),
        ] ,
        discount: product.discount,
        description: product.body,
        slug: product?.slug?.current,
        linkVideo: product?.linkVideo && YouTubeGetID(product?.linkVideo),
        status: product?.status,
        categories: [...product?.categories.map((item:any)=>item?.title)],
      });
    };
    formatData();
  }, [product]);

  return (
    <Main>
      {/* eslint-disable */}
      <DetailProduct
        id={data.id}
        price={data.price}
        name={data.name}
        slug={data.slug}
        images={data.images}
        discount={data.discount}
        linkVideo={data.linkVideo}
        status={data.status}
        description={data.description}
        categories={data.categories}
      />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async ({
  params,
}) => {
  const { slug }: any = params;
  const product = (await getProductBySlug(slug as string)) ?? null;
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
};

export default Index;
