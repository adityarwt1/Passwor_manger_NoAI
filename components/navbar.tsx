"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  // variable declare 
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [userdata, setUserdata] = useState({})

  // getting token verification from api
  const gettingVerification = async () => {
    const response = await fetch("/api/navbar", {
      method: "GET"
    })
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      setisLoggedIn(true)
      setUserdata(data)
    }
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
        <Link href="/" className='px-4 py-2 border-gray-500 rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Dashboard</Link>
        <Link href="/passwords" className='px-4 py-2 border-gray-500 rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Password Vault</Link>
        <Link href="/generator" className='px-4 py-2 border-gray-500 rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Password Generator</Link>
        <Link href="/help" className='px-4 py-2 border-gray-500 rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white'>Help & Support</Link>
      </div>
      <div className='flex justify-around items-center w-1/2'>
        <div className='w-10 bg-amber-300 rounded-full h-10 text-center items-center flex justify-center text-white'><span>A</span></div>
        <div>Setting</div>
        <Link href="/signup">Sign-Up</Link>
      </div>
    </div>
  )
}

export default Navbar
