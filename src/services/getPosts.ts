export interface Post {
  id: number
  title: string
  content: string
  published_at: string
  small_image?: {
	file_name : string,
	id: number,
	mime: string,
	url: string
  }[]
  medium_image?: {
	file_name : string,
	id: number,
	mime: string,
	url: string
  }[]
}

export interface PostsResponse {
  data: Post[]
  meta: {
    current_page: number
    from: number
    last_page: number
    per_page: number
    to: number
    total: number
  }
}

export interface GetPostsParams {
  page?: number
  per_page?: number
  sort?: string
  append?: string[]
  [key: string]: string | number | string[] | undefined
}

export async function getPosts(params?: GetPostsParams): Promise<PostsResponse> {
  const apiUrl = new URL("https://suitmedia-backend.suitdev.com/api/ideas")

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => apiUrl.searchParams.append(key, v))
        } else {
          apiUrl.searchParams.append(key, value.toString())
        }
      }
    })
  }

  try {
    const response = await fetch(apiUrl.toString(), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data: PostsResponse = await response.json()
    return data
  } catch (error) {
    console.error("API Error:", error)
    throw new Error("Failed to fetch data from API")
  }
}
