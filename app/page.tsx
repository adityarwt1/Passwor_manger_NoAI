"use client"
import PasswordOverVier from '@/components/passwordOverVier'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const k = () => {
  const router = useRouter()
  const cookieConfirmation = async ()=>{
    const response = await fetch("/api/cookieconfirmation",{
      method: "GET"
    })
    if (!response.ok){
      router.push("/login")
    }
  }

  useEffect(()=>{
    cookieConfirmation()
  },[])
  return (
    <div className='flex flex-col justify-center items-center p-4 gap-4'>
      <PasswordOverVier />
    </div>
  )
}

export default k
