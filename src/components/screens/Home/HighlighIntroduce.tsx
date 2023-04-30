import React, { useCallback, useState } from 'react';

import ContainerVideo from '@/components/screens/Introduce/ContainerVideo';
import type Introduce from '@/types/IntroduceType';
import { YouTubeGetID } from '@/utils';

import { BlogItemHeader } from '../Introduce/BlogItemHeader';
import { BlogItemLeftImage } from '../Introduce/BlogItemLeftImage';
import { BlogItemRightImage } from '../Introduce/BlogItemRightImage';

function HighlighIntroduce({ introduces }: any) {
  const [video, setVideo] = useState<string>('');
  const [playing, setPlaying] = React.useState<boolean>(false);

  const handlePlayVideo = useCallback((linkVideo: string) => {
    setPlaying(true);
    setVideo(linkVideo);
  }, []);

  const handleCloseVideo = useCallback((): {} => {
    setPlaying(false);
    return {};
  }, []);

  const introducesAPI = introduces ?? [];
  /* eslint-disable */
  const introduce = introducesAPI.map((item: any) => ({
    title: item?.title,
    slogan: item?.slogan,
    description: item?.description[0]?.children[0]?.text,
    image: item?.image?.asset?._ref,
    linkVideo: item?.linkVideo && YouTubeGetID(item?.linkVideo),
  }));
  /* eslint-enable */
  return (
    <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="flex w-full justify-center">
        <div className="w-3/4 border-t border-dashed border-gray-400"></div>
      </div>
      <header className="pt-24  text-center">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Hiểu hơn về MrgoCoffee
        </h2>

        <p className="mx-auto mt-4 max-w-lg pb-8 text-gray-500">
          MrgoCoffee - Chuyên cung cấp cà phê rang xay chất lượng và thơm ngon
        </p>
      </header>
      {introduce?.map((item: Introduce, index: number) => {
        if (index === 0) {
          return (
            <BlogItemHeader
              handlePlayVideo={handlePlayVideo}
              item={item}
              key={index}
            />
          );
        }
        if (index % 2 === 0) {
          return (
            <BlogItemLeftImage
              handlePlayVideo={handlePlayVideo}
              item={item}
              key={index}
            />
          );
        }
        return (
          <BlogItemRightImage
            handlePlayVideo={handlePlayVideo}
            item={item}
            key={index}
          />
        );
      })}
      {playing && video && (
        <ContainerVideo handleCloseVideo={handleCloseVideo} video={video} />
      )}
    </div>
  );
}

export default HighlighIntroduce;
