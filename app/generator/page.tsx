"use client"
import { defaultOverrides } from 'next/dist/server/require-hook';
import React, { useState } from 'react'

const page = () => {


  const [length, setlength] = useState(12);
  const [uppercase, setuppercase] = useState(true);
  const [lowercase, setlowercase] = useState(true);
  const [numbers, setnumbers] = useState(true)
  const [symbols, setsymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [copied, setcopied] = useState(false)


  const generatePassword = (length: number, uppercase: boolean, lowercase: boolean, numbers: boolean, symbols: boolean) => {
    /// there we are getting characger
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+=-';

    /// this is for return and making of passeord
    let allowedChars = ""
    let password = ''

    //// allowing what me made of password
    allowedChars += lowercase ? lowercaseChars : "";
    allowedChars += uppercase ? uppercaseChars : "";
    allowedChars += numbers ? numberChars : '';
    allowedChars += symbols ? symbolChars : "";

    //checking the demand and need on makinng a random password
    if (length <= 0) {
      return 'length should be alteal one character'
    }
    if (allowedChars.length === 0) {
      return "atleast one set of character be selected"
    }

    // genereatting pass word with for loop
    for (let i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * allowedChars.length)
      password += allowedChars[randomIndex]

    }
    return password
  }

  const handleGeneratePassword = () => {
    const password = generatePassword(length, uppercase, lowercase, numbers, symbols);
    setGeneratedPassword(password);
    setshowPassword(true)
  }
const handlecopy =()=>{
   navigator.clipboard.writeText(generatedPassword);
  setcopied(true);
  setInterval(() => {
    setcopied(false)
  }, 1000);
}
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className=' h-fit border shadow-lg p-4 flex flex-col justify-center items-center w-1/2 rounded-xl px-10 duration-300'>
        <div className='text-center border w-fit p-2 rounded-md px-50 duration-300 hover:bg-zinc-950 hover:text-white'>Password Generator</div>
        <div className='flex flex-col justify-center items-center    w-full mt-5  '>
          <div className='rounded-tr rounded-tl py-1 border  w-full text-center hover:bg-zinc-950 duration-300 hover:text-white '>
            Length
          </div>
          <input type="number" name='length' required className='border-b border-l border-r hover:scale-105 hover:bg-zinc-950 hover:text-white hover:border-t w-full outline-none rounded-br rounded-bl px-4  active:bg-zinc-950 active:text-white duration-300 py-2' placeholder='6,8,10,15' minLength={5} onChange={(e) => setlength(parseInt(e.target.value))} />
          <div className='rounded-tr rounded-tl py-1 border  w-full text-center hover:bg-zinc-950 duration-300 hover:text-white mt-4'>
            Uppercase
          </div>
          <select className='border-b border-l border-r hover:scale-105 hover:bg-zinc-950 hover:text-white hover:border-t w-full outline-none rounded-br rounded-bl pr-10 px-4 active:bg-zinc-950 active:text-white duration-300 py-2' onChange={(e) => setuppercase(e.target.value === 'true')}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <div className='rounded-tr rounded-tl py-1 border  w-full text-center hover:bg-zinc-950 duration-300 hover:text-white mt-4'>
            Lowercase
          </div>
          <select className='border-b border-l border-r hover:scale-105 hover:bg-zinc-950 hover:text-white hover:border-t w-full outline-none rounded-br rounded-bl pr-10 px-4 active:bg-zinc-950 active:text-white duration-300 py-2' onChange={(e) => setlowercase(e.target.value === 'true')}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <div className='rounded-tr rounded-tl py-1 border  w-full text-center hover:bg-zinc-950 duration-300 hover:text-white mt-4'>
            Numbers
          </div>
          <select className='border-b border-l border-r hover:scale-105 hover:bg-zinc-950 hover:text-white hover:border-t w-full outline-none rounded-br rounded-bl pr-10 px-4 active:bg-zinc-950 active:text-white duration-300 py-2' onChange={(e) => setnumbers(e.target.value === 'true')}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <div className='rounded-tr rounded-tl py-1 border  w-full text-center hover:bg-zinc-950 duration-300 hover:text-white mt-4'>
            Symbols
          </div>
          <select className='border-b border-l border-r hover:scale-105 hover:bg-zinc-950 hover:text-white hover:border-t w-full outline-none rounded-br rounded-bl pr-10 px-4 active:bg-zinc-950 active:text-white duration-300 py-2' onChange={(e) => setsymbols(e.target.value === 'true')}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button onClick={handleGeneratePassword} className='bg-zinc-950 text-white w-full mx-10 mt-2 py-2 rounded-md duration-300 hover:scale-105'>Generate Password</button>

          <div className={`mt-4 p-2 border rounded w-full text-center ${showPassword ? 'block' : 'hidden'}`}>
            {generatedPassword}
            <button onClick={handlecopy} className='mx-5 border px-2 rounded-md duration-300 hover:bg-zinc-950 hover:text-white'>{copied? "Copied":"Copy"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
