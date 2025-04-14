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
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='w-full max-w-md border shadow-lg p-4 rounded-xl duration-300'>
        <h1 className='text-center text-xl font-semibold border w-fit mx-auto p-2 rounded-md px-4 duration-300 hover:bg-zinc-950 hover:text-white mb-6'>Password Generator</h1>
        
        <div className='space-y-4'>
          <div className='flex flex-col'>
            <label className='rounded-t py-1 border w-full text-center hover:bg-zinc-950 duration-300 hover:text-white'>
              Length
            </label>
            <input 
              type="number" 
              name='length'
              required 
              className='border-b border-l border-r hover:scale-105 hover:bg-zinc-950 hover:text-white w-full outline-none rounded-b px-4 py-2 duration-300'
              placeholder='6,8,10,15' 
              minLength={5}
              onChange={(e) => setlength(parseInt(e.target.value))}
            />
          </div>

          <div className='flex flex-col'>
            <label className='rounded-t py-1 border w-full text-center hover:bg-zinc-950 duration-300 hover:text-white'>
              Uppercase
            </label>
            <select 
              className='border-b border-l border-r hover:scale-105 hover:bg-zinc-950 hover:text-white w-full outline-none rounded-b px-4 py-2 duration-300'
              onChange={(e) => setuppercase(e.target.value === 'true')}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='rounded-t py-1 border w-full text-center hover:bg-zinc-950 duration-300 hover:text-white'>
              Lowercase
            </label>
            <select 
              className='border-b border-l border-r hover:scale-105 hover:bg-zinc-950 hover:text-white w-full outline-none rounded-b px-4 py-2 duration-300'
              onChange={(e) => setlowercase(e.target.value === 'true')}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='rounded-t py-1 border w-full text-center hover:bg-zinc-950 duration-300 hover:text-white'>
              Numbers
            </label>
            <select 
              className='border-b border-l border-r hover:scale-105 hover:bg-zinc-950 hover:text-white w-full outline-none rounded-b px-4 py-2 duration-300'
              onChange={(e) => setnumbers(e.target.value === 'true')}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='rounded-t py-1 border w-full text-center hover:bg-zinc-950 duration-300 hover:text-white'>
              Symbols
            </label>
            <select 
              className='border-b border-l border-r hover:scale-105 hover:bg-zinc-950 hover:text-white w-full outline-none rounded-b px-4 py-2 duration-300'
              onChange={(e) => setsymbols(e.target.value === 'true')}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <button onClick={handleGeneratePassword} className='bg-zinc-950 text-white w-full mx-10 mt-2 py-2 rounded-md duration-300 hover:scale-105'>Generate Password</button>

          <div className={`mt-4 p-2 border rounded w-full text-center ${showPassword ? 'block' : 'hidden'}`}>
            {generatedPassword}
            <button onClick={() => navigator.clipboard.writeText(generatedPassword)}>Copy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
