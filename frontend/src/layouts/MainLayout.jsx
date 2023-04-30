import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
function MainLayout() {
  const { auth, loading } = useAuth()
  if (loading) return 'Loading...'
  return (
    <>
      {auth._id ? (
        <div className='bg-gray-100'>
          <Header />
          <div className='md:flex md:min-h-screen'>
            <Sidebar />
            <main className='bg-white flex-1 py-3 px-5'>
              <Outlet />
            </main>
          </div>
        </div>
      ) : <Navigate to={'/'} />}
    </>
  )
}

export default MainLayout
