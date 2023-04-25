import type { GetServerSideProps } from 'next';

import NotFound from '@/components/common/NotFound';
import DetailProduct from '@/components/screens/Product';
import { client, urlFor } from '@/libs/sanity';
import { Main } from '@/templates/Main';

const getProductBySlug = async (slug: string) => {
  const query = `*[_type == "product" && slug.current == "${slug}"]{
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
  }`;
  const products = await client.fetch(query);
  return products[0];
};

const getProductByCategoryName = async (category: string) => {
  const query = `*[_type == "product" && references(*[_type == "category" && title == "${category}"]._id)]`;
  const products = await client.fetch(query);
  return products;
};

const Index = ({ product, productsByCategories }: any) => {
  const thumbnailImage: string[] = [];

  console.log(product.linkvideo);
  /* eslint-disable */
  if (product !== null) {
    if (product.thumbnailImages) {
      product.thumbnailImages.forEach((e: any) => {
        thumbnailImage.push(urlFor(e.asset._ref).url());
      });
    }
  }
  /* eslint-enable */
  return (
    <Main>
      {/* eslint-disable */}
      {product ? (
        <DetailProduct
          price={product.price}
          name={product.name}
          slug={product.slug.current}
          image={urlFor(product.mainImage.asset._ref).url()}
          discount={product.discount}
          linkvideo={product.linkvideo}
          status={product.status}
          description={product.body[0].children[0].text}
          category={product.categories}
          thumbnail={thumbnailImage}
          amount={1}
          productsByCategories={productsByCategories}
        />
      ) : (
        <NotFound />
      )}
      {/* eslint-enable */}
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
  let productsByCategories = [];
  if (product != null) {
    productsByCategories =
      (await getProductByCategoryName(product.categories[0].title as string)) ??
      [];
  }
  return {
    props: { product, productsByCategories },
  };
};

export default Index;
