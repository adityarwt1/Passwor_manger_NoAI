import React from 'react'

const SecurityInsight = () => {
  return (
    <div className='rounded-lg shadow-lg  w-sm py-5 hover:scale-95 duration-300 mt-2 border border-gray-300 ml-10 px-5'>
    <div className='text-center'>Security Insight</div>
    <div className='flex items-center justify-between border-t border-b border-gray-200 py-2  hover:bg-zinc-950 duration-300 hover:text-white'>
       <div className='mx-2'>Two-Step Authentication</div>
        <div className='bg-green-200 p-2 mx-2 rounded-md text-gray-700 hover:scale-105 duration-300' >Enabled</div>
        </div>
    
      
    </div>
  )
}

export default SecurityInsight
 