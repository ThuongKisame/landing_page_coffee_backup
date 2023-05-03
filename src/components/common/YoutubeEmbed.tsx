import React from 'react';

const YoutubeEmbed = ({ embedId }: { embedId: string }) => {
  return (
    <div className="relative aspect-video h-auto w-screen overflow-hidden rounded-md bg-gray-300 lg:w-[40rem]">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
