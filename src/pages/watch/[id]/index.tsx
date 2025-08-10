import React, { useEffect, useState } from "react";
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
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id || typeof id !== "string") return;
      try {
        const res = await axiosInstance.get("/video/getAll");
        const video = res.data?.filter((vid: any) => vid._id === id);
        setSelectedVideo(video[0]);
        setVideo(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleNextVideo = () => {
    if (!video) return;
    const currentIndex = video.findIndex((v: any) => v._id === id);
    const nextIndex = (currentIndex + 1) % video.length;
    router.push(`/watch/${video[nextIndex]._id}`);
  };

  const handleCloseWebsite = () => {
    if (typeof window !== 'undefined') {
      window.close();
      // If window.close doesn't work (due to browser restrictions), you can redirect
      window.location.href = 'about:blank';
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedVideo) {
    return <div>Video not found</div>;
  }

  return (
    <div className="flex-1 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-3 sm:p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2 space-y-3 sm:space-y-4">
            <VideoPlayer 
              video={selectedVideo} 
              onNextVideo={handleNextVideo}
              onCloseWebsite={handleCloseWebsite}
              onToggleComments={toggleComments}
            />
            <VideoInfo video={selectedVideo} />
            {showComments && <Comments videoid={id} />}
          </div>
          <div className="space-y-3 sm:space-y-4">
            <RelatedVideo videos={video} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;