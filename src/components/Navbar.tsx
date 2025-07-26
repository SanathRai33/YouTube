import { Bell, Menu, Mic, Search, User, VideoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

function Navbar() {
  const user = {
    id: "12345",
    name: "John Doe",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  };

  // const user = null; // Simulating no user logged in

  return (
    <header className="flex items-center justify-between gap-5 px-4 py-2 bg-white shadow-md border-b-2 border-black">
      <div className="flex items-center space-x-4">
        <Button className="p-2 rounded-md bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500  shadow-none">
          <Menu color="black" />
        </Button>
        <Link href="/" className="flex gap-1 text-xl font-bold text-gray-800">
          <div className="flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
              alt="Logo"
              className="min-w-8 h-5"
            />
          </div>
          <div>
            <span className="text-xl text-black">YouTube</span>
            <span className="text-xs align-super">In</span>
          </div>
        </Link>
      </div>
      <form className="flex justify-start space-x-2 w-full max-w-2xl">
        <div className="flex items-center w-full space-x-2 relative">
          <input
            type="text"
            placeholder="Search..."
            // value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="text-black bg-gray-100 rounded-l-none rounded-r-2xl hover:bg-white absolute right-55 top-0.5">
            <Search />
          </Button>
          <Button className="p-2 rounded-full bg-gray-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Mic color="black" />
          </Button>
        </div>
      </form>
      {user ? (
        <div className="flex items-center space-x-4">
          <Button className="flex items-center space-x-2 bg-white hover:bg-white shadow-none">
            <VideoIcon color="black" />
          </Button>
          <Button className="flex items-center space-x-2 bg-white hover:bg-white shadow-none">
            <Bell color="black" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center space-x-2 bg-white hover:bg-white shadow-none">
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  href="/channel/${user.id}"
                  className="flex items-center space-x-2"
                >
                  Your Channel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/history" className="flex items-center space-x-2">
                  History
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/liked/${user.id}"
                  className="flex items-center space-x-2"
                >
                  Liked videos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/watch-later/${user.id}"
                  className="flex items-center space-x-2"
                >
                  Watch Later
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/signout/${user.id}"
                  className="flex items-center space-x-2"
                >
                  Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          <Button className="flex items-center space-x-2">
            <User />
            <span>Sign In</span>
          </Button>
        </>
      )}
    </header>
  );
}

export default Navbar;
