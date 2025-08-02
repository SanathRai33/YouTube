import { Bell, Menu, Mic, Search, User, VideoIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import ChannelDialogue from "./ChannelDialogue";
import { useRouter } from "next/router";
import { useUser } from "@/lib/AuthContext";
import Scrollbar from "./Scrollbar";
import { useSidebarAnimation } from "@/lib/useAnimation";

function Navbar() {
  const { user, logout, handlegooglesignin } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [openDialogue, setOpenDialogue] = useState(false);
  const [openHambug, setOpenHambug] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const router = useRouter();

  const { sidebarRef, overlayRef } = useSidebarAnimation(openHambug);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowMobileSearch(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e as any);
    }
  };

  useEffect(() => {
    if (openHambug) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [openHambug]);

  return (
    <header className="flex flex-col sticky top-0 z-50 bg-white shadow-md border-b-2 border-black w-full">
      <div className="flex items-center justify-between py-2 lg:px-4 px-2">
        <div className="flex items-center  lg:gap-4 sm:gap-2">
          <Button
            className="p-2 rounded-md bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none lg:hidden"
            aria-label="Menu"
            onClick={() => setOpenHambug(!openHambug)}
          >
            <Menu color="black" />
          </Button>

          <Link
            href="/"
            className="flex gap-1 items-center text-xl font-bold text-gray-800 sm:w-[123px]"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
              alt="Logo"
              className="w-8 h-6 sm:w-10 sm:h-6"
            />
            <div className="sm:block">
              <span className="text-lg sm:text-xl text-black">YouTube</span>
              <span className="text-xs align-super">In</span>
            </div>
          </Link>
        </div>

        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center justify-center w-full max-w-2xl"
        >
          <div className="flex items-center w-full relative">
            <input
              type="text"
              placeholder="Search..."
              onKeyPress={handleKeyPress}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border text-black overflow-hidden border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="text-black bg-gray-100 h-[39px] rounded-l-none rounded-r-2xl hover:bg-white absolute right-0.5 top-1/2 -translate-y-1/2">
              <Search />
            </Button>
          </div>
          <Button className="ml-2 p-2 rounded-full bg-gray-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Mic color="black" />
          </Button>
        </form>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            className="lg:hidden p-2 rounded-full bg-white hover:bg-white shadow-none"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            aria-label="Search"
          >
            <Search color="black" />
          </Button>

          {!showMobileSearch && (
            <>
              <Button className="hidden lg:flex items-center space-x-2 bg-white hover:bg-white shadow-none">
                <VideoIcon color="black" />
              </Button>
              <Button className="hidden lg:flex items-center space-x-2 bg-white hover:bg-white shadow-none">
                <Bell color="black" />
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="flex items-center space-x-2 bg-white hover:bg-white shadow-none">
                      <Avatar className="border-black border-2 w-10 h-10">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {user?.channelname ? (
                      <DropdownMenuItem>
                        <Link
                          href={`/channel/${user?._id}`}
                          className="flex items-center space-x-2"
                        >
                          Your Channel
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <div className="px-2 py-1.5">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex items-center space-x-2"
                          onClick={() => setOpenDialogue(true)}
                        >
                          Create a Channel
                        </Button>
                      </div>
                    )}
                    <DropdownMenuItem>
                      <Link
                        href="/history"
                        className="flex items-center space-x-2"
                      >
                        History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={`/liked/${user._id}`}
                        className="flex items-center space-x-2"
                      >
                        Liked videos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={`/watch-later/${user._id}`}
                        className="flex items-center space-x-2"
                      >
                        Watch Later
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  className="lg:flex items-center space-x-2 sm:space-x-1"
                  onClick={handlegooglesignin}
                >
                  <User />
                  <span>Sign In</span>
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Search Bar - appears when toggled */}
      {showMobileSearch && (
        <div className="px-4 py-2 lg:hidden">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search YouTube"
              onKeyPress={handleKeyPress}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <Button
              type="button"
              className="p-2 rounded-full bg-gray-300 hover:bg-white"
              onClick={() => setShowMobileSearch(false)}
            >
              <span className="text-sm">Cancel</span>
            </Button>
          </form>
        </div>
      )}

      <ChannelDialogue
        isOpen={openDialogue}
        onClose={() => setOpenDialogue(false)}
        mode="create"
      />
      {openHambug && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/10 lg:hidden z-40"
            onClick={() => setOpenHambug(false)}
          />

          <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl overflow-y-auto">
            <Scrollbar onClose={() => setOpenHambug(false)} />
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
