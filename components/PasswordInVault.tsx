"use client"
import { Eye, EyeOff, MoreVertical } from 'lucide-react';
import React, { useState } from 'react'

interface PasswordInVaultProps {
  plateform: string;
  password: string;
}

const PasswordInVault: React.FC<PasswordInVaultProps> = ({ plateform, password }) => {
  const [see, setSee ] = useState("")
  return (
    <div className='flex mt-2 justify-around  border-t border-b py-2 hover:scale-105 items-center justify-items-center hover:bg-zinc-950 duration-300 hover:text-white'>
      <div className='flex justify-start w-full'>
        <div className='mx-4'>{plateform}</div>
      </div>
      <div className='flex justify-around w-full'>
        <div className='flex'>
          <input type="text" readOnly value={password} />
          <div className='mx-2'>{see === password ?<Eye/>:<EyeOff/>}</div>
        </div>
        <div><MoreVertical/></div>
      </div>
    </div>
  )
}

export default PasswordInVault
