import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Clock,
  Compass,
  History,
  Home,
  ThumbsUp,
  User2,
  Video,
} from "lucide-react";
import ChannelDialogue from "./ChannelDialogue";

function Sidebar() {
  const user = {
    id: "12345",
    name: "John Doe",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  };

  // const user = null; // Simulating no user logged in

  const [hasChannel, setHasChannel] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);

  return (
    <aside className="flex flex-col h-screen bg-white border-r-2 border-gray-200">
      <nav className="flex flex-col space-y-0.5 px-2 w-64">
        <div className="border-b-2 border-gray-400 py-1">
          <Button className="flex justify-start space-x-2 bg-white hover:bg-gray-100 w-full rounded-none text-base">
            <Home color="black" />
            <Link href="/" className="text-gray-800 hover:text-blue-500">
              Home
            </Link>
          </Button>

          <Button className="flex justify-start space-x-2 bg-white hover:bg-gray-100 w-full rounded-none text-base">
            <Compass color="black" />
            <Link href="/explore" className="text-gray-800 hover:text-blue-500">
              Explore
            </Link>
          </Button>

          <Button className="flex justify-start bg-white hover:bg-gray-100 w-full rounded-none text-base">
            <Video color="black" />
            <Link
              href="/subscriptions"
              className="text-gray-800 hover:text-blue-500"
            >
              Subscriptions
            </Link>
          </Button>
        </div>

        <div>
          <Button className="flex justify-start bg-white hover:bg-gray-100 w-full rounded-none text-base py-1">
            <History color="black" />
            <Link href="/history" className="text-gray-800 hover:text-blue-500">
              History
            </Link>
          </Button>

          <Button className="flex justify-start space-x-2 bg-white hover:bg-gray-100 w-full rounded-none text-base">
            <ThumbsUp color="black" />
            <Link href="/liked" className="text-gray-800 hover:text-blue-500">
              Liked Videos
            </Link>
          </Button>

          <Button className="flex justify-start space-x-2 bg-white hover:bg-gray-100 w-full rounded-none text-base">
            <Clock color="black" />
            <Link
              href="/watch-later"
              className="text-gray-800 hover:text-blue-500"
            >
              Watch Later
            </Link>
          </Button>

          {hasChannel ? (
            <Button className="flex justify-start space-x-2 bg-white hover:bg-gray-100 w-full rounded-none text-base">
              <User2 color="black" />
              <Link
                href="/channel"
                className="text-gray-800 hover:text-blue-500"
              >
                Your Channel
              </Link>
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2 w-full text-gray-800 hover:text-blue-500"
              onClick={() => setOpenDialogue(true)}
            >
              Create a Channel
            </Button>
          )}
        </div>
      </nav>
      <ChannelDialogue
        isOpen={openDialogue}
        onClose={() => setOpenDialogue(false)}
        mode="create"
      />
    </aside>
  );
}

export default Sidebar;
