import type React from "react"
import { useState, useEffect } from "react"
import logo from "/logo.webp"

const navigation = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Ideas", href: "/" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
]

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", controlHeader)
    return () => window.removeEventListener("scroll", controlHeader)
  }, [lastScrollY])

  const handleNavClick = (href: string) => {
    setCurrentPath(href)
    window.history.pushState(null, "", href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-orange-500/95 backdrop-blur-sm shadow-lg" : "bg-orange-500"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => handleNavClick("/")} className="flex items-center cursor-pointer">
            <img src={logo} alt="logo" className="invert brightness-[0] w-24" />
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = currentPath === item.href || (item.name === "Ideas" && currentPath === "/")

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-orange-200 cursor-pointer ${
                    isActive ? "text-white border-b-2 border-white pb-1" : "text-orange-100"
                  }`}
                >
                  {item.name}
                </button>
              )
            })}
          </nav>

          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
