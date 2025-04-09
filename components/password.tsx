import React from 'react'

const Password = (platform: string,password:string) => {
  return (
    <div className='flex justify-around mt-1 border-t border-b py-2 items-center justify-items-center'>
    <div className='flex justify-start w-full'>
        <div className=''>{platform}</div>
    </div>
    <div className='flex justify-around w-full'>
        < div className='flex'>
            <div> {password}</div>
            <div className='mx-2'>see</div>
        </div>
        <div>:</div>
    </div>
</div>
  )
}

export default Password
