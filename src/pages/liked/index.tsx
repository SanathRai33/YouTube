import LikedContent from "@/components/LikedContent";
import React, { Suspense } from "react";

const index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col text-black py-4 sm:py-8 px-2 sm:px-4">
      <div className="w-full max-w-screen-2xl mx-auto p-1">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 border-b pb-2">
            Liked Videos
          </h1>
        </div>

        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="text-gray-500">Loading your liked videos...</p>
            </div>
          }
        >
          <LikedContent />
        </Suspense>
      </div>
    </div>
  );
};

export default index;
