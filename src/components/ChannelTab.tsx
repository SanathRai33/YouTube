import React, { useState } from "react";
import { Button } from "./ui/button";

const tabs = [
  { id: "home", label: "Home" },
  { id: "videos", label: "Videos" },
  { id: "shorts", label: "Shorts" },
  { id: "playlist", label: "Playlist" },
  { id: "community", label: "Community" },
  { id: "about", label: "About" },
];

const ChannelTab = ({ activeTab, setActiveTab }: any) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex overflow-x-auto pb-0.5 hide-scrollbar">
        <div className="flex gap-0 sm:gap-2 min-w-full sm:min-w-0">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                rounded-none border-b-2 px-4 py-3 sm:py-2 text-sm sm:text-base font-medium 
                transition-all duration-200 shadow-none whitespace-nowrap
                flex-1 sm:flex-none text-center
                ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 bg-white font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50"
                }
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="ml-2 h-1 w-1 rounded-full bg-blue-600 sm:hidden"></span>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelTab;