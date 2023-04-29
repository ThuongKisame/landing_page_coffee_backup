import * as React from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';

import { urlFor } from '@/libs/sanity';
import type Introduce from '@/types/IntroduceType';

export interface IntroduceItemProps {
  item: Introduce;
  handlePlayVideo: (linkVideo: string) => void;
}

export function BlogItemLeftImage(props: IntroduceItemProps) {
  return (
    <section className="mx-auto overflow-hidden bg-gray-50 px-4 py-8 sm:grid sm:grid-cols-2 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative">
        <img
          alt="Student"
          src={urlFor(props.item.image).url()}
          className="h-56 w-full object-cover sm:h-full"
        />
        {props.item.linkVideo && (
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white hover:cursor-pointer"
            onClick={() => props.handlePlayVideo(props.item.linkVideo)}
          >
            <BsFillPlayCircleFill size={32} />
          </span>
        )}
      </div>

      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold  text-[#E6B325] md:text-3xl">
            {props.item.title}
          </h2>
          <p className="text-2xl font-medium text-gray-600 sm:text-3xl">
            {props.item.slogun}
          </p>

          <p className=" text-gray-500 md:mt-4 md:block">
            {props.item.description}
          </p>
        </div>
      </div>
    </section>
  );
}
