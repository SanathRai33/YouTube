import React, { useState } from 'react'
import { Button } from './ui/button'

const tabs = [
    { id: "home", label: "Home"},
    { id: "videos", label: "Videos"},
    { id: "shorts", label: "Shorts"},
    { id: "playlist", label: "Playlist"},
    { id: "community", label: "Community"},
    { id: "about", label: "About"},
]

const ChannelTab = () => {
    const [activeTab, setActiveTab] = useState("videos")
    return (
        <div className="border-b border-gray-200">
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`rounded-none border-b-2 border-black px-4 py-2 text-base font-medium transition shadow-none
                            ${
                                activeTab === tab.id
                                    ? "border-black text-blue-600 bg-white"
                                    : "border-transparent text-gray-600 bg-gray-50 hover:bg-gray-100"
                            }
                        `}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default ChannelTab