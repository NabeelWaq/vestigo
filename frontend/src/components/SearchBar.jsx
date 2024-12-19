import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { assets } from '../assets/frontend_assets/assets.js';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {showSearch, setShowSearch, search, setSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(()=>{
    if(location.pathname.includes('collection')){
        setVisible(true);
    }else{
        setVisible(false);
    }
},[location])

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className="inline-flex items-center justify-center w-3/2 sm:w-1/2 border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full">
      <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
      <img src={assets.search_icon} alt="icon" className='w-3 cursor-pointer' />
      </div>
      <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} alt="icon" className='w-3 inline cursor-pointer' />
    </div>
  ) : null
}

export default SearchBar
