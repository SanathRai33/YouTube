import React, { useRef } from "react";

function VideoPlayer({ video }: any) {

  const videoRef = useRef<HTMLVideoElement>(null);

  console.log("VideoPlayer file path:", video?.filepath);

  console.log("URL1",`http://localhost:5000/${video?.filepath}`)
  console.log("URL3", `${process.env.BACKEND_URL}${video?.filepath}`)


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
