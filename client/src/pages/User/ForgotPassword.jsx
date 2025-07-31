import React from 'react'

const ForgotPassword = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-black overflow-x-hidden'>
      <form action="" className='min-w-[340px]'>
        <div className='border border-green-600 p-8 rounded-2xl space-y-3'>
            <p className='text-center text-2xl font-bold text-green-600'>Forgot Password</p>
            <div>
                <p className='text-green-600 font-normal'>Email</p>
                <input className='w-full border border-green-600 p-2 outline-none rounded  text-sm font-light text-green-600' type="email" placeholder='Email' />
            </div>
            <button type='submit' className='text-white bg-green-600 p-1 w-full rounded mt-2 cursor-pointer'>Submit</button>
            <p className='text-white font-light'>Remember password ? <a href="/login" className='text-green-600 font-medium'>Login</a></p>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
