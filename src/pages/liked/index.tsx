import LikedContent from "@/components/LikedContent";
import React, { Suspense } from "react";

const index = () => {
  return (
    <div className="min-h-screen min-w-[1260px] flex flex-col text-black py-8 px-4">
      <div className="w-full p-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
          Watch Liked Vieos
        </h1>
        <Suspense
          fallback={
            <div className="text-center py-10 text-gray-500">Loading...</div>
          }
        >
          <LikedContent />
        </Suspense>
      </div>
    </div>
  );
};

export default index;
