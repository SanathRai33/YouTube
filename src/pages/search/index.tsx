import SearchResult from "@/components/SearchResult";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const index = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
  <div className="min-h-screen w-[calc(100%-200px)] bg-gray-50 py-2 px-4">
    <div className="w-full mx-auto">
      {q && (
        <div className="px-3 py-1 text-center">
          <h1 className="text-1xl font-bold text-gray-900">
            Search result for "<span className="text-blue-600">{q}</span>"
          </h1>
        </div>
      )}
      <Suspense fallback={<div className="text-center py-1 text-gray-500">Loading...</div>}>
        <SearchResult query={q || ""} />
      </Suspense>
    </div>
  </div>
);
};

export default index;
