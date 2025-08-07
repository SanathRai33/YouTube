import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import axiosInstance from "@/lib/axiosInstance";

const ChannelHeader = ({ channel, user }: any) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!user) return;
      try {
        const [subsRes] = await Promise.all([
          axiosInstance.get(`/subscription/subscribers/${user._id}`),
        ]);
        setSubscriberCount(subsRes.data.length);
      } catch (error) {
        console.log("Subscription error", error);
      }
    };

    fetchSubscriptionStatus();
  }, [user]);

  useEffect(() => {
    const fetchMyVideos = async () => {
      if (!user) return;
      try {
        const res = await axiosInstance.get(`/video/channel/${user._id}`);
        setVideoCount(res.data.length);
      } catch (error) {
        console.error("Error loading video count", error);
      }
    };

    fetchMyVideos();
  }, [user]);

  return (
    <div className="w-full bg-white border-b border-gray-200 mb-4 sm:mb-6">
      {/* Banner */}
      <div className="w-full bg-amber-200 h-24 lg:h-43 rounded-b-lg rounded-t-2xl sm:h-32 md:h-40"></div>

      {/* Channel Info */}
      <div className="h-[212px] py-4 sm:py-6 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* Avatar - Centered on mobile */}
          <div className="lg:w-40 lg:h-40 flex sm:block sm:w-auto justify-center content-center">
            <Avatar className="lg:w-40 lg:h-40 sm:w-20 sm:h-20 text-xl sm:text-3xl">
              <AvatarImage src={channel?.image} className="lg:w-40 lg:h-40" />
              <AvatarFallback className="bg-black text-white">
                {channel?.channelname[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Channel Details */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl lg:text-4xl sm:text-2xl font-bold text-gray-900">
              {channel?.channelname}
            </h1>
            <div className="flex mt-1 gap-3 items-center">
              <span className="text-black text-xs sm:text-sm">
                @{channel?.channelname.toLowerCase().replace(/\s+/g, "")}
              </span>
              <span className="text-black h-1 w-1 lg:text-3xl text-lg sm:text-sm bg-black rounded-full">
                {/* &nbsp;·&nbsp; */}
              </span>
              <span className="text-gray-700 text-xs sm:text-sm">
                {subscriberCount.toLocaleString()} subscribers
              </span>
              <span className="text-black h-1 w-1 lg:text-3xl text-lg sm:text-sm bg-black rounded-full">
                {/* &nbsp;·&nbsp; */}
              </span>
              <span className="text-gray-700 text-xs sm:text-sm">
                {videoCount.toLocaleString()} videos
              </span>
            </div>
            {channel?.description && (
              <p className="mt-2 text-gray-700 text-xs sm:text-sm">
                {channel?.description}
              </p>
            )}
          </div>

          {user && user?._id !== channel?._id && (
            <div className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-auto">
              <Button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`w-full sm:w-auto px-5 py-2 rounded-full text-sm font-semibold transition
                  ${
                    isSubscribed
                      ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }
                `}
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;
