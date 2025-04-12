import PasswordOverVier from '@/components/passwordOverVier'
import RecentActivity from '@/components/RecentActivity'
import SecurityInsight from '@/components/SecurityInsight'
import React from 'react'

const k = () => {
  return (
    <div className='flex justify-center-safe items-center '>
      <PasswordOverVier />
      <div>
        <RecentActivity />
        <SecurityInsight />
      </div>
    </div>
  )
}

export default k
