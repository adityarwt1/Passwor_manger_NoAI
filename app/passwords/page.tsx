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
    <div className='flex justify-center items-center'>
      <div className='w-1/2  border  rounded-md m-5 shadow-md'>
        <div className='flex justify-between border border-gray-200 m-4 p-2 shadow rounded-sm '>
          <div className='mx-2   w-full flex justify-start '>Platform</div>
          <div className='mx-2   w-full flex justify-end'>Password</div>
          <div className='mx-2   w-full flex justify-end'>Option</div>
        </div>
        {passwords.length > 0 ? (
          passwords.map((element) => (
            <PasswordInVault key={element.plateform} plateform={element.plateform} password={element.password} />
          ))
        ) : (
          <div>Password not found</div>
        )}

      </div>
    </div>
  )
}

export default page
