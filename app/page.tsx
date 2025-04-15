import PasswordOverVier from '@/components/passwordOverVier'
import RecentActivity from '@/components/RecentActivity'
import SecurityInsight from '@/components/SecurityInsight'
import React from 'react'

const k = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center p-4 gap-4'>
      <PasswordOverVier />
      <div className='w-full md:w-auto'>
        <RecentActivity />
        <SecurityInsight />
        <SecurityInsight />

      </div>
    </div>
  )
}

export default k
