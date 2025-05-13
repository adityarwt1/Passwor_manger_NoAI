
import PasswordOverVier from '@/components/passwordOverVier'
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const k = async () => {

  const user = await currentUser()

  const username = user?.username || null

  if (!username) {
    redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string)

  }



  return (
    <div className='flex flex-col justify-center items-center p-4 gap-4'>
      <PasswordOverVier username={username} />
    </div>
  )
}

export default k
