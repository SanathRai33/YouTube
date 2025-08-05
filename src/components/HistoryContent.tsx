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
      setHistory(history.filter((item) => item._id !== historyId));
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

  return (
    <div className="w-full mx-auto px-2 sm:px-4">
      <div className="mb-4">
        <p className="text-black font-medium text-sm sm:text-base">
          {history.length} {history.length === 1 ? "Video" : "Videos"}
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {history?.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row gap-3 bg-white hover:shadow-md transition p-3 sm:p-4 rounded-lg"
          >
            {/* Index number - hidden on mobile */}
            <p className="hidden sm:block text-gray-500 w-6">{index + 1}.</p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Video thumbnail */}
              <Link
                href={`/watch/${item?.videoid._id}`}
                className="block w-full sm:w-40 flex-shrink-0 rounded overflow-hidden group"
              >
                <video
                  src={item?.videoid?.filepath}
                  className="object-cover w-full h-32 sm:h-24 bg-black rounded"
                  muted
                  controls={false}
                  preload="metadata"
                />
              </Link>

              {/* Video info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <Link
                  href={`/watch/${item.videoid._id}`}
                  className="block group"
                >
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
                    {item.videoid.videotitle}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {item.videoid.videochannel}
                  </p>
                </Link>

                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    {Number(item.videoid.views).toLocaleString()} views &middot;{" "}
                    {formatDistanceToNow(new Date(item.videoid.createdAt))} ago
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Watched {formatDistanceToNow(new Date(item.createdAt))} ago
                  </p>
                </div>
              </div>

              {/* Menu button - positioned differently on mobile */}
              <div className="flex sm:block justify-end sm:justify-normal mt-2 sm:mt-0">
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
                      onClick={() => handleRemoveHistory(item._id)}
                    >
                      Remove from history
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryContent;
