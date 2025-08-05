import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Clock,
  LucideDownload,
  MoreHorizontal,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosInstance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

function VideoInfo({ video }: any) {
  const [like, setLike] = useState(video.like || 0);
  const [dislike, setDisLike] = useState(video.dislike || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);

  const { user } = useUser();

  useEffect(() => {
    setLike(video.like || 0);
    setDisLike(video.dislike || 0);
    setIsLiked(false);
    setIsDisliked(false);
  }, [video]);

  useEffect(() => {
    const handleView = async () => {
      if (user) {
        try {
          return await axiosInstance.post(`/history/${video?._id}`, {
            userId: user?._id,
          });
        } catch (error) {
          return console.log(error);
        }
      } else {
        return await axiosInstance.post(`/history/views/${video?._id}`);
      }
    };
    handleView();
  }, [user]);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!user || !video?.uploader) return;

      try {
        const [subsRes, mySubRes] = await Promise.all([
          axiosInstance.get(`/subscription/subscribers/${video.uploader}`),
          axiosInstance.get(`/subscription/${user._id}/${video.uploader}`),
        ]);

        setSubscriberCount(subsRes.data.length);
        setIsSubscribed(mySubRes.data.isSubscribed);
      } catch (error) {
        console.log("Subscription error", error);
      }
    };

    fetchSubscriptionStatus();
  }, [video, user]);

  const handleSubscribe = async () => {
    if (!user) {
      alert("Login before subscribe!");
      return;
    }
    if (!video?.uploader) return;
    if (user._id === video.uploader) {
      alert("You cannot subscribe to your own channel.");
      return;
    }

    try {
      if (isSubscribed) {
        await axiosInstance.post(`/subscription/unsubscribe`, {
          subscriberId: user._id,
          channelId: video.uploader,
        });
        setIsSubscribed(false);
        setSubscriberCount((prev) => prev - 1);
      } else {
        await axiosInstance.post(`/subscription/subscribe`, {
          subscriberId: user._id,
          channelId: video.uploader,
        });
        setIsSubscribed(true);
        setSubscriberCount((prev) => prev + 1);
      }
    } catch (error) {
      console.log("Subscription toggle failed", error);
    }
  };

  const handleLike = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.post(`/like/${video._id}`, {
        userId: user?._id,
      });
      if (res.data.liked) {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.post(`/like/${video._id}`, {
        userId: user?._id,
      });
      if (res.data.liked) {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatchLater = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.post(`/watch/${video._id}`, {
        userId: user?._id,
      });
      if (res.data.watchLater) {
        setIsSaved(!isSaved);
      } else {
        setIsSaved(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg gap-2 text-black">
      {/* Video Title */}
      <h1 className="font-bold text-xl sm:text-2xl">
        {video.videotitle || "Survive 100 days"}
      </h1>

      {/* Channel Info and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-3">
        {/* Channel Section */}
        <div className="flex items-center justify-start space-x-3 w-full sm:w-auto">
          <Avatar className="w-9 h-9 sm:w-10 sm:h-10 bg-black">
            <AvatarImage src={video.uploader?.image} />
            <AvatarFallback>
              {video.uploader?.channelname?.charAt(0) || "N"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-medium">
              {video.videochannel || "New thing"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              {subscriberCount.toLocaleString()} subscribers
            </p>
          </div>
          <Button
            onClick={handleSubscribe}
            className={`${
              isSubscribed ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            } text-xs sm:text-sm h-8 sm:h-9 ml-auto sm:ml-0`}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden sm:flex items-center flex-wrap gap-2">
          <div>
            <Button
              variant={isLiked ? "secondary" : "outline"}
              className="gap-1 bg-white rounded-l-full"
              onClick={handleLike}
            >
              <ThumbsUp size={16} />
              <span>Like {like || 0}</span>
            </Button>
            <Button
              variant={isDisliked ? "secondary" : "outline"}
              className="gap-1 bg-white rounded-r-full"
              onClick={handleDislike}
            >
              <ThumbsDown size={16} />
            </Button>
          </div>
          <Button
            variant="outline"
            className="gap-1 bg-white rounded-full"
            onClick={handleWatchLater}
          >
            <Clock size={16} />
            <span>{isSaved ? "Saved" : "Watch Later"}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-white rounded-full"
              >
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Button
                  // variant="outline"
                  className="gap-1 bg-white text-black hover:bg-gray-50"
                >
                  <LucideDownload size={16} />
                  <span>Download</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  // variant="outline"
                  className="gap-1 bg-white text-black hover:bg-gray-50"
                  onClick={handleWatchLater}
                >
                  <Clock size={16} />
                  <span>{isSaved ? "Saved" : "Watch Later"}</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Action Buttons - Mobile (Simplified) */}
        <div className="sm:hidden flex items-center justify-between gap-2 overflow-x-auto w-full pb-2 hide-scrollbar">
          <div className=" flex items-center gap-2">
            <div>
              <Button
                variant={isLiked ? "secondary" : "outline"}
                size="sm"
                className="gap-1 bg-white rounded-l-full"
                onClick={handleLike}
              >
                <ThumbsUp size={14} />
                <span>{like || 0}</span>
              </Button>
              <Button
                variant={isDisliked ? "secondary" : "outline"}
                size="sm"
                className="gap-1 bg-white rounded-r-full"
                onClick={handleDislike}
              >
                <ThumbsDown size={14} />
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 bg-white rounded-full"
            >
              <Share2 size={14} /> Share
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="self-end">
              <Button
                variant="outline"
                size="icon"
                className="bg-white rounded-full"
              >
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Button
                  // variant="outline"
                  className="gap-1 bg-white text-black hover:bg-gray-50"
                >
                  <LucideDownload size={16} />
                  <span>Download</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  // variant="outline"
                  className="gap-1 bg-white text-black hover:bg-gray-50"
                  onClick={handleWatchLater}
                >
                  <Clock size={16} />
                  <span>{isSaved ? "Saved" : "Watch Later"}</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Video Description */}
      <div className="bg-gray-100 p-3 rounded-md mt-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
          <span className="text-sm font-medium">
            {video.views?.toLocaleString() || 100} views
          </span>
          <span className="text-sm text-gray-600">
            {video.createdAt
              ? formatDistanceToNow(new Date(video.createdAt)) + " ago"
              : "12-06-2023"}
          </span>
        </div>
        <div className="mt-2">
          <p
            className={`text-sm ${!showFullDescription ? "line-clamp-2" : ""}`}
          >
            {video.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. A sapiente suscipit magni error maiore voluptatibus, cumque, doloribus"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-black hover:bg-transparent px-0 mt-1"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? "Show less" : "Show more"}
        </Button>
      </div>
    </div>
  );
}

export default VideoInfo;
