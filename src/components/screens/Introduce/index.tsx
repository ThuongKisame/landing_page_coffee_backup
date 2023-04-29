import React, { useCallback, useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';

import Skeleton from '@/components/common/Skeleton';
import YoutubeEmbed from '@/components/common/YoutubeEmbed';
import { getAllIntroduce } from '@/libs/getData';
import type Introduce from '@/types/IntroduceType';
import { YouTubeGetID } from '@/utils';

import { BlogItemHeader } from './BlogItemHeader';
import { BlogItemLeftImage } from './BlogItemLeftImage';
import { BlogItemRightImage } from './BlogItemRightImage';

const Index = () => {
  const [introduces, setIntroduce] = useState<[Introduce]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [video, setVideo] = useState<string>('');
  const [playing, setPlaying] = React.useState<boolean>(false);

  const handlePlayVideo = useCallback((linkVideo: string) => {
    setPlaying(true);
    setVideo(linkVideo);
  }, []);

  useEffect(() => {
    const fetchListIntroduce = async () => {
      setIsLoading(true);
      try {
        const data = await getAllIntroduce();
        const introducesAPI = data ?? [];
        /* eslint-disable */
        const introducesConvert = introducesAPI.map((item: any) => ({
          title: item?.title,
          slogun: item?.slogun,
          description: item?.description[0]?.children[0]?.text,
          image: item?.image?.asset?._ref,
          linkVideo: item?.linkVideo && YouTubeGetID(item?.linkVideo),
        }));
         /* eslint-enable */
        setIntroduce(introducesConvert);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchListIntroduce();
  }, []);

  return isLoading ? (
    <>{<Skeleton />}</>
  ) : (
    <>
      {introduces?.map((item: Introduce, index: number) => {
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
        <div
          className="fixed left-0  top-0 z-50 flex h-full w-full items-center justify-center "
          style={{ backgroundColor: 'rgba(69, 90, 100, 0.7)' }}
        >
          <div className="aspect-video h-auto w-[40rem]">
            <YoutubeEmbed embedId={video} />
          </div>

          <span
            className="absolute right-4 top-4 p-2 hover:cursor-pointer "
            onClick={() => setPlaying(false)}
          >
            <GrClose size={32} />
          </span>
        </div>
      )}
    </>
  );
};

export default Index;
