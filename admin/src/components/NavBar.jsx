import React from 'react'
import { assets } from '../assets/assets.js'

const NavBar = ({setToken}) => {
  return (
    <nav className='flex items-center px-[4%] py-2 justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="logo" />
      <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Logout</button>
    </nav>
  )
}

export default NavBar
