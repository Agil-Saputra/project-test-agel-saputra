import React, { createContext, useContext, useState, useEffect } from "react"
import { getPosts } from "../services/getPosts"
import { type Post } from "../services/getPosts"

const PostsContext = createContext<{
  posts: Post[]
  loading: boolean
  error: string | null
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
  sortBy: string
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  setSort: (sort: string) => void
} | null>(null)

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const urlParams = new URLSearchParams(window.location.search)
  const initialPage = Number(urlParams.get("page") || "1")
  const initialSize = Number(urlParams.get("size") || "10")
  const initialSort = urlParams.get("sort") || "-published_at"

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialSize)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [sortBy, setSortBy] = useState(initialSort)

  const setPage = (page: number) => {
    setCurrentPage(page)
  }

  const setPageSizeHandler = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) 
  }

  const setSortHandler = (sort: string) => {
    setSortBy(sort)
    setCurrentPage(1) 
  }

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getPosts({
        "page[number]": currentPage,
        "page[size]": pageSize,
        sort: sortBy,
        "append[]": ["small_image", "medium_image"]
      })

      const simplePosts: Post[] = response.data.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        published_at: post.published_at,
        small_image: post.small_image,
        medium_image: post.medium_image
      }))

      setPosts(simplePosts)
      setTotalItems(response.meta.total || 0)
      setTotalPages(Math.ceil((response.meta.total || 0) / pageSize))

      const newParams = new URLSearchParams()
      newParams.set("page", currentPage.toString())
      newParams.set("size", pageSize.toString())
      newParams.set("sort", sortBy)
      
      const newUrl = `${window.location.pathname}?${newParams.toString()}`
      window.history.replaceState(null, "", newUrl)
    } catch (err) {
      setError("Failed to load posts")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [currentPage, pageSize, sortBy])

  return (
    <PostsContext.Provider value={{
      posts,
      loading,
      error,
      currentPage,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      setPage,
      setPageSize: setPageSizeHandler,
      setSort: setSortHandler
    }}>
      {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error("usePosts must be used within PostsProvider")
  }
  return context
}
