import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';

const RelatedProducts = ({category,subCategory}) => {
    const {products} = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => item.category === category);
            productsCopy = productsCopy.filter((item) => item.subCategory === subCategory);

            setRelatedProducts(productsCopy.slice(0,5));
            console.log(relatedProducts);
        }
    },[products])
    console.log(relatedProducts);
  return (
    <div className='my-24'>
        <div className="py-2 text-3xl text-center">
            <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
         {
            relatedProducts.map((p,i) => (
                <ProductItem key={i} name={p.name} id={p._id} image={p.image} price={p.price}/>
            ))
         }
      </div>
    </div>
  )
}

export default RelatedProducts
