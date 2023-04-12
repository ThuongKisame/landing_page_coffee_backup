import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Slider = () => {
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
      <div>
        <img src="/assets/logo/image1.jpg" alt="img" />
      </div>
      <div>
        <img src="/assets/logo/image2.jpg" alt="img" />
      </div>
    </Carousel>
  );
};

export default Slider;
