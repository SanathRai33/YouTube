import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Clock,
  Compass,
  History,
  Home,
  Menu,
  ThumbsUp,
  User2,
  Video,
} from "lucide-react";
import ChannelDialogue from "./ChannelDialogue";
import { useUser } from "@/lib/AuthContext";
import "../styles/Category.module.css";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function Scrollbar({ onClose }: { onClose?: () => void }) {
  const { user } = useUser();

  const [openDialogue, setOpenDialogue] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current?.querySelectorAll(".Button, a") || [], {
        x: -20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col h-full w-64">
      <aside className="flex flex-col h-full bg-white border-r-2 border-gray-200">
        {/* Close button */}
        <Button
          className="lg:hidden ml-2 mt-2 text-black self-start bg-white Button"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <Menu color="black" />
        </Button>

        <nav className="flex flex-col space-y-0.5 px-2 flex-1">
          <div className="border-b-2 border-gray-400 py-1">
            <Button className="flex justify-start space-x-2 bg-white hover:bg-gray-100 w-full rounded-none text-base">
              <Home color="black" />
              <Link href="/" className="text-black hover:text-blue-500">
                Home
              </Link>
            </Button>

            <Button className="flex justify-start space-x-2 bg-white hover:bg-gray-100 w-full rounded-none text-base">
              <Compass color="black" />
              <Link href="/explore" className="text-black hover:text-blue-500">
                Explore
              </Link>
            </Button>

            <Button className="flex justify-start space-x-2 bg-white hover:bg-gray-100 w-full rounded-none text-base">
              <Video color="black" />
              <Link
                href="/subscriptions"
                className="text-black hover:text-blue-500"
              >
                Subscriptions
              </Link>
            </Button>
          </div>

          <div className="border-b-2 border-gray-400 py-1">
            <Button className="flex justify-start space-x-2 bg-white hover:bg-gray-100 w-full rounded-none text-base">
              <History color="black" />
              <Link
                href="/history"
                className="text-gray-800 hover:text-blue-500"
              >
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

            {user?.channelname ? (
              <Button className="flex justify-start space-x-2 bg-white hover:bg-gray-100 w-full rounded-none text-base">
                <User2 color="black" />
                <Link
                  href="/channel/${user._id}"
                  className="text-gray-800 hover:text-blue-500"
                >
                  Your Channel
                </Link>
              </Button>
            ) : user ? (
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center space-x-2 w-full text-gray-800 hover:text-blue-500"
                onClick={() => setOpenDialogue(true)}
              >
                Create a Channel
              </Button>
            ) : (
              <></>
            )}
          </div>
        </nav>
        <ChannelDialogue
          isOpen={openDialogue}
          onClose={() => setOpenDialogue(false)}
          mode="create"
        />
      </aside>
    </div>
  );
}

export default Scrollbar;
