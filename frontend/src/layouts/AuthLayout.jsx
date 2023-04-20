import React from 'react'
import { Outlet } from 'react-router-dom'
function AuthLayout() {
  return (
    <>
      <main className='container mx-auto h-screen items-center p-5 md:flex md:justify-center'>
        <div className='md:w-2/3'>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AuthLayout