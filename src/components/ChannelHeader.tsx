import React, { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

const ChannelHeader = ({ channel, user }: any) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="w-full bg-white border-b border-gray-200 mb-6">
      <div className="w-full bg-amber-200 min-h-50"></div>
      <div className=" py-6 px-4">
        <div className="flex items-center gap-5">
          <Avatar className="w-20 h-20 text-3xl bg-gray-200">
            <AvatarFallback>{channel.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{channel.name}</h1>
            <div className="mt-1">
              <span className="text-gray-500 text-sm">
                @{channel.name.toLowerCase().replace(/\s+/g, "")}
              </span>
            </div>
            {channel.description && (
              <p className="mt-2 text-gray-700">{channel.description}</p>
            )}
          </div>
          {/* Show Subscribe button only if user is NOT the channel owner */}
          {user && user.id !== channel.id && (
            <div className="ml-auto">
              <Button
                onClick={() => setIsSubscribed((prev) => !prev)}
                className={`mt-3 px-5 py-2 rounded-full text-sm font-semibold transition
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
