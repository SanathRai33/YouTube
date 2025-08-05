import React, { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

const ChannelHeader = ({ channel, user }: any) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="w-full bg-white border-b border-gray-200 mb-4 sm:mb-6">
      {/* Banner */}
      <div className="w-full bg-amber-200 h-24 sm:h-32 md:h-40"></div>
      
      {/* Channel Info */}
      <div className="py-4 sm:py-6 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* Avatar - Centered on mobile */}
          <div className="flex sm:block w-full sm:w-auto justify-center">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-3xl bg-gray-200">
              <AvatarFallback className="bg-black text-white">
                {channel?.channelname[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Channel Details */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {channel?.channelname}
            </h1>
            <div className="mt-1">
              <span className="text-gray-500 text-xs sm:text-sm">
                @{channel?.channelname.toLowerCase().replace(/\s+/g, "")}
              </span>
            </div>
            {channel?.description && (
              <p className="mt-2 text-gray-700 text-sm sm:text-base">
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