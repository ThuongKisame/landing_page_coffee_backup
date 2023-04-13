import React from 'react';

import HotDeal from './HotDeal';
import Slider from './Slider';

const Index = ({ carousel }: any) => {
  return (
    <main>
      <Slider carousel={carousel} />
      <HotDeal />
    </main>
  );
};

export default Index;
