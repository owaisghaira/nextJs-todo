import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

const Header = () => {
  const { logout, currentUser, setSearch, search } = useAuth()
  const router = useRouter()
  
  const handleLogout = () => {
    console.log("logout")
    logout();
    router.push('/')
  }
  return (
    <div className='bg-[#0A0A0B] h-[12vh] border-b border-[#215Bf0]'>
      <div className=' container h-full w-full mx-auto flex justify-between items-center'>
        <h2 className='text-3xl font-serif'>Todo List</h2>
        {currentUser &&
        <div className='w-5/12 flex items-center justify-between bg-white rounded-md'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search your todos' className='w-full h-[40px] px-2 text-black rounded-md outline-none' />
        <i className="fa-solid fa-magnifying-glass text-[#215Bf0] mr-4"></i>
        </div>
}
        {currentUser &&
          <button onClick={handleLogout} class="bg-[#215Bf0] text-white font-bold py-2 px-4 rounded">
            Logout
          </button>}
      </div>
    </div>
  )
}

export default Header