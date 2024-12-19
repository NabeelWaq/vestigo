import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext.jsx';
import { assets } from '../assets/frontend_assets/assets.js';
import Title from '../components/Title.jsx';
import ProductItem from '../components/ProductItem.jsx'

const Collection = () => {
  const {products, showSearch, search} = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  
  const toggleCategories = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }else{
      setCategory(prev => [...prev,e.target.value]);
    }
  }
  const toggleSubCategories = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }else{
      setSubCategory(prev => [...prev,e.target.value]);
    }
  }
  const applyFilters = () => {
    let productsCopy = products.slice();

    if(search && showSearch){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilteredProducts(productsCopy);
  }
const sortProducts = () => {
  const fpCopy = filteredProducts.slice();

  switch(sortType){
    case 'low-high':
      setFilteredProducts(fpCopy.sort((a,b) => a.price - b.price));
      break;
      case 'high-low':
        setFilteredProducts(fpCopy.sort((a,b)=>b.price - a.price));
        break;
        default:
          applyFilters();
          break;
  }
}

  useEffect(()=>{
     applyFilters();   
  },[category,subCategory,showSearch,search,products])

  useEffect(()=>{
     sortProducts();   
  },[sortType])
  
  return (
    <div className='flex flex-col sm:flex-row sm:gap-10 gap-1 pt-10 border-t'>
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilters(!showFilters)} className="text-xl my-2 flex items-center gap-2 cursor-pointer">FILTERS
          <img src={assets.dropdown_icon} alt="icon" className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`} />
        </p>
        {/* Category Filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className="text-sm font-medium mb-3">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Men'} onChange={toggleCategories}/>Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Women'} onChange={toggleCategories}/>Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Kids'} onChange={toggleCategories}/>Kids
            </p>
          </div>
        </div>
                {/* SubCategory Filters */}
                <div className={`border border-gray-300 pl-5 py-3 my-6 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className="text-sm font-medium mb-3">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Topwear'} onChange={toggleSubCategories}/>Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Bottomwear'} onChange={toggleSubCategories}/>Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Winterwear'} onChange={toggleSubCategories}/>Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
      <div className="flex justify-between text-base sm:text-2xl mb-4">
        <Title text1={'ALL'} text2={'COLLECTIONS'}/>
        {/* Products Sorter */}
        <select onChange={(e) => setSortType(e.target.value)} className='px-2 border-2 border-gray-300 text-sm'>
          <option value="relevent">Sort By: Relevent</option>
          <option value="high-low">Sort By: High To Low</option>
          <option value="low-high">Sort By: Low To High</option>
        </select>
      </div>

      {/* Mapping Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {
         filteredProducts.map((p,id) => (
          <ProductItem id={p._id} key={id} name={p.name} image={p.image} price={p.price}/>
         ))
        }
      </div>
      </div>
    </div>
  )
}

export default Collection