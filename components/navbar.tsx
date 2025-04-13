"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  // variable declare 
  const router = useRouter()
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [userdata, setUserdata] = useState(null)

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
  }

  /// redirecting to login page

  const pushToLoginPage = ()=>{
    router.push("/login")
  }
  useEffect(() => {
    gettingVerification()
  }, [])

  return (
    <div className='flex shadow-md p-3 items-center justify-around'>
      <div className='w-1/2'>
        Logo
      </div>
      <div className='flex w-full'>
       <div className='text-center flex justify-center items-center'> <Link href="/" className='px-4 py-2 border-gray-500 rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Dashboard</Link></div>
        <Link href="/passwords" className='px-4 py-2 border-gray-500 rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Password Vault</Link>
        <Link href="/generator" className='px-4 py-2 border-gray-500 rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Password Generator</Link>
        <Link href="/help" className='px-4 py-2 border-gray-500 rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Help & Support</Link>
        <Link href="/add" className='px-4 py-2 border-gray-500 rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Add</Link>
      </div>
      <div className='flex justify-end mx-2 items-center w-1/2'>
        {isLoggedIn ? <button onClick={handleSignInLogout} className='bg-zinc-950 hover:scale-95 duration-300 text-white p-2 rounded-md'>Logout</button>: <button onClick={pushToLoginPage} className='bg-zinc-950 hover:scale-95 duration-300 text-white p-2 rounded-md'>Login</button> }
      </div>
    </div>
  )
}

export default Navbar
