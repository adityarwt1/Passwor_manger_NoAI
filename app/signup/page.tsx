"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const router = useRouter()
    const [username, setusername] = useState("")
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [serverMessage, setserverMessage] = useState("");

    /// handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();

        setserverMessage(data.data)
        if (response.ok) {
            router.push("/")
        }


    }
    return (
        <div className='flex w-full min-h-screen items-center justify-center p-4'>
            <div className='border rounded-lg shadow-lg w-full max-w-md p-6 md:p-8'>
                <h1 className='text-2xl md:text-3xl font-semibold text-center mb-6'>Sign Up</h1>
                <form onSubmit={handleSubmit} method='POST' className='flex flex-col space-y-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="username" className='text-lg font-medium mb-2'>Username</label>
                        <input 
                            type="text" 
                            required 
                            name="username" 
                            onChange={(e) => setusername(e.target.value)} 
                            id="username" 
                            className='w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-zinc-950 transition duration-200'
                            placeholder='Create username'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='text-lg font-medium mb-2'>E-mail</label>
                        <input 
                            type="email" 
                            required 
                            name="email" 
                            onChange={(e) => setemail(e.target.value)} 
                            id="email" 
                            className='w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-zinc-950 transition duration-200'
                            placeholder='Enter email address'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='text-lg font-medium mb-2'>Password</label>
                        <input 
                            type="password" 
                            required 
                            name="password" 
                            onChange={(e) => setpassword(e.target.value)} 
                            id="password" 
                            className='w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-zinc-950 transition duration-200'
                            placeholder='Enter password'
                        />
                    </div>
                    <button
                        type="submit"
                        className='w-full py-3 px-6 bg-zinc-950 text-white rounded-md hover:bg-zinc-800 transition duration-200 mt-4'
                    >
                        Sign Up
                    </button>
                    <div className='mt-4 text-center'>
                        <Link href="/login" className='text-zinc-950 hover:underline'>
                            Already have an account? Login
                        </Link>
                    </div>
                    {serverMessage && (
                        <div className='p-3 bg-red-400 text-white rounded-md text-center'>
                            {serverMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default page
