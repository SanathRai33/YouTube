import Link from 'next/link';
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar';
import { formatDistanceToNow } from 'date-fns';

function Videocard({video}:any) {
    const videos = "/videos/vdo.mp4";
  return (
    <Link href={`/watch/${video._id}`} className="block mb-6 group">
        <div className="rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition">
            <div className="relative">
                <video 
                  src={videos} 
                  className="object-cover w-full h-44 bg-black" 
                  muted 
                  controls={false} 
                  preload="metadata"
                  poster={video.thumbnail}
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  10:24
                </div>
            </div>
            <div className="flex items-start gap-3 p-3">
                <Avatar className="w-9 h-9">
                    <AvatarFallback>{video.videochannel[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">{video.title}</h3>
                    <p className="text-xs text-gray-600 truncate">{video.videochannel}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {video.views?.toLocaleString()} views &middot; {formatDistanceToNow(new Date(video.createdAt))} ago
                    </p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default Videocard;