import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginIn, setIsLoginIn] = useState(true)
  const route = useRouter()

  const { login, signup, currentUser } = useAuth()
  
  if (currentUser){
      route.push('Todos')
  }

  async function submitHandler() {
    if (!email || !password) {
      console.log('Please enter email and password')
      return
    }
    if (isLoginIn) {
      try {
        // console.log('login')
        await login(email, password)
      } catch (err) {
        console.log(err)
      }
      return
    }
    await signup(email, password)
  }
  return (
    <div className='flex-1 text-xs flex flex-col justify-center items-center gap-4'>
      <h1 className='text-2xl font-extrabold'> {isLoginIn ? "Login" : "Register"}</h1>
      <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Enter Email ' className='outline-none text-slate-900 duration-300 p-2 w-full  max-w-[50ch]' />
      <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Password' className='outline-none text-slate-900 p-2 w-full  max-w-[50ch]' />
      <button onClick={submitHandler} className='w-full border-white border-solid border max-w-[50ch] p-2 duration-300'>Submit</button>
      <h2 className='w-full btn border-white border-solid border max-w-[50ch] p-2 duration-300 cursor:pointer justify-center flex hover:scale-110' onClick={() => setIsLoginIn(!isLoginIn)}>{!isLoginIn ? 'LOGIN' : "Register"}</h2>
    </div>
  )
}

export default Login