import WatchLaterContent from "@/components/WatchLaterContent";
import React, { Suspense } from "react";

const index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col text-black py-4 sm:py-8 px-2 sm:px-4 lg:px-8">
      <div className="w-full p-1 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-2">
          Watch Later Videos
        </h1>
        <Suspense
          fallback={
            <div className="text-center py-8 sm:py-10 text-gray-500">
              Loading...
            </div>
          }
        >
          <WatchLaterContent />
        </Suspense>
      </div>
    </div>
  );
};

export default index;
