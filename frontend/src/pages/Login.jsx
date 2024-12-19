import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const {token, setToken, navigate, backend_url} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
       e.preventDefault();
      try {
        if(currentState === 'Sign Up') {
           const response = await axios.post(backend_url + '/api/user/register',{name,email,password});
           if(response.data.success){
             setToken(response.data.token);
             localStorage.setItem('token', response.data.token);
             toast.success("User Registered Successfully");
            //  navigate('/dashboard');
           }else{
             toast.error(response.data.message);
           }
        }else{
          const response = await axios.post(backend_url + '/api/user/login',{email,password});
          if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            toast.success("User logged in successfully");
           //  navigate('/dashboard');
          }else{
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
  }
  
  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[token]);

  return (
    <form onSubmit={submitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? '' : <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="px-3 py-2 w-full border border-gray-800" placeholder='Name' required />}
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="px-3 py-2 w-full border border-gray-800" placeholder='Email' required />
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="px-3 py-2 w-full border border-gray-800" placeholder='Password' required />
      <div className="flex justify-between items-center mt-[-8px] text-sm w-full">
        <p className='cursor-pointer'>Forgot Your Password?</p>
        {
          currentState === "Login" ?
          <p className='cursor-pointer' onClick={() => setCurrentState("Sign Up")}>Create Your Account.</p> :
          <p onClick={() => setCurrentState("Login")} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white px-8 py-2 mt-4 font-light'>{currentState === "Login" ? "Sign In" : "Sign Up"}</button>
    </form>
  )
}

export default Login