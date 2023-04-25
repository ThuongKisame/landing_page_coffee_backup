import React, { useState } from 'react';

const ImagesProduct = ({ images }: { images: string[] }) => {
  const [activeImage, setActiveImage] = useState<number>(0);

  return (
    <div className="lg:col-span-3">
      <div className="relative mt-4">
        <img
          alt="image product"
          src={images[activeImage]}
          className="h-72 w-full rounded-xl object-cover lg:h-[540px]"
        />
      </div>

      <ul className="mt-1 flex gap-1">
        {images.map((url, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                setActiveImage(index);
              }}
              className={`rounded ${index === activeImage && 'ring-2'}`}
            >
              <img
                alt="small image"
                src={url}
                className="h-16 w-16 rounded-md object-cover"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImagesProduct;
