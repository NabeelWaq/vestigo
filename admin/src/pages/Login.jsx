import React, { useState } from 'react';
import axios from 'axios';
import { backend_url } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmitHandler =async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backend_url + '/api/user/admin',{email,password});
            if(response.data.success){
              setToken(response.data.token);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <div className='bg-white shadow-lg rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p><label className='text-sm font-medium mb-3 text-gray-700' htmlFor="email">Email Address</label></p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full px-3 py-2 outline-none border border-gray-300 rounded-md' type='email' placeholder='your@email.com' id='email' required />
            </div>
            <div className='mb-3 min-w-72'>
                <p><label className='text-sm font-medium mb-3 text-gray-700' htmlFor="pass">Password</label></p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full px-3 py-2 outline-none border border-gray-300 rounded-md' type='password' placeholder='Enter your password' id='pass' required />
            </div>
            <div>
                <button className='w-full bg-black text-white mt-3 rounded-md py-2 px-4' type="submit">Login</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
