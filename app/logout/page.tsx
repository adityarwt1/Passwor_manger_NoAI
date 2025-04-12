"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
const page = () => {
    const router = useRouter()

    const logoutting = async () => {
        const response = await fetch("/api/signup", {
            method: "DELETE"
        })
        const data = await response.json()
        if (data.success) {
            router.push('/')
        }
    }
useEffect(()=>{
    logoutting()
},[])
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='animate-bounce'>Logoutting....</div>
        </div>
    )
}

export default page
