import type { GetServerSideProps } from 'next';

import Home from '@/components/screens/Home';
import { client } from '@/libs/sanity';
import { Main } from '@/templates/Main';

export const getServerSideProps: GetServerSideProps = async () => {
  const [carousel, products, introduces] = await Promise.all([
    client.fetch(`*[_type == "carousel"]`),
    client.fetch(`*[_type == "product" && highlight==true]`),
    client.fetch(`*[_type == "introduct" && status==true && highlight==true] | order(index asc) {
      title,
      slogan,
      description,
      image,
      linkVideo
    }`),
  ]);

  return {
    props: {
      carousel,
      products,
      introduces,
    },
  };
};

const Index = ({ carousel, products, introduces }: any) => {
  return (
    <Main>
      <Home carousel={carousel} products={products} introduces={introduces} />
    </Main>
  );
};

export default Index;
