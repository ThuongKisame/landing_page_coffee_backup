import type { GetServerSideProps } from 'next';

import Home from '@/components/screens/Home';
import { Meta } from '@/layouts/Meta';
import { client } from '@/libs/sanity';
import { Main } from '@/templates/Main';

export const getServerSideProps: GetServerSideProps = async () => {
  const carousel = await client.fetch(`*[_type == "carousel"]`);
  const products = await client.fetch(`*[_type == "product"]`);
  return {
    props: {
      carousel,
      products,
    },
  };
};

const Index = ({ carousel, products }: any) => {
  // console.log('carousel', carousel);
  // console.log('products', products);
  return (
    <Main
      meta={
        <Meta
          title="Coffee"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <Home carousel={carousel} products={products} />
    </Main>
  );
};

export default Index;
