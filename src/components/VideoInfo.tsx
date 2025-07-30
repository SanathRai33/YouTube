import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  LucideDownload,
  MoreHorizontal,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/lib/AuthContext";

function VideoInfo({ video }: any) {
  const [like, setLike] = useState(video.like || 0);
  const [dislike, setDisLike] = useState(video.dislike || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    setLike(video.like || 0);
    setDisLike(video.dislike || 0);
    setIsLiked(false);
    setIsDisliked(false);
  }, [video]);

  const handleLike = () => {
    if (!user) return;
    if (isLiked) {
      setLike((prev: any) => prev - 1);
      setIsLiked(false);
    } else {
      setLike((prev: any) => prev + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDisLike((prev: any) => prev - 1);
        setIsDisliked(false);
      }
    }
    setIsLiked(!isLiked);
  };

  const handleDislike = () => {
    if (!user) return;
    if (isDisliked) {
      setDisLike((prev: any) => prev - 1);
      setIsDisliked(false);
    } else {
      setDisLike((prev: any) => prev + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLike((prev: any) => prev - 1);
        setIsLiked(false);
      }
    }
    setIsDisliked(!isDisliked);
  };

  return (
    <div className="bg-white p-4 rounded-lg gap-2 text-black">
      <h1 className=" font-bold text-2xl">
        {video.videotitle || "Survive 100 days"}
      </h1>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center justify-start space-x-4 w-full">
          <Avatar className="w-10 h-10 bg-black">
            <AvatarFallback>
              {video.videochannel.charAt(0) ||
                "https://static.wikia.nocookie.net/dream_team/images/7/79/Mrbeastlogo.jpg/revision/latest?cb=20230125153030"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="">{video.videochannel || "New thing"}</h3>
            <p className=""> 1.2M subscribers</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Button
              className="bg-gray-200 "
              onClick={handleLike}
              variant={isLiked ? "secondary" : "outline"}
            >
              <ThumbsUp className="" />
              Like {video.like || 0}
            </Button>
            <Button
              className="bg-gray-200 "
              onClick={handleDislike}
              variant={isLiked ? "secondary" : "outline"}
            >
              <ThumbsDown className="" />
              Dislike {video.dislike || 0}
            </Button>
            <Button className="bg-gray-200 text-black hover:bg-gray-300">
              <Share2 className="">Share</Share2>
            </Button>
            <Button className="bg-gray-200 text-black hover:bg-gray-300">
              <LucideDownload className="">Download</LucideDownload>
            </Button>
            <Button className="bg-gray-200 text-black hover:bg-gray-300">
              <MoreHorizontal className="" />
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-2 rounded-md">
        <div className="flex items-center justify-between">
          <span>{video.views?.toLocaleString() || 100} views</span>
          {video.createdAt ? (
            <span>{formatDistanceToNow(new Date(video.createdAt))} ago</span>
          ) : (
            <span>12-06-2023</span>
          )}
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A sapiente
            suscipit magni error maiore voluptatibus, cumque, doloribus
          </p>
        </div>
        <Button className="bg-transperant text-black shadow-none p-0">
          {showFullDescription ? "Show less" : "Show more"}
        </Button>
      </div>
    </div>
  );
}

export default VideoInfo;
