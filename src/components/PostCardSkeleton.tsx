import React from "react"

const PostCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[4/3] bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Date Skeleton */}
        <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
        
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  )
}

export default PostCardSkeleton
