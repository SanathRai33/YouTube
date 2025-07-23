import Link from 'next/link';
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar';
import { formatDistanceToNow } from 'date-fns';

function Videocard({video}:any) {
    const videos = "/videos/vdo.mp4";
  return (
    <Link href={`/watch/${video._id}`} className="block mb-4">
        <div>
            <div>
                <video src={videos} className='object-cover' />
                <div>10:24</div>
                <div>
                    <Avatar>
                        <AvatarFallback>{video.videochannel[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3>{video.title}</h3>
                        <p>{video.videochannel}</p>
                        <p>{video.views/*.toISOString()*/} views {formatDistanceToNow(new Date(video.createdAt))} ago</p>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default Videocard;
