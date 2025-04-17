"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const page = () => {
    const router = useRouter()
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [serverMessage, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ username, password })

        });
        const data = await response.json();
        if (response.ok) {
            setMessage(data.message)
            router.push("/")
        }
        if (!response.ok) {
            setMessage(data.message)
        }
    }
    const cookieConfirmation = async () => {
        const response = await fetch("/api/cookieconfirmation", {
            method: "GET"
        })
        if (response.ok) {
            router.push("/")
        }
    }

    useEffect(() => {
        cookieConfirmation()
    }, [])
    return (
        <div className='flex w-full min-h-screen items-center justify-center p-4'>
            <div className='border rounded-lg shadow-lg w-full max-w-md p-6 md:p-8'>
                <h1 className='text-2xl md:text-3xl font-semibold text-center mb-6'>Login Page</h1>
                <form onSubmit={handleLogin} className='flex flex-col space-y-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="username" className='text-lg font-medium mb-2'>Username</label>
                        <input
                            type="text"
                            id="username"
                            className='w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-zinc-950 transition duration-200'
                            onChange={(e) => setusername(e.target.value)}
                            placeholder='Enter your username'
                            required
                        />
                    </div>
                    <div className='flex flex-col relative'>
                        <label htmlFor="password" className='text-lg font-medium mb-2'>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className='w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-zinc-950 transition duration-200 pr-10'
                            onChange={(e) => setpassword(e.target.value)}
                            placeholder='Enter your password'
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[38px] mt-5  transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={20}  className='text-black' /> : <FaEye size={20} className='text-black' />}
                        </button>
                    </div>
                    <button     
                        type='submit'
                        className='w-full py-3 px-6 bg-zinc-950 text-white rounded-md hover:bg-zinc-800 transition duration-200 mt-4'
                    >
                        Login
                    </button>
                </form>
                <div className='mt-4 text-center'>
                    <Link href="/signup" className='text-zinc-950 hover:underline'>
                        Don't have an account? Sign up
                    </Link>
                </div>
                {serverMessage && (
                    <div className='mt-4 text-center text-sm'>{serverMessage}</div>
                )}
            </div>
        </div>
    )
}

export default page