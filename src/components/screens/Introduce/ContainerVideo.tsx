import * as React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import YouTube from 'react-youtube';

import OutsideAlerter from '@/hooks/useOutsideAlerter';

export interface IAppProps {
  handleCloseVideo: () => {};
  video: string;
}

export default function App(props: IAppProps) {
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <div
      className="fixed left-0  top-0 z-50 flex h-full w-full items-center justify-center "
      style={{ backgroundColor: 'rgba(69, 90, 100, 0.7)' }}
    >
      <OutsideAlerter action={props.handleCloseVideo}>
        <YouTube videoId={props.video} opts={opts} />
      </OutsideAlerter>
      <span
        className="absolute right-4 top-4 p-2 text-white hover:cursor-pointer"
        onClick={props.handleCloseVideo}
      >
        <IoCloseSharp size={32} />
      </span>
    </div>
  );
}
