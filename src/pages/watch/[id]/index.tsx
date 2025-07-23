import React, { useMemo } from "react";
import { useRouter } from "next/router";
import VideoPlayer from "@/components/VideoPlayer";
import VideoInfo from "@/components/VideoInfo";
import Comments from "@/components/Comments";
import RelatedVideo from "@/components/RelatedVideo";

function index() {
  const router = useRouter();
  const { id } = router.query;

  const videos = [
    {
      _id: "1",
      videotitle: "Sample Video 1",
      filename: "sample1.mp4",
      filepath: "/videos/sample1.mp4",
      filesize: "15MB",
      thumbnail: "/thumbnails/sample1.jpg",
      videochannel: "Channel 1",
      like: 100,
      dislike: 20,
      views: 1000,
      uploader: "User 1",
      createdAt: "2023-10-01T12:00:00Z",
    },
    {
      _id: "2",
      videotitle: "Sample Video 2",
      filename: "sample2.mp4",
      filepath: "/videos/sample2.mp4",
      filesize: "20MB",
      thumbnail: "/thumbnails/sample2.jpg",
      videochannel: 'https://static.wikia.nocookie.net/dream_team/images/7/79/Mrbeastlogo.jpg/revision/latest?cb=20230125153030s',
      like: 200,
      dislike: 50,
      views: 2000,
      uploader: "User 2",
      createdAt: "2023-10-02T12:00:00Z",
    },
  ];

    const relatedvideos = [
    {
      _id: "3",
      videotitle: "Sample Video 1",
      filename: "sample1.mp4",
      filepath: "/videos/sample1.mp4",
      filesize: "15MB",
      thumbnail: "/thumbnails/sample1.jpg",
      videochannel: "Channel 1",
      like: 100,
      dislike: 20,
      views: 1000,
      uploader: "User 1",
      createdAt: "2023-10-01T12:00:00Z",
    },
    {
      _id: "4",
      videotitle: "Sample Video 2",
      filename: "sample2.mp4",
      filepath: "/videos/sample2.mp4",
      filesize: "20MB",
      thumbnail: "/thumbnails/sample2.jpg",
      videochannel: 'https://static.wikia.nocookie.net/dream_team/images/7/79/Mrbeastlogo.jpg/revision/latest?cb=20230125153030s',
      like: 200,
      dislike: 50,
      views: 2000,
      uploader: "User 2",
      createdAt: "2023-10-02T12:00:00Z",
    },
  ];

  const video = useMemo(() => {
    const stringid = Array.isArray(id) ? id[0] : id;
    return videos.find((vid) => vid._id === stringid);
  }, [id]);


  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="flex-1 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <VideoPlayer video={videos} />
            <VideoInfo video={videos} />
            <Comments videoId={video._id} />
          </div>
          <div className="space-y-4">
            <RelatedVideo videos={relatedvideos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
