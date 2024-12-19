import React, { useContext, useState } from 'react'
import {assets} from '../assets/frontend_assets/assets.js'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';
import { images } from '../assets/real_images/images.js';
const NavBar = () => {

    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        setToken('');
        localStorage.removeItem('token');
        setCartItems({});
    }

  return (
    <nav className='flex justify-between items-center font-medium'>
        <Link to={'/'}><img src={images.vestivo1} alt="logo" className='w-36' /></Link>
        <ul className='hidden items-center sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to={'/'} className={'flex flex-col gap-1 items-center'}>
            <p>HOME</p>
            <hr className='w-2/4 h-[1.6px] border-none bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to={'/collection'} className={'flex flex-col gap-1 items-center'}>
            <p>COLLECTIONS</p>
            <hr className='w-2/4 h-[1.6px] border-none bg-gray-700 hidden'/>
        </NavLink>
        <Link to={'/'}><img src={images.vestivo} alt="logo" className='w-52' /></Link>
        <NavLink to={'/about'} className={'flex flex-col gap-1 items-center'}>
            <p>ABOUT</p>
            <hr className='w-2/4 h-[1.6px] border-none bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to={'/contact'} className={'flex flex-col gap-1 items-center'}>
            <p>CONTACT</p>
            <hr className='w-2/4 h-[1.6px] border-none bg-gray-700 hidden'/>
        </NavLink>
        </ul>

        <div className="flex gap-6 items-center">
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="search" />

            <div className="group relative">
               <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer' />
              {
                token &&   <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700">
                    <p className="cursor-pointer hover:text-black">My Profile</p>
                    <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                    <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                </div>
            </div>
              }
            </div>

           <Link to={'/cart'} className='relative'>
           <img src={assets.cart_icon} className={'w-5 min-w-5'} alt="cart icon" />
           <p className='absolute right-[-5px] bottom-[-5px] leading-4 aspect-square rounded-full text-center w-4 bg-black text-white text-[8px]'>{getCartCount()}</p>
           </Link>

           <img src={assets.menu_icon} className='w-5 sm:hidden cursor-pointer' alt="menu icon" onClick={() => setVisible(true)} />

           {/* Menu For Mobile Screens */}
           <nav className={`absolute top-0 bottom-0 right-0 bg-white overflow-hidden transition-all ${visible ? "w-full" : "w-0"} `}>
           <div className="flex flex-col text-gray-600">
            <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                 <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="back icon" />
                 <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className={"py-2 pl-6 border"} to={"/"}>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className={"py-2 pl-6 border"} to={"/collection"}>COLLECTIONS</NavLink>
            <NavLink onClick={() => setVisible(false)} className={"py-2 pl-6 border"} to={"/about"}>ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} className={"py-2 pl-6 border"} to={"/contact"}>CONTACT</NavLink>
           </div>
           </nav>
        </div>
    </nav>
  )
}

export default NavBar