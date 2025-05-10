"use client"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, UserProfile } from '@clerk/nextjs'
import { Menu, X, User, LogOut, LogIn, Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface userdata {
  email: string
}

const Navbar = () => {


  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<userdata | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch user authentication status

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
    { href: "/generator", label: "Password Generator" },
    { href: "/help", label: "Help & Support" },
    { href: "/add", label: "Add Password" }
  ]


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

          </div>

          {/* Mobile Menu Button */}
          <div className='flex items-center '>
            <Link href={`/add`} className='md:hidden p-2 mr-4 rounded-md flex bg-zinc-950 text-white'><Plus /> Add</Link>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-700 hover:text-zinc-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            <SignedIn><UserButton /></SignedIn><SignedOut><div className='mx-2'><SignInButton /></div><SignUpButton /></SignedOut>
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
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar