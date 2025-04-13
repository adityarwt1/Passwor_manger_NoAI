"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const PasswordOverVier = () => {
    const [passwords, setpasswords] = useState([{plateform:'aditya' , password:'aditya@2487'}])
    const fetchPassword = async () => {
        try {
            const response = await fetch("/api/fetchPassword", {
                method: "GET"
            })

            const data = await response.json()
            console.log("API Response:", data)

            if (response.ok && data.success && Array.isArray(data.data)) {
                setpasswords(data.data)
                console.log("Setting passwords:", data.data)
            } else {
                console.error("API Error or invalid data format:", data)
                setpasswords([])
            }
        } catch (error) {
            console.error("Fetch error:", error)
            setpasswords([])
        }
    }
    //// checkin the length of the array
    
    
    useEffect(() => {
        fetchPassword()
    }, [])

    return (
        <div className='rounded-lg shadow-lg  w-2/6 py-5  duration-300 mt-2 border border-gray-300 ml-10 px-5 hover:scale-95 '>

            <div className='rounded-tr-md rounded-tl-md p-4 border-zinc-950 border hover:bg-zinc-950 text-xl hover:text-white duration-300 text-center '>Password Overview</div>

            {passwords && passwords.length > 0 ? (
                passwords.map((arrayElement, index) => (
                    <div key={index} className='flex justify-around mt-1 border-t border-b py-2 hover:scale-105 items-center justify-items-center hover:bg-zinc-950 duration-300 hover:text-white'>
                        <div className='flex justify-start w-full'>
                            <div className='mx-4'>{arrayElement.plateform || 'Unknown'}</div>
                        </div>
                        <div className='flex justify-around w-full'>
                            <div className='flex'>
                                <input type="text" readOnly value={arrayElement.password} />
                                <div className='mx-2'>see</div>
                            </div>
                            <div>:</div>
                        </div>
                    </div>
                ))
            ) : (
                <div className='mx-4'>
                    <div className='animate-bounce mt-5 text-center '><Link href="/add" className='border p-2 rounded-md bg-zinc-950 text-white'  >Click here to add password...</Link></div>
                    
                </div>
            )}

           

        </div>

    )
}

export default PasswordOverVier
