import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

const Header = () => {
  const { logout } = useAuth()
  const router = useRouter()
  
  const handleLogout=()=>{
    console.log("logout")
    logout();
    router.push('/')
    
  }
  return (
    <div className='sticky top-0 w-full border-b-4 border-indigo-400 left-0 flex justify-between p-4'>
      <h2 className='text-3xl'>Todo List</h2>
      <button onClick={handleLogout} className="duration-300 hover:opacity-40 cursor:pointer">Logout</button>
    </div>
  )
}

export default Header