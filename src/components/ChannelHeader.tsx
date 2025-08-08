import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { Camera } from "lucide-react";
import { toast } from "sonner";

const ChannelHeader = ({ channel, user }: any) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleUploadBanner = async () => {
    if (!bannerFile) {
      alert("Please select a banner image first.");
      return;
    }
    const formData = new FormData();
    formData.append("banner", bannerFile);

    try {
      await axiosInstance.patch(`/user/banner/${user._id}`, formData);
      toast.success("Banner updated!");
    } catch (err) {
      console.error("Error uploading banner:", err);
    }finally {
      setBannerFile(null);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleRedirect = () => {
    window.open("https://myaccount.google.com/personal-info", "_blank");
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 mb-4 sm:mb-6">
      {/* Banner */}
      <div className="w-full bg-amber-200 h-24 lg:h-43 rounded-b-lg rounded-t-2xl sm:h-32 md:h-40 relative overflow-hidden">
        <img
          src={user?.banner || "/default-banner.jpg"}
          alt="Channel Banner"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />

        <span className="absolute bottom-1 right-1">
          {bannerFile && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
              <div className="bg-gray-900 p-6 w-full max-w-md rounded-2xl shadow-2xl transform transition-all scale-95 hover:scale-100">
                <h2 className="text-xl font-semibold text-white mb-4 text-center">
                  Change Channel Banner
                </h2>
                <p className="text-gray-300 text-center mb-6">
                  Do you want to replace your current channel banner with this
                  new one?
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => setBannerFile(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
                    onClick={handleUploadBanner}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          )}{" "}
          <Camera
            color="black"
            className="absolute w-10 bottom-0 right-0 cursor-pointer"
          />{" "}
          <input
            type="file"
            className="text-transparent w-10 absolute z-1 bottom-0 right-0 opacity-0 cursor-pointer"
            // className="text-black bg-amber-500 w-10"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setBannerFile(e.target.files[0]);
              }
            }}
          />
        </span>
      </div>

      {/* Channel Info */}
      <div className="h-[212px] py-4 sm:py-6 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* Avatar - Centered on mobile */}
          <div
            className="relative flex justify-center items-center w-auto sm:block lg:w-40 lg:h-40 sm:w-20 sm:h-20"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Avatar className="w-20 h-20 sm:w-20 sm:h-20 lg:w-40 lg:h-40 text-xl sm:text-3xl">
              <AvatarImage
                src={channel?.image}
                alt="Channel Avatar"
                className="w-full h-full object-cover rounded-full"
              />
              <AvatarFallback className="bg-black text-white uppercase">
                {channel?.channelname?.[0] || "U"}
              </AvatarFallback>
            </Avatar>

            {isHovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
                onClick={handleRedirect}
              >
                <Camera color="white" size={24} />
              </div>
            )}
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
