"use client"
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  // variable declare 
  const router = useRouter()
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [userdata, setUserdata] = useState(null);
  const [menu, setMenu] = useState(false);

  // getting token verification from api
  const gettingVerification = async () => {
    const response = await fetch("/api/navbar", {
      method: "GET"
    })
    const data = await response.json();
    if (data.success) {
      const extractedData = data.data; // Extract user data from response
      setUserdata(extractedData);
      setisLoggedIn(true)
      // Log the extracted data directly
    }
  }
  useEffect(() => {
    gettingVerification()
  }, [])

  /// handling sign in and sign out
  const handleSignInLogout = async () => {
    if (isLoggedIn) {
      const response = await fetch("api/signup", {
        method: "DELETE"
      })
      if (response.ok)
        setisLoggedIn(false)
      setUserdata(null)
      router.push("/")
    }
    else {
      router.push("/signup")
    }
    setMenu(false) // Close mobile menu after login/logout
  }

  /// redirecting to login page
  const pushToLoginPage = () => {
    router.push("/login")
    setMenu(false) // Close mobile menu after clicking login
  }
  
  useEffect(() => {
    gettingVerification()
  }, [])

  // Handle navigation click
  const handleNavClick = () => {
    setMenu(false)
  }

  return (
    <div className='w-full'>
      <div className='flex shadow-md p-3 w-full items-center justify-between'>
        <div className='w-1/6'>
          Logo
        </div>
        {/* Desktop Navigation */}
        <div className='hidden md:flex flex-nowrap w-4/6 justify-center space-x-2'>
          <Link href="/" className='whitespace-nowrap px-3 py-2 active:bg-zinc-950 active:text-white border-gray-500 rounded-md shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Dashboard</Link>
          <Link href="/passwords" className='whitespace-nowrap px-3 py-2 active:bg-zinc-950 active:text-white border-gray-500 rounded-md shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Password Vault</Link>
          <Link href="/generator" className='whitespace-nowrap px-3 py-2 active:bg-zinc-950 active:text-white border-gray-500 rounded-md shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Password Generator</Link>
          <Link href="/help" className='whitespace-nowrap px-3 py-2 active:bg-zinc-950 active:text-white border-gray-500 rounded-md shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Help & Support</Link>
          <Link href="/add" className='whitespace-nowrap px-3 py-2 active:bg-zinc-950 active:text-white border-gray-500 rounded-md shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Add</Link>
        </div>

        {/* Mobile Navigation */}
        <div className='md:hidden flex items-center'>
          <button onClick={() => setMenu(!menu)} className='p-2'>
            {!menu ? <Menu size={30} /> : <X size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menu && (
          <div className='absolute top-16 left-0 right-0 bg-white shadow-lg z-50 md:hidden'>
            <div className='flex flex-col p-4 space-y-3'>
              <Link href="/" onClick={handleNavClick} className='whitespace-nowrap px-3 py-2 active:bg-zinc-950 active:text-white border-gray-500 rounded-md shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Dashboard</Link>
              <Link href="/passwords" onClick={handleNavClick} className=' whitespace-nowrap px-3 py-2 active:bg-zinc-950 active:text-white border-gray-500 rounded-md shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Password Vault</Link>
              <Link href="/generator" onClick={handleNavClick} className='whitespace-nowrap px-3 py-2 active:bg-zinc-950 active:text-white border-gray-500 rounded-md shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Password Generator</Link>
              <Link href="/help" onClick={handleNavClick} className='whitespace-nowrap px-3 py-2 active:bg-zinc-950 active:text-white border-gray-500 rounded-md shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Help & Support</Link>
              <Link href="/add" onClick={handleNavClick} className='whitespace-nowrap px-3 py-2 active:bg-zinc-950 active:text-white border-gray-500 rounded-md shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Add</Link>
              {/* Mobile Login/Logout Button */}
              {isLoggedIn ? 
                <button onClick={handleSignInLogout} className='w-full bg-zinc-950 hover:scale-95 duration-300 text-white p-2 rounded-md'>Logout</button> : 
                <button onClick={pushToLoginPage} className='w-full bg-zinc-950 hover:scale-95 duration-300 text-white p-2 rounded-md'>Login</button>
              }
            </div>
          </div>
        )}

        {/* Desktop Login/Logout Button */}
        <div className='hidden md:flex w-1/6 justify-end'>
          {isLoggedIn ? 
            <button onClick={handleSignInLogout} className='bg-zinc-950 hover:scale-95 duration-300 text-white p-2 rounded-md'>Logout</button> : 
            <button onClick={pushToLoginPage} className='bg-zinc-950 hover:scale-95 duration-300 text-white p-2 rounded-md'>Login</button>
          }
        </div>
      </div>
    </div>
  )
}
  export default Navbar;
