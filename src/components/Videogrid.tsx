import { create } from "domain";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import axiosInstance from "@/lib/axiosInstance";
import { VideoCardSkeleton } from "./VideoCardSkeleton";

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 space-x-3 mt-6 w-[100%]">
      {loading ? (
        <>
          {[...Array(6)].map((_, i) => (
            <VideoCardSkeleton key={`skeleton-${i}`} />
          ))}
        </>
      ) : (
        videos?.map((vid: any) => <VideoCard key={vid._id} video={vid} />)
      )}
    </div>
  );
}

export default Videogrid;
