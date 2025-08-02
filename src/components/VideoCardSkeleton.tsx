import Link from "next/link";
import { Skeleton } from "./ui/skeleton"; // Assuming you're using shadcn/ui or similar

// Loading skeleton component
export const VideoCardSkeleton = () => {
  return (
    <div className="block mb-4 md:mb-6 box-border w-full sm:w-[calc(50%-12px)] md:w-[400px]">
      <div className="rounded-lg overflow-hidden w-full h-auto bg-white shadow">
        {/* Thumbnail skeleton */}
        <div className="relative aspect-video bg-gray-200 animate-pulse">
          <div className="absolute bottom-2 right-2 bg-gray-300 text-transparent text-xs px-2 py-1 rounded">
            00:00
          </div>
        </div>

        {/* Content skeleton */}
        <div className="flex items-start gap-3 p-3">
          {/* Avatar skeleton */}
          <Skeleton className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-200" />

          <div className="flex-1 min-w-0 space-y-2">
            {/* Title skeleton */}
            <Skeleton className="h-4 w-full bg-gray-200 rounded" />
            <Skeleton className="h-4 w-3/4 bg-gray-200 rounded" />

            {/* Channel skeleton */}
            <Skeleton className="h-3 w-1/2 bg-gray-200 rounded mt-1" />

            {/* Metadata skeleton */}
            <Skeleton className="h-3 w-2/3 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
