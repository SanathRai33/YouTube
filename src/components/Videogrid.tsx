import { create } from "domain";
import React from "react";
import VideoCard from "./VideoCard";

function Videogrid() {
  const videos = [
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
      videotitle: "Sample Video 2",
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
    // Add more video objects as needed
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {videos.map((vid) => (
        <VideoCard key={vid._id} video={vid} />
      ))}
    </div>
  );
}

export default Videogrid;
