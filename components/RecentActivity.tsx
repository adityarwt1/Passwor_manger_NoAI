import React from 'react'

const RecentActivity = () => {
    return (
        <div className='rounded-lg shadow-lg  w-sm py-5 hover:scale-95 duration-300 mt-2 border border-gray-300 ml-10 px-5 '>
            <div className='text-center'>
                Recent Activity
            </div>
            <div className='m-2'>
                <div className=' text-[10px] rounded-md bg-yellow-200 w-fit px-2 py-1  mt-2'>Modified</div>
                <div className='flex justify-around mt-1 border-t border-b py-2 hover:scale-105 items-center justify-items-center hover:bg-zinc-950 duration-300 hover:text-white'>
                    <div className='flex justify-start w-full'>
                        <div className='mx-4'>gta</div>
                    </div>
                    <div className='flex justify-around w-full'>
                        < div className='flex'>
                            <div> ............</div>
                            <div className='mx-2'>see</div>
                        </div>
                        <div>:</div>
                    </div>
                </div>
            </div>
            <div>
                <div className=' text-[10px] rounded-md bg-green-200 w-fit px-2 py-1 '>Updated</div>
                <div className='flex justify-around mt-1 border-t border-b py-2 hover:scale-105 items-center justify-items-center hover:bg-zinc-950 duration-300 hover:text-white'>
                    <div className='flex justify-start w-full'>
                        <div className='mx-4'>valorant</div>
                    </div>
                    <div className='flex justify-around w-full'>
                        < div className='flex'>
                            <div> ............</div>
                            <div className='mx-2'>see</div>
                        </div>
                        <div>:</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentActivity
