import React from "react";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";
import ChannelHeader from "@/components/ChannelHeader";
import ChannelTab from "@/components/ChannelTab";
import VideoUploader from "@/components/VideoUploader";
import ChannelVideo from "@/components/ChannelVideo";
import { useUser } from "@/lib/AuthContext";

const index = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useUser();

  try {
    let channel: any = {
      id: "1",
      name: "Mr Beast",
      email: "beast@gmail.com",
      description: "Welcome to my Youtube channel",
      joinedon: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
    if (!channel) {
      notFound();
    }
    const videos = [
      {
        id: "1",
        videotitle: "Survive 100 Days",
        filename: "nature.docs.mp4",
        filetype: "mp4",
        filepath: ":D/Videos/nature.docs.mp4",
        filesize: "4mb",
        channelname: "Mr.Beast",
        like: 7139,
        views: 43421,
        uploader: "John dev",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        videotitle: "Coding chef",
        filename: "natures.docs.mp4",
        filetype: "mp4",
        filepath: ":D/Videos/natures.docs.mp4",
        filesize: "4.3mb",
        channelname: "Code with Harry",
        like: 63239,
        views: 113421,
        uploader: "Harris",
        createdAt: new Date().toISOString(),
      },
    ];
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <ChannelHeader channel={channel} user={user} />
          <div className="mt-2">
            <ChannelTab />
          </div>
          <div>
            <VideoUploader channelId={id} channelname={channel.name} />
          </div>
          <div>
            <ChannelVideo videos={videos} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Something went wrong", error);
    notFound();
  }
};

export default index;
