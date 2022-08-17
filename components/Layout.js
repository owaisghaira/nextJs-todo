import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen relative bg-slate-900 text-white'>
      <Header />
      <main className='flex-1 p-4 flex-col'> 
      {children}
      </main>
    </div>
  )
}

export default Layout