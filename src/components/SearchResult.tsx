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
        thumbnail:
          "https://www.h2kinfosys.com/blog/wp-content/uploads/2024/10/Python-01_2_1.png",
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
      <div className="py-10 text-center text-gray-500 px-4">
        <h2 className="text-xl font-semibold mb-2">No results found</h2>
        <p className="text-sm sm:text-base">
          Try different keywords or remove search filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 mt-4 sm:mt-6">
      {video &&
        video.map((vid: any) => (
          <div
            key={vid._id}
            className="bg-gray-50 shadow hover:shadow-lg transition p-3 sm:p-4 flex flex-col sm:flex-row h-auto sm:h-[200px] md:h-[240px] w-full"
          >
            {/* Thumbnail */}
            <div className="relative w-full sm:w-[300px] md:w-[400px] h-[180px] sm:h-full mb-3 sm:mb-0 sm:mr-4 rounded-lg overflow-hidden">
              <img
                src={vid.thumbnail}
                alt={vid.videotitle}
                className="w-full h-full object-cover"
              />
              {/* Video duration badge */}
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {vid.duration || "0:00"}
              </span>
            </div>

            {/* Video Info */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 mb-1">
                {vid.videotitle}
              </h3>

              <div className="flex items-center text-xs text-gray-500 mb-2">
                <span>{vid.views?.toLocaleString()} views</span>
                <span className="mx-1">•</span>
                <span>{formatDistanceToNow(new Date(vid.createdAt))} ago</span>
              </div>

              <div className="flex items-center mt-1 mb-3">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 mr-2">
                  <AvatarFallback className="text-xs sm:text-sm">
                    {vid.videochannel?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {vid.videochannel}
                </p>
              </div>

              <p className="text-sm text-gray-700 line-clamp-2 sm:line-clamp-3 mt-auto">
                {vid?.description || ""}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchResult;
