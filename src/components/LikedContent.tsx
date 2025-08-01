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
  const videos = "/videos/vdo.mp4";

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
      const LikedData = await axiosInstance.get(`/watch/${user?._id}`);
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
    <div className="min-w-full mx-auto px-2 ">
      <div className="mb-4">
        <p className="text-gray-700 font-medium">{liked.length} Videos</p>
        <Button>
          <Play />
          Play all
        </Button>
      </div>
      <div className="space-y-6">
        {liked.map((item, index) => (
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
                  <p className="text-xs text-gray-600 truncate">
                    {item.videoid.videochannel}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {Number(item.videoid.views).toLocaleString()} views &middot;{" "}
                    {formatDistanceToNow(new Date(item.videoid.createdAt))} ago
                  </p>
                  <p className="text-xs text-gray-400">
                    Liked {formatDistanceToNow(new Date(item.createdAt))} ago
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
                  <DropdownMenuItem onClick={() => handleRemoveLiked(item._id)}>
                    Remove from liked
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

export default LikedContent;
