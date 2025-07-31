import React, { useRef } from "react";

function VideoPlayer({ video }: any) {

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <video ref={videoRef} className="w-full h-full" controls poster={`placeholder/`}>
        <source
          src={`${process.env.BACKEND_URL}${video?.filepath}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
