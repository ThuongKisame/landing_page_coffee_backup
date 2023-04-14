import React from 'react';

import HotDeal from './HotDeal';
import Slider from './Slider';

const Index = ({ carousel, products }: any) => {
  return (
    <main>
      <Slider carousel={carousel} />
      <HotDeal products={products} />
    </main>
  );
};

export default Index;
