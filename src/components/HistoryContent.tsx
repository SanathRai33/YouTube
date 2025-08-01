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

const HistoryContent = () => {
  const videos = "/videos/vdo.mp4";

  const { user } = useUser();

  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadHistory();
    } else {
      setLoading(true);
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;

    try {
      const HistoryData = await axiosInstance.get(`/history/${user?._id}`);
      setHistory(HistoryData.data);
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveHistory = async (historyId: string) => {
    try {
      setHistory((prev) => prev.filter((item) => item._id !== historyId));
    } catch (error) {
      console.error("Failed to remove history:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-black">
        <Clock className="w-10 h-10 mb-2" />
        <h2 className="text-lg font-semibold mb-1">
          Keep track of what you watch
        </h2>
        <p className="text-sm">
          Watch history is not viewable when signed out.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="py-10 text-center text-gray-500">Loading...</div>;
  }

  if (history?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-black">
        <Clock className="w-10 h-10 mb-2" />
        <h2 className="text-lg font-semibold mb-1">No watch history</h2>
        <p className="text-sm">Watch videos to see your history here.</p>
      </div>
    );
  }

  console.log("history", history);

  return (
    <div className="min-w-full mx-auto px-2 ">
      <div className="mb-4">
        <p className="text-black font-medium">{history.length} Videos</p>
      </div>
      <div className="space-y-6">
        {history?.map((item, index) => (
          <div
            key={item._id}
            className="flex max-w-125 gap-4 bg-white hover:shadow-lg transition p-4 items-center justify-center"
          >
            <p>{index + 1}.</p>
            <div key={item._id} className="flex gap-4 items-start">
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
                <Link
                  href={`/watch/${item.videoid._id}`}
                  className="block group"
                >
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
                    Watched {formatDistanceToNow(new Date(item.createdAt))} ago
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
                    onClick={() => handleRemoveHistory(item._id)}
                  >
                    Remove from history
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryContent;
