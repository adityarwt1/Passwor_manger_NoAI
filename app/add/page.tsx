import Add from '@/components/add'
import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {

    const {userId} = auth()
    const {username} =await  currentUser()
  return (
    <div>
      <Add userId={userId} username={username}/>
    </div>
  )
}

export default page
