"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const router = useRouter()
    const [plateform, setPlateform]= useState("");
    const [password, setPassword] = useState("")
    const [disableSubmit, setDisableSubmit] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisableSubmit(true)
        const response = await fetch("/api/add",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({plateform,password})
        })

        if(response.ok){
            router.push("/")
        }
    }
  return (
    <div className="flex w-full h-screen justify-center items-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Add Password</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
          <div className="flex flex-col">
            <label htmlFor="platform" className="text-sm mb-1">Sitename</label>
            <input
              type="text"
              name="platform"
              id="platform"
              placeholder="Enter sitename"
              className="px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e)=> setPlateform(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm mb-1">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter site password"
              className="px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e)=> setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full py-2 bg-white text-black font-medium rounded-md hover:bg-zinc-200 transition"
            disabled={disableSubmit}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default page
