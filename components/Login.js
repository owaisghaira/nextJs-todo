import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const { login, signup } = useAuth();

  async function submitHandler() {
    if (!email || !password) {
      toast.error("Please enter your data")
      return;
    }
    if (isLoggingIn) {
      try {
        await signup(email, password);
      } catch (err) {
        toast.error(err.message)
      }
    } else {
      try {
        await login(email, password);
      } catch (err) {
        toast.error(err.message)
      }
    }
  }

  return (

    <div className="signup-1 flex items-center relative">
      <div className="overlay absolute inset-0 z-0 opacity-75"></div>
      <div className="container px-4 mx-auto relative z-10">
        <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
          <div className="box bg-white p-6 md:px-12 md:pt-12 border-t-10 border-solid border-indigo-600">
            <h2 className="text-3xl text-gray-800 text-center">{isLoggingIn ? 'Create Your Account' : 'Signin to your account'}</h2>

            <div className="signup-form mt-6 md:mt-12">
              <div className="border-2 border-solid rounded flex items-center mb-4">
                <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                  <span className="far fa-envelope text-gray-500"></span>
                </div>
                <div className="flex-1">
                  <input value={email}
                    onChange={(e) => setEmail(e.target.value)} type="text" placeholder="E-mail" className="h-10 py-1 pr-3 w-full outline-none text-black" />
                </div>
              </div>

              <div className="border-2 border-solid rounded flex items-center mb-4">
                <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                  <span className="fas fa-asterisk text-gray-500"></span>
                </div>
                <div className="flex-1">
                  <input value={password}
                    onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="h-10 py-1 pr-3 w-full outline-none text-black" />
                </div>
              </div>
              <div className="text-center mt-6 md:mt-12">
                <button onClick={submitHandler}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300">{isLoggingIn ? 'Sign Up' : 'Signin'} <span className="far fa-paper-plane ml-2"></span></button>
              </div>
            </div>
            <div className="border-t border-solid mt-6 md:mt-12 pt-4">
              <p className="text-gray-500 text-center">{isLoggingIn ? "Already have an account" : "not have account"} <a href="#" onClick={() => setIsLoggingIn(!isLoggingIn)} class="text-indigo-600 hover:underline">{isLoggingIn ? "Sign In" : "Signup"}</a></p>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
{/* <div className="flex-1 text-xs sm:text-sm  flex flex-col justify-center items-center gap-2 sm:gap-4">
<h1 className="font-extrabold select-none text-2xl sm:text-2xl uppercase">
  {isLoggingIn ? "Login" : "register"}
</h1>
{error && (
  <div className="w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2">
    {error}
  </div>
)}
<input
  type="text"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email Address"
  className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
/>
<input
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  type="password"
  placeholder="Password"
  className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
/>
<button
  onClick={submitHandler}
  className="w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"
>
  <h2 className="relative z-20">SUBMIT</h2>
</button>
<h2
  className="duration-300 hover:scale-110 cursor-pointer"
  onClick={() => setIsLoggingIn(!isLoggingIn)}
>
  {!isLoggingIn ? "Login" : "Register"}
</h2>
</div> */}