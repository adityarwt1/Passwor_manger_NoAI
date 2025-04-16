"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Copy, CopyCheckIcon, Delete, Edit, Eye, EyeOff } from 'lucide-react'

const PasswordOverview = () => {
    const [passwords, setPasswords] = useState([]);
    const [visiblePasswordId, setVisiblePasswordId] = useState("");
    const [copiedPasswordId, setCopiedPasswordId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchPasswords = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/fetchPassword", {
                method: "GET"
            });

            const data = await response.json();
            
            if (response.ok && data.success && Array.isArray(data.data)) {
                setPasswords(data.data);
            } else {
                console.error("API Error:", data.message || "Invalid data format");
                setPasswords([]);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setPasswords([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPasswords();
    }, []);

    const handleCopyPassword = (id, password) => {
        navigator.clipboard.writeText(password);
        setCopiedPasswordId(id);
        setTimeout(() => setCopiedPasswordId(""), 2000);
    };

    const handleDeletePassword = async (id) => {
        if (!confirm("Are you sure you want to delete this password?")) return;
        
        try {
            const response = await fetch("/api/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: id })
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete password');
            }
            
            await fetchPasswords();
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete password. Please try again.");
        }
    };

    return (
        <div className='rounded-lg shadow-lg w-full max-w-[500px] py-5 duration-300 mt-2 border border-gray-300 mx-auto md:ml-10 px-5 hover:scale-95'>
        <div className='rounded-tr-md rounded-tl-md p-4 border-zinc-950 border hover:bg-zinc-950 text-xl hover:text-white duration-300 text-center'>
            Password Overview
        </div>

        {isLoading ? (
            <div className="text-center p-4">Loading...</div>
        ) : passwords.length > 0 ? (
            passwords.map((item) => (
                <div key={item._id} className='mt-4 border-b pb-4 last:border-b-0'>
                    {/* Platform and Email Section */}
                    <div className='mb-2'>
                        <div className='flex items-center'>
                            <span className='font-medium mr-2'>{item.plateform || 'Unknown'}</span>
                            <span className='text-gray-500 text-sm'>......</span>
                        </div>
                        {item.email && (
                            <div className='text-sm text-gray-600 mt-1'>
                                <div>Email {item.email.split('@')[0]}</div>
                                <div className='text-xs'>({item.email})</div>
                            </div>
                        )}
                    </div>

                    {/* Password and Actions Section */}
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <input 
                                type={visiblePasswordId === item._id ? "text" : "password"}
                                readOnly
                                value={item.password}
                                className='max-w-[120px] overflow-hidden bg-transparent font-mono'
                                aria-label="Password"
                            />
                            <button 
                                onClick={() => setVisiblePasswordId(visiblePasswordId === item._id ? "" : item._id)}
                                className='ml-2 text-gray-500 hover:text-gray-700'
                            >
                                {visiblePasswordId === item._id ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className='flex space-x-3'>
                            <button 
                                onClick={() => handleCopyPassword(item._id, item.password)}
                                className='text-gray-500 hover:text-gray-700'
                            >
                                {copiedPasswordId === item._id ? <CopyCheckIcon size={18} /> : <Copy size={18} />}
                            </button>
                            <Link 
                                href={`/edit/${item._id}`}
                                className='text-blue-500 hover:text-blue-700'
                            >
                                <Edit size={18} />
                            </Link>
                            <button 
                                onClick={() => handleDeletePassword(item._id)}
                                className='text-red-500 hover:text-red-700'
                            >
                                <Delete size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className='text-center p-4'>
                <Link 
                    href="/add" 
                    className='inline-block border p-2 rounded-md bg-zinc-950 text-white hover:bg-zinc-800 transition-colors'
                >
                    Click here to add password...
                </Link>
            </div>
        )}
    </div>
);
}

export default PasswordOverview;