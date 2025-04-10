import React from 'react'

const page = () => {
    return (
        <div className='w-full h-screen justify-center  flex-col  flex items-center'>
            <div className=' rounded-md shadow-xl h-fit text-center  w-1/3'>
                <div className='text-center w-full text-2xl mt-5'>SignUp</div>
                <div className='w-full flex items-center justify-center mt-2'>
                    <form action="/signup" method='POST' className='w-1/2 flex flex-col'>
                        <label htmlFor="username" className='w-full  text-start'>Username</label>
                        <input type="text" required name="username" id="username" className='border rounded-sm px-2 py-1 outline-blue-300 mb-5' placeholder='create username' />
                        <label htmlFor="email" className='w-full  text-start'>E-mail</label>
                        <input type="email" required name="email" id="email" className='border rounded-sm px-2 py-1 outline-blue-300 mb-5' placeholder='enter email adress' />
                        <label htmlFor="password" className='w-full  text-start'>Password</label>
                        <input type="password" required name="password" id="password" className='border rounded-sm px-2 py-1 outline-blue-300 mb-5' placeholder='enter email adress' />
                        <input type="submit" name="submit" id="submit" className='bg-zinc-950 text-white rounded-md py-2 mb-5' />
                    </form>
                </div>
            </div>

        </div>
    )
}

export default page
