import React from 'react'
import { Link } from 'react-router-dom'
function ForgotPassword() {
  return (
    <>
      <div className='bg-white shadow-xl max-w-md mx-auto py-3 px-5 rounded-sm'>
        <h1 className='text-sky-800 font-bold text-3xl uppercase text text-center'>Forgot Password</h1>
        <form action="" className=''>
          <div className='my-3'>
            <label htmlFor="email" className={`uppercase text-gray-600 font-bold after:content-['*'] after:text-gray-400 after:ml-1`}>Email</label>
            <input type="text" className='w-full  p-2 border rounded-xl bg-gray-50' id='email' />
          </div>
          <input type="submit" value='Continue' className='bg-sky-700 w-full py-3 text-white font-bold uppercase rounded-md cursor-pointer hover:bg-sky-800 mb-5' />
        </form>
        <div className='lg:flex lg:justify-between space-y-1 md:space-y-0 mb-3'>
          <Link to={'/'} className='block text-center uppercase text-sm text-gray-400 hover:text-gray-600'>Login.</Link>
          <Link to={'/register'} className='block text-center uppercase text-sm text-gray-400 hover:text-gray-600'>Create an account.</Link>
        </div>
        <p className='text-xs uppercase text-center text-gray-400'><span className='font-bold'>Instructions: </span>An email will be sent to reset the password.
        </p>
      </div>
    </>
  )
}

export default ForgotPassword