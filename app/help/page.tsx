import React from 'react'

const page = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-fit px-10 py-5 rouned-md shadow border rounded-md '>
            <div className='text-center my-2 flex flex-col text-2xl font-bold'>Help & FAQs</div>
            <form action="" className='flex flex-col w-full  items-center'>
                <label htmlFor="email" className='text-start text-xl border-b w-full my-1 border-gray-300'>E-mail</label>
                <input type="email" required name="email" id="email" className='border w-fit rounded o `utline-none px-1' placeholder='enter you email' />
                <label htmlFor="topic" className='text-start text-xl border-b w-full my-1 border-gray-300'>Topic</label>
                <textarea name="topic" required className='border px-2 py-1 outline-none     w-full' placeholder='write the topic you want to help....'></textarea>
                <button type='submit' className='p-2 bg-zinc-950 text-white mt-2 rounded-md px-5'>Submint</button>
            </form>
            </div>
        </div>
    )
}

export default page
