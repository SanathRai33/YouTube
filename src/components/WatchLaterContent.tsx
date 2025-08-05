import { formatDistanceToNow } from "date-fns";
import { Clock, MoreVertical } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { useUser } from "@/lib/AuthContext";

const WatchLaterContent = () => {

  const { user } = useUser();

  const [watchLater, setWatchLater] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSaved();
    } else {
      setLoading(true);
    }
  }, [user]);

  const loadSaved = async () => {
    if (!user) return;

    try {
      const WatchLaterData = await axiosInstance.get(`/watch/${user?._id}`);
      setWatchLater(WatchLaterData.data);
    } catch (error) {
      console.error("Failed to load Watch Later:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWatchLater = async (watchLaterId: string) => {
    try {
      setWatchLater((prev) => prev.filter((item) => item._id !== watchLaterId));
    } catch (error) {
      console.error("Failed to remove watch later:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-black">
        <Clock className="w-10 h-10 mb-2" />
        <h2 className="text-lg font-semibold mb-1">
          Keep track of what you watch
        </h2>
        <p className="text-sm">Watch later is not viewable when signed out.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="py-10 text-center text-gray-500">Loading...</div>;
  }

  if (watchLater.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-black">
        <Clock className="w-10 h-10 mb-2" />
        <h2 className="text-lg font-semibold mb-1">No watch later</h2>
        <p className="text-sm">Save videos to see your watch later here.</p>
      </div>
    );
  }

  return (
    <div className="min-w-full mx-auto px-2 sm:px-4">
      <div className="mb-4">
        <p className="text-black font-medium">{watchLater.length} Videos</p>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {watchLater.map((item, index) => (
          <div
            key={item?._id}
            className="flex flex-col sm:flex-row max-w-full sm:max-w-125 gap-3 bg-white hover:shadow-lg transition p-3 sm:p-4 items-start"
          >
            <div
              key={item?._id}
              className="flex flex-row lg:gap-3 gap-1 sm:gap-1 w-full"
            >
              <div className="flex gap-3 w-50 h-[113px]">
                <Link
                  href={`/watch/${item?.videoid._id}`}
                  className="block flex-shrink-0 rounded overflow-hidden group"
                >
                  <video
                    src={item?.videoid?.filepath}
                    className="object-cover h-[113px] sm:h-28 w-50 bg-black rounded"
                    muted
                    controls={false}
                    preload="metadata"
                    // poster={item.video.thumbnail}
                  />
                </Link>
              </div>

              <div className="flex-1 min-w-0 flex flex-row gap-3 sm:gap-0 w-full">
                <div className="flex-1 w-23">
                  <Link
                    href={`/watch/${item.videoid._id}`}
                    className="block group"
                  >
                    <h3 className="text-sm h-6 sm:text-base font-extrabold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
                      {item.videoid.videotitle}
                    </h3>
                    <p className="text-xs text-gray-500 truncate font-bold">
                      {item.videoid.videochannel}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 lg:flex hidden">
                      {Number(item.videoid.views).toLocaleString()} views
                      &middot;{" "}
                      {formatDistanceToNow(new Date(item.videoid.createdAt))}{" "}
                      ago
                    </p>
                    <p className="text-xs text-gray-400 lg:flex hidden">
                      Saved {formatDistanceToNow(new Date(item.createdAt))} ago
                    </p>
                  </Link>
                </div>

                <div className="self-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-red-500 h-8 w-8"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleRemoveWatchLater(item._id)}
                        className="text-sm"
                      >
                        Remove from watch later
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchLaterContent;
