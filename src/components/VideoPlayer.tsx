import React, { useRef } from "react";

function VideoPlayer({ video }: any) {
  // const videoRef = useRef<HTMLVideoElement>(null);

  return video.public_id ? (
    <iframe
      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
      allowFullScreen
      frameBorder="0"
      width="100%"
      height="100%"
      src={`https://player.cloudinary.com/embed/?cloud_name=${process.env.CLOUDINARY_CLOUD_NAME}&public_id=${video.public_id}`}
    ></iframe>
  ) : (
    <video
      className="w-full h-full object-contain"
      controls
      src={video.filepath}
    />
  );
}

export default VideoPlayer;
