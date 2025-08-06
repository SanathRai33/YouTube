import React, { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("videos");

  console.log(user)

  try {
    let channel = user;

    return (
      <div className="min-h-screen min-w-[calc(100%-258px)] bg-gray-50 py-8 px-4">
        <div className="mx-auto flex flex-col gap-8">
          <ChannelHeader channel={channel} user={user} />

          <div className="mt-2">
            <ChannelTab activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Render content based on selected tab */}
          <div>
            {activeTab === "videos" && <ChannelVideo user={user} />}
            {activeTab === "about" && (
              <div className="text-gray-700 text-base px-4 py-6">
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p>{user.channelname}</p>
                <p>{user.description}</p>
                <p>{user.email}</p>
              </div>
            )}
            {activeTab === "community" && (
              <div className="text-gray-700 text-base px-4 py-6">
                <h2 className="text-xl font-semibold mb-2">Community</h2>
                <p>Community posts and announcements will be shown here.</p>
              </div>
            )}
            {/* You can add more sections like shorts, playlists, etc. */}
          </div>

          {/* Always show uploader if user owns the channel */}
          <div>
            {channel && (
              <VideoUploader
                channelId={channel._id}
                channelName={channel.channelname}
              />
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

export default index;
