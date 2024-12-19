import React, { useState } from 'react'
import NavBar from './components/NavBar.jsx'
import SideBar from './components/SideBar.jsx'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add.jsx';
import List from './pages/List.jsx';
import Orders from './pages/Orders.jsx';
import Login from './pages/Login.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  localStorage.setItem('token',token);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {
        token === "" ?
        <Login setToken={setToken} /> :
    <>
       <NavBar setToken={setToken}/>
       <div className="flex w-full">
        <SideBar  />
        <div className="w-[70%] mx-auto  ml-[max(5vw,25px)] my-8 text-base text-gray-600">
          <Routes>
            <Route path='/add' element={<Add token={token} />} />
            <Route path='/list' element={<List token={token} />} />
            <Route path='/orders' element={<Orders token={token} />} />
          </Routes>
        </div>
       </div>
    </>
    }
    </div>
  )
}

export default App
