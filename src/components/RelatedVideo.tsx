import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";
const vid = "./video/video.mp4";

const RelatedVideo = ({ videos }: any) => {
  return (
    <div className="space-y-4">
      {videos.map((video: any) => (
        <Link
          key={video._id}
          href={`/watch/${video._id}`}
          className="flex items-start gap-3 bg-white rounded-lg hover:shadow-md transition p-2"
        >
          <div className="w-32 h-20 flex-shrink-0 rounded overflow-hidden bg-black">
            <video
              src={vid}
              className="object-cover w-full h-full"
              muted
              controls={false}
              preload="metadata"
              poster={video.thumbnail}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{video.videotitle}</h3>
            <p className="text-xs text-gray-600 truncate">{video.videochannel}</p>
            <p className="text-xs text-gray-500 mt-1">
              {video.views?.toLocaleString()} views &middot; {formatDistanceToNow(new Date(video.createdAt))} ago
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedVideo;