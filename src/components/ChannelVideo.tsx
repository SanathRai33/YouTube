import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import axiosInstance from "@/lib/axiosInstance";

const ChannelVideo = ({ user }: any) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && user._id) {
      fetchMyVideos();
    }
  }, [user]);

  const fetchMyVideos = async () => {
    try {
      const res = await axiosInstance.get(`/video/channel/${user._id}`);
      setVideos(res.data);
    } catch (error) {
      console.error("Error loading your videos", error);
      setError("Failed to load your videos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-600 font-medium">
        Loading your videos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500 font-medium">{error}</div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          No videos uploaded yet
        </h3>
        <p className="text-gray-500 max-w-md px-4">
          When you upload videos, they'll appear here for your viewers to watch.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 px-4 sm:px-0">
        Your Uploaded Videos
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1">
        {videos?.map((video: any) => (
          <div>
            <VideoCard
              key={video._id}
              video={video}
              className="max-w-[354px] max-h-[272px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelVideo;
