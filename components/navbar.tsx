import Link from 'next/link'
import React from 'react'

const navbar = () => {
  return (
    <div className='flex shadow-md p-4  items-center justify-around'>
      <div>
        Logo
      </div>
      <div className='flex'>
        <Link href="/" className='px-4 py-2 border-gray-500  rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white '>Dashboard</Link>
        <Link href="/passwords" className='px-4 py-2 border-gray-500  rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white '>Password Vault</Link>
        <Link href="/generator" className='px-4 py-2 border-gray-500  rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white '>Password Generator</Link>
        <Link href="/help" className='px-4 py-2 border-gray-500  rounded-md mx-4 shadow-sm duration-300 hover:scale-95 hover:bg-zinc-950 hover:text-white '>Help & Support</Link>
      </div>
      <div className='flex justify-center items-center'>
      <div className='w-10 bg-amber-300 rounded-full h-10 text-center items-center flex justify-center text-white '><span>A</span></div>
        <div>Setting</div>
        </div>
    </div>
  )
}

export default navbar
