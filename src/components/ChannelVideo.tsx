import React from "react";
import VideoCard from "./VideoCard";

const ChannelVideo = ({ videos }: any) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p>No videos uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video: any) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default ChannelVideo;