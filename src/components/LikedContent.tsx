import { formatDistanceToNow } from "date-fns";
import { Clock, MoreVertical, Play } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useUser } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosInstance";

const LikedContent = () => {

  const { user } = useUser();

  const [liked, setLiked] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadLiked();
    } else {
      setLoading(true);
    }
  }, [user]);

  const loadLiked = async () => {
    if (!user) return;

    try {
      const LikedData = await axiosInstance.get(`/like/${user?._id}`);
      setLiked(LikedData.data);
    } catch (error) {
      console.error("Failed to load liked video:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLiked = async (likedId: string) => {
    try {
      setLiked((prev) => prev.filter((item) => item._id !== likedId));
    } catch (error) {
      console.error("Failed to remove liked:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-600">
        <Clock className="w-10 h-10 mb-2" />
        <h2 className="text-lg font-semibold mb-1">
          Keep track of what you liked
        </h2>
        <p className="text-sm">Watch liked is not viewable when signed out.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="py-10 text-center text-gray-500">Loading...</div>;
  }

  if (liked.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-600">
        <Clock className="w-10 h-10 mb-2" />
        <h2 className="text-lg font-semibold mb-1">No liked videos</h2>
        <p className="text-sm">Like videos to see your liked here.</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <p className="text-gray-700 font-medium text-sm sm:text-base">
            {liked.length} {liked.length === 1 ? "Video" : "Videos"}
          </p>
        </div>
        <Button className="flex items-center gap-2 w-full sm:w-auto">
          <Play className="h-4 w-4" />
          <span>Play all</span>
        </Button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {liked.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-row gap-1 bg-white hover:shadow-md transition-all py-3 px-2 rounded-lg border border-gray-100"
          >
            <p className="flex items-center text-black">{index + 1}.</p>

            <div className="flex gap-1">
              {/* Video thumbnail */}
              <div className="flex gap-3 w-50 h-[113px]">
                <Link
                  href={`/watch/${item?.videoid?._id}`}
                  className="block flex-shrink-0 rounded overflow-hidden group"
                >
                  <video
                    src={item?.videoid?.filepath}
                    className="object-cover h-[113px] sm:h-28 w-50 bg-black rounded"
                    muted
                    controls={false}
                    preload="metadata"
                  />
                </Link>
              </div>

              {/* Video info */}
              <div className="flex-1 flex flex-row gap-3 w-23">
                <Link
                  href={`/watch/${item?.videoid?._id}`}
                  className="block group space-y-1 w-23"
                >
                  <h3 className="text-sm h-6 sm:text-base font-extrabold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
                    {item?.videoid?.videotitle}
                  </h3>
                  <p className="text-xs text-gray-500 truncate font-bold">
                    {item?.videoid?.videochannel}
                  </p>
                </Link>
              </div>

              {/* Menu button */}
              <div className="self-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-red-500 h-8 w-4"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleRemoveLiked(item._id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      Remove from liked
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

export default LikedContent;
