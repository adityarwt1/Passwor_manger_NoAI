import Add from '@/components/add'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  const authUser = await auth()
  const user = await currentUser()
  const username = user?.username || null
  const userId = authUser?.userId || null


  if (!username) {
    redirect("/signin")
  }


  return (
    <div>
      <Add userId={userId} username={username} />
    </div>
  )
}

export default page
