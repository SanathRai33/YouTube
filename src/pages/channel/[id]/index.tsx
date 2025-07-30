import React from "react";
import { useRouter } from "next/router";
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
    let channel = user;

    const videos: any = [
    ];

    return (
      <div className="min-h-screen min-w-[calc(100%-258px)] bg-gray-50 py-8 px-4">
        <div className="mx-auto flex flex-col gap-8">
          <ChannelHeader channel={channel} user={user} />
          <div className="mt-2">
            <ChannelTab />
          </div>
          <div>
            {channel && (
              <VideoUploader channelId={channel._id} channelName={channel.channelname} />
            )}
          </div>
          <div>
            <ChannelVideo videos={videos} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

export default index;
