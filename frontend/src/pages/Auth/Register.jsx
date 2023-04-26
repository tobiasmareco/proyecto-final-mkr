import React from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../config/axiosClient'

function Register() {
  const handleRegisterClick = async (e) => {
    e.preventDefault()
    //TODO: VALIDAR LOS CAMPOS VACIOS Y CORRECTOS.
    try {
      const { data } = await axiosClient.post(`/auth/register`, { name: 'Vanessa Gomez', email: 'vgomez@laboratorioscatedral.com.py', password: '123123' })
      console.log(data)

    } catch (error) {
      console.log(error.response.data)
    }
  }
  return (
    <>
      <div className='bg-white shadow-xl max-w-md mx-auto py-3 px-5 rounded-sm'>
        <h1 className='text-sky-800 font-bold text-3xl uppercase text text-center'>Create account</h1>
        <form action="" className=''>
          <div className='my-3'>
            <label htmlFor="name" className='uppercase text-gray-600 font-bold after:content-["*"] after:text-gray-400 after:ml-1'>Name</label>
            <input type="text" className='w-full  p-2 border rounded-xl bg-gray-50' id='name' />
          </div>
          <div className='my-3'>
            <label htmlFor="email" className='uppercase text-gray-600 font-bold after:content-["*"] after:text-gray-400 after:ml-1'>Email</label>
            <input type="text" className='w-full  p-2 border rounded-xl bg-gray-50' id='email' />
          </div>
          <div className='my-3'>
            <label htmlFor="password" className='uppercase text-gray-600 font-bold after:content-["*"] after:text-gray-400 after:ml-1'>Password</label>
            <input type="password" className='w-full  p-2 border rounded-xl bg-gray-50' id='password' />
          </div>
          <div className='my-3'>
            <label htmlFor="repeatPassword" className='uppercase text-gray-600 font-bold after:content-["*"] after:text-gray-400 after:ml-1'>Repeat Password</label>
            <input type="password" className='w-full  p-2 border rounded-xl bg-gray-50' id='repeatPassword' />
          </div>
          <input type="submit" value='Register' className='bg-sky-700 w-full py-3 text-white font-bold uppercase rounded-md cursor-pointer hover:bg-sky-800 mb-5' onClick={handleRegisterClick} />
        </form>
        <div className='lg:flex lg:justify-between space-y-1 md:space-y-0'>
          <Link to={'/forgot-password'} className='block text-center uppercase text-sm text-gray-400 hover:text-gray-600'>I Forgot my password.</Link>
          <Link to={'/'} className='block text-center uppercase text-sm text-gray-400 hover:text-gray-600'>Login.</Link>
        </div>
      </div>
    </>
  )
}

export default Register