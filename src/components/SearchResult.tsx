import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "./ui/avatar";

const SearchResult = ({ query }: any) => {
  if (!query.trim()) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p>Enter a search term to find a video</p>
      </div>
    );
  }

  const [video, setVideo] = useState<any>(null);

  const videos = async () => {
    const allVideos = [
      {
        _id: 1,
        videotitle: "Sample Video 1",
        filename: "sample1.mp4",
        filepath: "/videos/sample1.mp4",
        filesize: "15MB",
        thumbnail: "/thumbnails/sample1.jpg",
        videochannel: "Channel 1",
        like: 100,
        views: 1000,
        uploader: "User 1",
        createdAt: "2023-10-01T12:00:00Z",
      },
      {
        _id: 2,
        videotitle: "Python begining to Advance",
        filename: "sample2.mp4",
        filepath: "/videos/sample2.mp4",
        filesize: "20MB",
        thumbnail: "https://www.h2kinfosys.com/blog/wp-content/uploads/2024/10/Python-01_2_1.png",
        videochannel: "Channel 2",
        like: 200,
        views: 2000,
        uploader: "User 2",
        createdAt: "2023-10-02T12:00:00Z",
      },
    ];

    let results = allVideos.filter(
      (video) =>
        video.videotitle
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        video.videochannel
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
    );
    setVideo(results);
  };

  useEffect(() => {
    videos();
    // eslint-disable-next-line
  }, [query]);

  const hasResult = video ? video.length > 0 : false;

  if (!hasResult) {
    return (
      <div className="py-10 text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-2">No result found</h2>
        <p>Try different keywords or remove search filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-6 mt-6 box-content">
      {video &&
        video.map((vid: any) => (
          <div
            key={vid._id}
            className="bg-gray-50 box-content shadow hover:shadow-lg transition p-4 space-x-4 flex h-[280px] w-[cal(100%-100px)]"
          >
            <div className="bg-black w-[500px] h-[280px] overflow-hidden rounded-lg">
              <img
                src={vid.thumbnail}
                alt={vid.videotitle}
                className="w-full h-full object-cover mb-3"
              />
            </div>
            <div className="w-[calc(100%-550px)]">
              <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
                {vid.videotitle}
              </h3>
              <div className="flex items-center text-xs text-gray-500 gap-2">
                <p className="text-xs text-gray-500 mt-1">
                  {vid.views?.toLocaleString()} views &middot;{" "}
                  {formatDistanceToNow(new Date(vid.createdAt))} ago
                </p>
              </div>
              <div className="flex items-center p-1 space-x-1">
                <Avatar className="w-10 h-10">
                    <AvatarFallback>{video.videochannel}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-gray-600 truncate mb-1">
                {vid.videochannel}
              </p>
              </div>
              <div>
                <p>{vid?.description || ""}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchResult;
