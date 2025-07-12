import React from "react";
import { usePosts } from "./PostProvider";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import Select from "./Select";
import PostGridSkeleton from "./PostGridSkeleton";

const PostList: React.FC = () => {
  const {
    posts,
    loading,
    error,
    currentPage,
    pageSize,
    totalItems,
    setPageSize,
    setSort,
    sortBy,
  } = usePosts();
  console.log(posts);

  // Handle page size change
  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSort(value);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <PostGridSkeleton count={pageSize} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="text-sm text-gray-600">
          Showing {startItem} - {endItem} of {totalItems} posts
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Page Size Select */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <Select
              value={pageSize.toString()}
              onChange={handlePageSizeChange}
              options={[
                { value: "10", label: "10" },
                { value: "20", label: "20" },
                { value: "50", label: "50" },
              ]}
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort:</span>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              options={[
                { value: "-published_at", label: "Newest" },
                { value: "published_at", label: "Oldest" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <PostGridSkeleton count={pageSize} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <img
        src="/storage/files/5543/conversions/KM5_Website_02-medium.jpg"
        alt="KM5 Website"
      />

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default PostList;
