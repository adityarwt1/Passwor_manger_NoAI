"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Page = () => {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [serverMessage, setServerMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setServerMessage("");

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.data || "Signup failed");
            }

            router.push("/");
        } catch (error) {
            setServerMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='flex w-full min-h-screen items-center justify-center p-4'>
            <div className='border rounded-lg shadow-lg w-full max-w-md p-6 md:p-8'>
                <h1 className='text-2xl md:text-3xl font-semibold text-center mb-6'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="username" className='text-lg font-medium mb-2'>Username</label>
                        <input 
                            type="text" 
                            required 
                            name="username" 
                            onChange={(e) => setUsername(e.target.value)} 
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
                            onChange={(e) => setEmail(e.target.value)} 
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
                            onChange={(e) => setPassword(e.target.value)} 
                            id="password" 
                            className='w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-zinc-950 transition duration-200'
                            placeholder='Enter password'
                            minLength={4}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-6 bg-zinc-950 text-white rounded-md hover:bg-zinc-800 transition duration-200 mt-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Creating account...' : 'Sign Up'}
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

export default Page