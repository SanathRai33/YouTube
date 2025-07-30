import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import VideoPlayer from "@/components/VideoPlayer";
import VideoInfo from "@/components/VideoInfo";
import Comments from "@/components/Comments";
import RelatedVideo from "@/components/RelatedVideo";
import axiosInstance from "@/lib/axiosInstance";

function index() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id || typeof id !== "string") return;
      try {
        const res = await axiosInstance.get("/video/getAll");
        const video = res.data?.filter((vid: any) => vid._id === id);
        setSelectedVideo(video[0]);
        console.log("video",video[0],id)
        setVideo(res.data);  
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

if (loading) {
  return <div>Loading...</div>;
}

if (!selectedVideo) {
  return <div>Video not found</div>;
}


  return (
    <div className="flex-1 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <VideoPlayer video={selectedVideo} />
            <VideoInfo video={selectedVideo} />
            <Comments videoId={id} />
          </div>
          <div className="space-y-4">
            <RelatedVideo videos={video} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
