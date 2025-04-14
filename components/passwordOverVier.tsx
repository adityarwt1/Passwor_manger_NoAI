"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Copy, CopyCheckIcon, Delete, Edit, Eye, EyeOff, } from 'lucide-react'

const PasswordOverVier = () => {
    const [passwords, setpasswords] = useState([]);
    const [toggle, setToggle] = useState("");
    const [copy, setCopy] = useState("");
    const [deletePassword, setDeletePassword] = useState("");
    const [editPassword, setEditPassword] = useState("")
    const fetchPassword = async () => {
        try {
            const response = await fetch("/api/fetchPassword", {
                method: "GET"
            })

            const data = await response.json()
            console.log("API Response:", data)

            if (response.ok && data.success && Array.isArray(data.data)) {
                setpasswords(data.data)
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


    /// handling for cooy the password
    const handleCOpyEvent = () => {

    }
    if (copy.length > 0) {
        setTimeout(() => {
            setCopy("")
        }, 1000);
    }

    /// delete password
    const handleDeletePassword = async () => {
        const response = await fetch("/api/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( deletePassword )
        })
        const data = await response.json()
        if (response.ok) {
            useEffect(() => {
                fetchPassword()
            }, [])
        }
    }
    return (
        <div className='rounded-lg shadow-lg w-full md:w-[500px] py-5 duration-300 mt-2 border border-gray-300 mx-auto md:ml-10 px-5 hover:scale-95'>
            <div className='rounded-tr-md rounded-tl-md p-4 border-zinc-950 border hover:bg-zinc-950 text-xl hover:text-white duration-300 text-center'>
                Password Overview
            </div>

            {passwords && passwords.length > 0 ? (
                passwords.map((arrayElement, index) => (
                    <div key={index} className='flex flex-col sm:flex-row justify-around mt-1 border-t border-b py-2 hover:scale-105 items-center hover:bg-zinc-950 duration-300 hover:text-white'>
                        <div className='flex justify-start w-full'>
                            <div className='mx-4'>{arrayElement.plateform || 'Unknown'}</div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-around w-full'>
                            <div className='flex items-center'>
                                <input type={toggle === arrayElement._id ? `text` : `password`}
                                    readOnly
                                    value={arrayElement.password}
                                    disabled
                                    className='max-w-[150px] overflow-hidden' />
                                <div className='mx-2'>{toggle === arrayElement._id ? <EyeOff onClick={() => setToggle("")} /> : <Eye onClick={() => setToggle(arrayElement._id)} />}</div>
                                <div className='mx-2'>{copy === arrayElement._id ? <CopyCheckIcon /> : <Copy onClick={() => { setCopy(arrayElement._id); navigator.clipboard.writeText(arrayElement.password) }} />}</div>
                            </div>
                            <div><Delete onClick={() => { setDeletePassword(arrayElement._id); handleDeletePassword() }} /></div>
                            <div className='ml-2'><Link href={arrayElement._id}><Edit /></Link></div>
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
