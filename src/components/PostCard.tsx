import React from "react"
import { type Post } from "../services/getPosts"

interface PostCardProps {
  post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const imageUrl = post.medium_image?.[0]?.url || post.small_image?.[0]?.url || "https://placehold.co/400x300?text=Image Not Available"
  console.log(post.medium_image?.[0]?.url);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="aspect-[4/3] bg-gray-200">
        <img
		src={`https://images.weserv.nl/?url=${imageUrl}`}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-2 uppercase">
          {formatDate(post.published_at)}
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-3" title={post.title}>
          {post.title}
        </h3>
      </div>
    </div>
  )
}

export default PostCard
