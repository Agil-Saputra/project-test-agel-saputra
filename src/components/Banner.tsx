
import type React from "react"
import { useEffect, useState } from "react"

const Banner: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-gray-800"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/bg-parralax.png')",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/20" />
      </div>

      <div
        className="relative z-10 h-full flex items-center justify-center text-center text-white"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Ideas
          </h1>
          <p 
            className="text-lg md:text-xl text-gray-200"
          >
            Where all our great things begin
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path d="M0,120 L1200,120 L1200,0 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

export default Banner
