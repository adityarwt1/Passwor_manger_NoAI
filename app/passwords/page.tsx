"use client"
import PasswordInVault from '@/components/PasswordInVault'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [passwords, setpasswords] = useState<{ plateform: string, password: string }[]>([])

  const fetchPassword = async () => {
    const response = await fetch("/api/fetchPassword", {
      method: "GET"
    })
    const data = await response.json();

    if (response.ok) {
      setpasswords(data.data)
    }
  }

  useEffect(() => {
    fetchPassword()
  }, [])

  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <div className='w-full max-w-4xl border rounded-lg shadow-lg'>
        <div className='flex justify-between border-b p-4 bg-gray-50 rounded-t-lg'>
          <div className='w-1/3 font-medium text-gray-700'>Platform</div>
          <div className='w-1/3 text-center font-medium text-gray-700'>Password</div>
          <div className='w-1/3 text-right font-medium text-gray-700'>Options</div>
        </div>
        {passwords.length > 0 ? (
          <div className='divide-y'>
            {passwords.map((element) => (
              <PasswordInVault 
                key={element.plateform} 
                plateform={element.plateform} 
                password={element.password} 
              />
            ))}
          </div>
        ) : (
          <div className='p-8 text-center text-gray-500'>
            No passwords found in vault
          </div>
        )}
      </div>
    </div>
  )
}

export default page
