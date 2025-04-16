"use client"
import { Copy, CopyCheckIcon, Delete, Edit, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Page = () => {
  const router = useRouter()
  const [passwords, setPasswords] = useState<{ _id: string, plateform: string, password: string, email?: string }[]>([])
  const [visiblePasswordId, setVisiblePasswordId] = useState("")
  const [copiedPasswordId, setCopiedPasswordId] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const fetchPassword = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/fetchPassword", {
        method: "GET"
      })
      const data = await response.json()

      if (response.ok) {
        setPasswords(data.data || [])
      }
    } catch (error) {
      console.error("Fetch error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePassword = async (id: string) => {
    if (!confirm("Are you sure you want to delete this password?")) return
    
    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: id })
      })
      
      if (response.ok) {
        fetchPassword() // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const handleCopyPassword = (id: string, password: string) => {
    navigator.clipboard.writeText(password)
    setCopiedPasswordId(id)
    setTimeout(() => setCopiedPasswordId(""), 2000)
  }

  const cookieConfirmation = async () => {
    const response = await fetch("/api/cookieconfirmation", {
      method: "GET"
    })
    if (!response.ok) {
      router.push("/login")
    }
  }

  useEffect(() => {
    fetchPassword()
    cookieConfirmation()
  }, [])

  return (
    <div className='min-h-screen p-4 bg-gray-50'>
      <div className='max-w-4xl mx-auto'>
        <div className='rounded-lg shadow-md bg-white overflow-hidden'>
          <div className='p-4 bg-gray-800 text-white'>
            <h1 className='text-xl font-semibold'>Password Overview</h1>
          </div>
          
          {isLoading ? (
            <div className='p-8 text-center'>Loading passwords...</div>
          ) : passwords.length > 0 ? (
            <div className='divide-y'>
              {passwords.map((item) => (
                <div key={item._id} className='p-4 hover:bg-gray-50 transition-colors'>
                  <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    {/* Platform and Email */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium truncate'>{item.plateform}</span>
                        <span className='text-gray-400'>......</span>
                      </div>
                      {item.email && (
                        <div className='text-sm text-gray-600 mt-1'>
                          <div>Email {item.email.split('@')[0]}</div>
                          <div className='text-xs'>({item.email})</div>
                        </div>
                      )}
                    </div>

                    {/* Password and Actions */}
                    <div className='flex items-center gap-3'>
                      <div className='flex items-center bg-gray-100 rounded px-3 py-1'>
                        <input
                          type={visiblePasswordId === item._id ? "text" : "password"}
                          value={item.password}
                          readOnly
                          className='bg-transparent outline-none  font-mono w-fit'
                        />
                        <button 
                          onClick={() => setVisiblePasswordId(visiblePasswordId === item._id ? "" : item._id)}
                          className='ml-2 text-gray-500 hover:text-gray-700'
                        >
                          {visiblePasswordId === item._id ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      <div className='flex gap-2'>
                        <button
                          onClick={() => handleCopyPassword(item._id, item.password)}
                          className='p-1 text-gray-500 hover:text-gray-700'
                          title="Copy password"
                        >
                          {copiedPasswordId === item._id ? <CopyCheckIcon size={18} /> : <Copy size={18} />}
                        </button>
                        <Link
                          href={`/edit/${item._id}`}
                          className='p-1 text-blue-500 hover:text-blue-700'
                          title="Edit password"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeletePassword(item._id)}
                          className='p-1 text-red-500 hover:text-red-700'
                          title="Delete password"
                        >
                          <Delete size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='p-8 text-center text-gray-500'>
              No passwords found. <Link href="/add" className='text-blue-500 hover:underline'>Add a password</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page