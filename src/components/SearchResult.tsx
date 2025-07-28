import React, { useEffect, useState } from "react";

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
        videotitle: "Coding with Python",
        filename: "sample2.mp4",
        filepath: "/videos/sample2.mp4",
        filesize: "20MB",
        thumbnail: "/thumbnails/sample2.jpg",
        videochannel: "Channel 2",
        like: 200,
        views: 2000,
        uploader: "User 2",
        createdAt: "2023-10-02T12:00:00Z",
      },
    ];

    let results = allVideos.filter((video) =>
      video.videotitle.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
      video.videochannel.toLocaleLowerCase().includes(query.toLocaleLowerCase())
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {video &&
        video.map((vid: any) => (
          <div
            key={vid._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={vid.thumbnail}
              alt={vid.videotitle}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{vid.videotitle}</h3>
            <p className="text-sm text-gray-600 truncate mb-1">{vid.videochannel}</p>
            <div className="flex items-center text-xs text-gray-500 gap-2">
              <span>{vid.views.toLocaleString()} views</span>
              <span>&middot;</span>
              <span>{new Date(vid.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchResult;