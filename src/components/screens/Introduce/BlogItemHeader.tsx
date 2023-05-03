import Link from 'next/link';
import * as React from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';

import { urlFor } from '@/libs/sanity';
import type Introduce from '@/types/IntroduceType';

export interface IntroduceItemProps {
  item: Introduce;
  handlePlayVideo: (linkVideo: string) => void;
}

export function BlogItemHeader(props: IntroduceItemProps) {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <img
                alt="House"
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
          </div>

          <div className="relative flex items-center bg-gray-100">
            <span className="hidden lg:absolute lg:inset-y-0 lg:-left-16 lg:block lg:w-16 lg:bg-gray-100"></span>

            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-3xl font-bold text-[#E6B325] sm:text-4xl">
                {props.item.title}
              </h2>
              <p className="text-2xl font-medium text-gray-600 sm:text-3xl">
                {props.item.slogan}
              </p>

              <p className="mt-4 text-gray-600">{props.item.description}</p>

              <Link
                href="/shop"
                className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              >
                Xem cửa hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
