import React, { useRef } from "react";

function VideoPlayer({ video }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden w-full">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        poster={video?.thumbnail || "/placeholder-video.jpg"}
        preload="metadata"
        playsInline // Important for mobile browsers
      >
        <source
          src={`${process.env.BACKEND_URL}${video?.filepath}`}
          type="video/mp4"
        />
        <source
          src={`${process.env.BACKEND_URL}${video?.filepath.replace(
            ".mp4",
            ".webm"
          )}`}
          type="video/webm"
        />
        <track
          kind="captions"
          src={`${process.env.BACKEND_URL}${video?.filepath.replace(
            ".mp4",
            ".vtt"
          )}`}
          srcLang="en"
          label="English"
          default
        />
        <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-900">
          Your browser doesn't support HTML5 video.
        </div>
      </video>
    </div>
  );
}

export default VideoPlayer;
