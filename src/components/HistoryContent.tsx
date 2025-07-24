import { formatDistanceToNow } from "date-fns";
import { Clock, MoreVertical } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface HistoryItem {
  _id: string;
  videoId: string;
  viewer: string;
  watchdon: string;
  video: {
    _id: string;
    videotitle: string;
    videochannel: string;
    views: string;
    createdAt: string;
  };
}

const HistoryContent = () => {
  const videos = "/videos/vdo.mp4";

  const user: any = {
    id: "123",
    name: "John Doe",
    email: "johndoe@u.com",
    image: "https://example.com/image.jpg",
  };

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;

    try {
      const HistoryData = [
        {
          _id: "1",
          videoId: "abc123",
          viewer: user.id,
          watchdon: new Date(Date.now() - 7200000).toISOString(),
          video: {
            _id: "watch1",
            videotitle: "Sample Video",
            videochannel: "Sample Channel",
            views: "1000",
            createdAt: new Date().toISOString(),
          },
        },
        {
          _id: "2",
          videoId: "def456",
          viewer: user.id,
          watchdon: new Date(Date.now() - 8400000).toISOString(),
          video: {
            _id: "watch2",
            videotitle: "Another Video",
            videochannel: "Another Channel",
            views: "2000",
            createdAt: new Date().toISOString(),
          },
        },
      ];
      setHistory(HistoryData);
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
      <div className="flex flex-col items-center justify-center py-16 text-gray-600">
        <Clock className="w-10 h-10 mb-2" />
        <h2 className="text-lg font-semibold mb-1">Keep track of what you watch</h2>
        <p className="text-sm">Watch history is not viewable when signed out.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="py-10 text-center text-gray-500">Loading...</div>;
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-600">
        <Clock className="w-10 h-10 mb-2" />
        <h2 className="text-lg font-semibold mb-1">No watch history</h2>
        <p className="text-sm">Watch videos to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-2">
      <div className="mb-4">
        <p className="text-gray-700 font-medium">{history.length} Videos</p>
      </div>
      <div className="space-y-6">
        {history.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 bg-white rounded-lg shadow hover:shadow-lg transition p-4 items-start"
          >
            <Link href={`/watch/${item.videoId}`} className="block w-48 flex-shrink-0 rounded overflow-hidden group">
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
              <Link href={`/watch/${item.videoId}`} className="block group">
                <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600 transition">
                  {item.video.videotitle}
                </h3>
                <p className="text-xs text-gray-600 truncate">{item.video.videochannel}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {Number(item.video.views).toLocaleString()} views &middot; {formatDistanceToNow(new Date(item.video.createdAt))} ago
                </p>
                <p className="text-xs text-gray-400">Watched {formatDistanceToNow(new Date(item.watchdon))} ago</p>
              </Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleRemoveHistory(item._id)}>
                  Remove from history
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryContent;
