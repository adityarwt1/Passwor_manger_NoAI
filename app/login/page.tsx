"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const page = () => {
    const router = useRouter()
    const [username, setusername ] = useState("");
    const [password , setpassword] = useState("");
    const [serverMessage, setMessage] = useState();

    const handleLogin = async (e) =>{
        e.preventDefault()
        const response = await fetch("/api/login",{
            method: "POST",
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({username, password})

        });
        const data = await  response.json();
        if(response.ok){
            setMessage(data.message)
            router.push("/")
        }
        if(!response.ok){
            setMessage(data.message)
        }
    }
    return (
        <div className='flex w-full h-screen items-center justify-center'>
            <div className='border px-30 py-10 rounded-md shadow-md ' >
                <div className='text-2xl font-semibold text-center'>Login Page</div>
                <form onSubmit={handleLogin} className='flex-col flex mt-5'>
                    <label htmlFor="username" className='mx-2'>Username</label>
                    <input type="text" name="" id="username" className='border px-2 rounded-md py-1 ' onChange={(e)=> setusername(e.target.value)} placeholder='enter your username' />
                    <label htmlFor="password" className='mx-2'>Password</label>
                    <input type="text" name="" id="password" className='border px-2 rounded-md py-1 ' onChange={(e)=> setpassword(e.target.value)} placeholder='enter your password' />
                    <button type='submit' className='bg-zinc-950 text-white rounded-md mt-2 p-2 duration-300 hover:scale-105'>Submit</button>
                </form>
                <div className='text-center mt-1'>
                    <Link  href="/signup" className='underline text-center'>Signup</Link>
                </div>
                <div>{serverMessage}</div>
            </div>
        </div>
    )
}

export default page
