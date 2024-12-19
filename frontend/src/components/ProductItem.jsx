import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext';
import {Link} from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
        <div className="owerflow-hidden">
            <img src={image[0]} alt="image" className='hover:scale-110 transition ease-in-out' />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <div className="text-sm font-medium">{currency}{price}</div>
    </Link>
  )
}

export default ProductItem
