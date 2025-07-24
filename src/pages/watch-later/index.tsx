import WatchLaterContent from "@/components/WatchLaterContent";
import React, { Suspense } from "react";

const index = () => {
  return (
      <div className="min-h-screen bg-gray-50 text-black py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">Watch Later Videos</h1>
          <Suspense fallback={<div className="text-center py-10 text-gray-500">Loading...</div>}>
        <WatchLaterContent />
      </Suspense>
      </div>
    </div>
  );
};

export default index;
