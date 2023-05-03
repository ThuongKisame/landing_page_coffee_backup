import React from 'react';

import HighlighIntroduce from './HighlighIntroduce';
import HotDeal from './HotDeal';
import Slider from './Slider';

const Index = ({ carousel, products, introduces }: any) => {
  return (
    <main>
      <Slider carousel={carousel} />
      <HotDeal products={products} />
      <HighlighIntroduce introduces={introduces} />
    </main>
  );
};

export default Index;
