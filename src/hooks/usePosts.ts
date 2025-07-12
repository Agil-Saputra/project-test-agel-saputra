import { useState, useEffect } from 'react'
import { getPosts, type Post, type PostsResponse, type GetPostsParams } from '../services/getPosts'

export const usePosts = (params?: GetPostsParams) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [meta, setMeta] = useState<PostsResponse['meta'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async (newParams?: GetPostsParams) => {
    try {
      setLoading(true)
      setError(null)
      const response = await getPosts(newParams || params)
      setPosts(response.data)
      setMeta(response.meta)
    } catch (err) {
      setError('Failed to fetch posts')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return { posts, meta, loading, error, refetch: fetchPosts }
}