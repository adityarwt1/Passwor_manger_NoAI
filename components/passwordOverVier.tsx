"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Copy, CopyCheckIcon, Delete, Edit, Eye, EyeOff } from 'lucide-react'

interface PlatformPassword {
    plateform: string
    password: string
    _id: string
}

interface PasswordItem {
    _id: string
    username: string
    email: string
    plateform: string[]
    plateFormPassword: PlatformPassword[]
    createdAt: string
    updatedAt: string
}

interface Username {
    username: string
}
const PasswordOverview: React.FC<Username> = ({ username }) => {
    const [passwordData, setPasswordData] = useState<PasswordItem[]>([])
    const [visiblePasswordId, setVisiblePasswordId] = useState("")
    const [copiedPasswordId, setCopiedPasswordId] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState("")


    const fetchPasswords = async () => {


        setIsLoading(true)
        try {
            let url = `/api/fetchPassword?username=${username}`
            if (query.length > 0) {
                url = `/api/fetchPassword?query=${query}`
            }
            const response = await fetch(url, {
                method: "GET"
            })

            const data = await response.json()

            if (response.ok && data.success && Array.isArray(data.data)) {
                setPasswordData(data.data)
            } else {
                console.error("API Error:", data.message || "Invalid data format")
                setPasswordData([])
            }
        } catch (error) {
            console.error("Fetch error:", error)
            setPasswordData([])
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        fetchPasswords()
    }, [query])

    const handleCopyPassword = (id: string, password: string) => {
        navigator.clipboard.writeText(password)
        setCopiedPasswordId(id)
        setTimeout(() => setCopiedPasswordId(""), 2000)
    }

    const handleDeletePassword = async (id: string) => {
        const confirDeletePassword = confirm("Are you sure you want to delete this password?")
        if (!confirDeletePassword) return

        try {
            let url = `api/delete?username=${username}`
            if (query) {
                url += `&query=${query}`
            }
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: id })
            })

            if (!response.ok) {
                throw new Error('Failed to delete password')
            }

            await fetchPasswords()
        } catch (error) {
            console.error("Delete error:", error)
            alert("Failed to delete password. Please try again.")
        }
    }

    // Function to get the platform icon letter
    const getPlatformIcon = (platformName: string) => {
        return platformName.charAt(0).toUpperCase();
    }

    // Function to get the username or email for a platform
    const getPlatformUsername = (platform: string) => {
        if (platform.toLowerCase().includes('email')) {
            return 'mongodb2487@gmail.com';
        } else if (platform.toLowerCase().includes('spotify')) {
            return 'pubgmobile2487@gmail.com';
        } else if (platform.toLowerCase().includes('riot')) {
            return 'lvmMaestro/lvMaestro';
        }
        return 'aditya_rwt1';
    }

    return (
        <div className="container mx-auto p-4 w-full">
            <div className="w-full max-w-md mb-4 flex ">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-4 hidden         pr-12 py-2 border border-black rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <div className="col-span-3 flex justify-center items-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : passwordData.length > 0 ? (
                    passwordData.flatMap((userData) =>
                        userData.plateFormPassword.map((platform) => {
                            const isVisible = visiblePasswordId === platform._id;
                            const platformName = platform.plateform.split('(')[0].trim();
                            const platformIcon = getPlatformIcon(platformName);
                            const username = getPlatformUsername(platform.plateform);

                            return (
                                <div key={platform._id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-lg font-semibold">
                                            {platformIcon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-lg">{platformName}</h3>
                                            <p className="text-gray-600 text-sm">{username}</p>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => setVisiblePasswordId(isVisible ? "" : platform._id)}
                                                className="text-gray-500 hover:text-gray-700 mx-1"
                                            >
                                                {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                            <button
                                                onClick={() => handleCopyPassword(platform._id, platform.password)}
                                                className="text-gray-500 hover:text-gray-700 mx-1"
                                            >
                                                {copiedPasswordId === platform._id ? <CopyCheckIcon size={20} /> : <Copy size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 mb-1">Password</p>
                                        <div className="bg-gray-100 p-2 rounded">
                                            {isVisible ? platform.password : '•'.repeat(7)}
                                        </div>
                                    </div>

                                    <div className="flex justify-between">

                                        <button
                                            onClick={() => handleDeletePassword(platform._id)}
                                            className="text-red-600 hover:text-red-800 flex items-center text-sm"
                                        >
                                            <Delete size={16} className="mr-1" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )
                ) : (
                    <div className="col-span-3 text-center p-6">
                        <div className="mb-4 text-gray-500">
                            No passwords saved yet
                        </div>
                        <Link
                            href="/add"
                            className='inline-flex items-center px-4 py-2 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 transition-colors font-medium'
                        >
                            Add Your First Password
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PasswordOverview