import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {products,currency, addToCart} = useContext(ShopContext);
  const {productId} = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('')
  

  const fetchProductData = async () => {
    products.map((p) => {
      if(p._id === productId) {
        setProductData(p);
        setImage(p.image[0]);
        return null;
      }
    })
  }
  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 flex-col sm:flex-row ">
        {/* Product Images */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((img, index) => (
                <img
                onClick={()=>setImage(img)}
                  key={index}
                  src={img}
                  alt={productData.title}
                  className={`w-[24%] sm:w-full flex-shrink-0 sm:mb-3 cursor-pointer`}
                />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="img" className='w-full h-auto' />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <img src={assets.star_icon} alt="icon" className='w-3' />
            <img src={assets.star_icon} alt="icon" className='w-3' />
            <img src={assets.star_icon} alt="icon" className='w-3' />
            <img src={assets.star_icon} alt="icon" className='w-3' />
            <img src={assets.star_dull_icon} alt="icon" className='w-3' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className="text-3xl mt-5 font-medium">{currency}{productData.price}</p>
          <p className="text-gray-500 mt-5 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
          <div className="flex gap-2">
            {
              productData.sizes.map((item,index) => (
                <button onClick={() => setSize(item)} key={index} className={`bg-gray-100 py-2 px-4 border ${size === item ? 'border-orange-500' : ''}`}>{item}</button>
              ))
            }
          </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className="px-8 py-3 text-white bg-black active:bg-gray-700 text-sm">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col text-gray-500 mt-5 text-sm gap-1">
            <p>100% original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description And Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 border text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis cumque ipsum suscipit deleniti provident tempore neque nam laborum illo deserunt. Voluptate, blanditiis aut nesciunt nam saepe soluta incidunt neque nostrum fugiat iste dolores optio maxime ipsam harum quia exercitationem odio nobis accusamus adipisci assumenda amet molestiae debitis quo ducimus. Autem.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, asperiores. Amet alias omnis quis fugiat eum delectus consequatur beatae molestiae cumque, ipsum quisquam quod, dolorem fugit voluptas, ipsam maiores aliquid.</p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>;
}

export default Product