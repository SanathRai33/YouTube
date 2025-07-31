import { create } from "domain";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import axiosInstance from "@/lib/axiosInstance";

function Videogrid() {
  const [videos, setVideos] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axiosInstance.get("/video/getAll");
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, []);

  // const videos = [
  //   {
  //     _id: 1,
  //     videotitle: "Sample Video 1",
  //     filename: "sample1.mp4",
  //     filepath: "/videos/sample1.mp4",
  //     filesize: "15MB",
  //     thumbnail: "/thumbnails/sample1.jpg",
  //     videochannel: "Channel 1",
  //     like: 100,
  //     views: 1000,
  //     uploader: "User 1",
  //     createdAt: "2023-10-01T12:00:00Z",
  //   },
  //   {
  //     _id: 2,
  //     videotitle: "Sample Video 2",
  //     filename: "sample2.mp4",
  //     filepath: "/videos/sample2.mp4",
  //     filesize: "20MB",
  //     thumbnail: "https://www.h2kinfosys.com/blog/wp-content/uploads/2024/10/Python-01_2_1.png",
  //     videochannel: "Channel 2",
  //     like: 200,
  //     views: 2000,
  //     uploader: "User 2",
  //     createdAt: "2023-10-02T12:00:00Z",
  //   },
  //   // Add more video objects as needed
  // ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 space-x-3 mt-6 w-[100%]">
      {loading ? (
        <>Loading...</>
      ) : (
        videos?.map((vid: any) => <VideoCard key={vid._id} video={vid} />)
      )}
    </div>
  );
}

export default Videogrid;
