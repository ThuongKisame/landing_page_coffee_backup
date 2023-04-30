import * as React from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';

import { urlFor } from '@/libs/sanity';
import type Introduce from '@/types/IntroduceType';

export interface IntroduceItemProps {
  item: Introduce;
  handlePlayVideo: (linkVideo: string) => void;
}

export function BlogItemRightImage(props: IntroduceItemProps) {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt="Party"
              src={urlFor(props.item.image).url()}
              className="absolute inset-0 h-full w-full object-cover"
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

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold text-[#E6B325] sm:text-4xl">
              {props.item.title}
            </h2>
            <p className="text-2xl font-medium text-gray-600 sm:text-3xl">
              {props.item.slogan}
            </p>

            <p className="mt-4 text-gray-600">{props.item.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
