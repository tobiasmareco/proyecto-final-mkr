import React from 'react'
import { Outlet } from 'react-router-dom'
function AuthLayout() {
  return (
    <>
      <main className='container mx-auto h-screen items-center p-5 flex justify-center'>
        <div className='md:w-2/3 w-full'>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AuthLayout