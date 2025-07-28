import SearchResult from "@/components/SearchResult";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const index = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
  <div className="min-h-screen bg-gray-50 py-8 px-4">
    <div className="max-w-4xl mx-auto">
      {q && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Search result for "<span className="text-blue-600">{q}</span>"
          </h1>
        </div>
      )}
      <Suspense fallback={<div className="text-center py-10 text-gray-500">Loading...</div>}>
        <SearchResult query={q || ""} />
      </Suspense>
    </div>
  </div>
);
};

export default index;
