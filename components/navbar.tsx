"use client"
import { Menu, X, User, LogOut, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface userdata{
  email: string 
}

const Navbar = () => {

  
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<userdata | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch user authentication status
  const checkAuthStatus = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/navbar", {
        method: "GET",
        credentials: 'include'
      })
      const data = await response.json()
      
      if (data.success) {
        setUserData(data.data)
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }
useEffect(()=>{
  checkAuthStatus()
},[])
  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "DELETE",
        credentials: 'include'
      })
      
      if (response.ok) {
        setIsLoggedIn(false)
        setUserData(null)
        router.push("/")
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }
    setMobileMenuOpen(false)
  }

  // Navigation items
  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/passwords", label: "Password Vault" },
    { href: "/generator", label: "Password Generator" },
    { href: "/help", label: "Help & Support" },
    { href: "/add", label: "Add Password" }
  ]

  useEffect(() => {
    checkAuthStatus()
  }, [])

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-zinc-800">
              <span className="bg-zinc-900 text-white px-3 py-1 rounded">SecuroPass</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-zinc-200 animate-pulse"></div>
            ) : isLoggedIn ? (
              <div className="flex items-center space-x-2">
                {userData?.email && (
                  <span className="text-sm text-zinc-600 hidden lg:inline">
                    {userData.email}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="px-3 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors duration-200"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 hover:text-zinc-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-zinc-100">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-zinc-100">
                {isLoading ? (
                  <div className="h-10 bg-zinc-100 rounded-md animate-pulse"></div>
                ) : isLoggedIn ? (
                  <div className="space-y-2">
                    {userData?.email && (
                      <div className="flex items-center px-3 py-2 text-sm text-zinc-600">
                        <User size={16} className="mr-2" />
                        <span>{userData.email}</span>
                      </div>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors duration-200"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        router.push("/login")
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors duration-200"
                    >
                      <LogIn size={16} />
                      <span>Login</span>
                    </button>
                    <button
                      onClick={() => {
                        router.push("/signup")
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors duration-200"
                    >
                      <User size={16} />
                      <span>Sign Up</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar