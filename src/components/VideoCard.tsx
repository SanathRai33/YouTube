import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";

function VideoCard({ video }: any) {
  return (
    <Link
      href={`/watch/${video?._id}`}
      className="block mb-4 md:mb-6 group box-border w-full sm:w-[calc(50%-12px)] md:w-[400px]"
    >
      <div className="rounded-lg overflow-hidden w-full h-auto bg-white shadow hover:shadow-lg transition">
        <div className="relative aspect-video">
          <video
            src={`${process.env.BACKEND_URL}/${video?.filepath}`}
            className="object-cover w-full h-full bg-black"
            muted
            controls={false}
            preload="metadata"
            poster={video?.thumbnail}
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            10:24
          </div>
        </div>
        <div className="flex items-start gap-3 p-3">
          <Avatar className="w-9 h-9 md:w-10 md:h-10 flex-shrink-0">
            <AvatarFallback>{video?.videochannel?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-[18px] font-semibold text-black line-clamp-2">
              {video?.videotitle}
            </h3>
            <p className="text-sm text-gray-600 truncate mt-1">
              {video?.videochannel}
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              {video?.views?.toLocaleString()} views &middot;{" "}
              {formatDistanceToNow(new Date(video?.createdAt))} ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
