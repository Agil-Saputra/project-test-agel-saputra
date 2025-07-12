import React from "react"
import PostCardSkeleton from "./PostCardSkeleton"

interface PostGridSkeletonProps {
  count?: number
}

const PostGridSkeleton: React.FC<PostGridSkeletonProps> = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {Array.from({ length: count }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default PostGridSkeleton
