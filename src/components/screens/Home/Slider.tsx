import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import { urlFor } from '@/libs/sanity';

const Slider = ({ carousel }: any) => {
  return (
    <Carousel
      showArrows
      autoPlay
      showThumbs={false}
      infiniteLoop
      swipeable
      emulateTouch
      // onChange={onChange}
      // onClickItem={onClickItem}
      // onClickThumb={onClickThumb}
    >
      {carousel[0].images.map((item: any, index: any) => (
        <div key={index}>
          {/* eslint-disable-next-line */}
          <img src={urlFor(item.asset._ref).url()} alt="img" />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
