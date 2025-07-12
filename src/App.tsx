import { Suspense } from "react"
import Header from "./components/Header"
import Banner from "./components/Banner"
import PostList from "./components/PostLists"
import { PostsProvider } from "./components/PostProvider"
import "./App.css"

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Banner />
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <PostsProvider>
          <PostList />
        </PostsProvider>
      </Suspense>
    </div>
  )
}

export default App
