// pages/404.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image404 from "../../styles/Assets/404.png"; 

export default function Custom404() {
  const [pathname, setPathname] = React.useState("");
  const router = useRouter();

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);
  return (
    <div className="flex flex-col justify-start items-center align-middle font-sans text-gray-800 w-screen h-screen p-4 ">
      <div className="w-full h-100 lg:h-100 md:h-90 sm:h-75 relative flex items-center lg:px-75 md:px-40 ">
        <img className="lg:w-fit lg:h-100 h-75 sm:h-75 md:h-90 object-cover bg-transparent relative z-2 "
        //   src="https://i.pinimg.com/564x/95/2a/5f/952a5ffe3f691205f8f89089bfb4399a.jpg"
        src={Image404.src}
          alt="404"
        />
        {pathname && (
          <h1 className="text-black p-2 text-[12px] lg:text-2xl md:text-lg sm:text-[12px] font-bold absolute top-32 right-3 lg:top-25 lg:right-89 md:top-23 md:right-27 sm:top-32 sm:right-3 border-2 border-black rounded-lg z-1">
            {pathname}
          </h1>
        )}
      </div>
      <div className=" flex flex-col justify-center items-center">
        <h1 className="text-6xl text-red-500">404</h1>
        <h2>Page Not Found</h2>
        <p>
          This page isn't available. Sorry about that. Try searching for
          something else.
        </p>
        <Link href="/">
          <Button className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors curzor-pointer">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
