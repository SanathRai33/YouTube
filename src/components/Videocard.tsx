import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";

function VideoCard({ video }: any) {
  return (
    <Link href={`/watch/${video?._id}`} className="block mb-6 group box-border">
      <div className="rounded-lg overflow-hidden w-[400px] h-[350px] bg-white shadow hover:shadow-lg transition">
        <div className="relative">
          <video
            src={`${process.env.BACKEND_URL}/${video?.filepath}`}
            className="object-cover w-full h-[225px] bg-black"
            muted
            controls={false}
            preload="metadata"
            poster={video?.thumbnail}
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            10:24
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 h-[100px] box-border">
          <Avatar className="w-10 h-10">
            <AvatarFallback>{video?.videochannel}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-[20px] font-semibold text-black truncate">
              {video?.videotitle}
            </h3>
            <p className="text-[14px] text-gray-600 truncate mt-1">
              {video?.videochannel}
            </p>
            <p className="text-[14px] text-gray-500">
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
