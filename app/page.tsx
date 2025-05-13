
import PasswordOverVier from '@/components/passwordOverVier'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const k = async () => {

  const user = await currentUser()

  const username = user?.username || null

  if (!username) {
    redirect("https://clever-dolphin-8.accounts.dev/sign-in?redirect_url=https://securopass.vercel.app/")

  }



  return (
    <div className='flex flex-col justify-center items-center p-4 gap-4'>
      <PasswordOverVier username={username} />
    </div>
  )
}

export default k
