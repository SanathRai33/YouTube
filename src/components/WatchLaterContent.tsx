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
  const videos = "/videos/vdo.mp4";

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
    <div className="min-w-full mx-auto px-2 ">
      <div className="mb-4">
        <p className="text-black font-medium">{watchLater.length} Videos</p>
      </div>
      <div className="space-y-6">
        {watchLater.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 bg-white shadow hover:shadow-lg transition p-4 items-start"
          >
            <Link
              href={`/watch/${item.videoid._id}`}
              className="block w-48 flex-shrink-0 rounded overflow-hidden group"
            >
              <video
                src={videos}
                className="object-cover w-full h-28 bg-black rounded"
                muted
                controls={false}
                preload="metadata"
                // poster={item.video.thumbnail}
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/watch/${item.videoid._id}`} className="block group">
                <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600 transition">
                  {item.videoid.videotitle}
                </h3>
                <p className="text-xs text-black truncate">
                  {item.videoid.videochannel}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {Number(item.videoid.views).toLocaleString()} views &middot;{" "}
                  {formatDistanceToNow(new Date(item.videoid.createdAt))} ago
                </p>
                <p className="text-xs text-gray-400">
                  Saved {formatDistanceToNow(new Date(item.createdAt))} ago
                </p>
              </Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-red-500"
                >
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleRemoveWatchLater(item._id)}
                >
                  Remove from watch later
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchLaterContent;
