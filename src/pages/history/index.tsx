import HistoryContent from "@/components/HistoryContent";
import React, { Suspense } from "react";

const index = () => {
  return (
    <div className="min-h-screen flex flex-col text-black py-4 sm:py-8 px-2 sm:px-4 w-full">
      <div className="w-full p-1 max-w-[1800px] mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-2">
          Watch History
        </h1>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          <HistoryContent />
        </Suspense>
      </div>
    </div>
  );
};

export default index;
