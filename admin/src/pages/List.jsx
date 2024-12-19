import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import {backend_url, currency} from '../App';
import { assets } from '../assets/assets';

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
       try {
        const response = await axios.get(backend_url + '/api/product/list');
        if(response.data.success){
          setList(response.data.products);
        }else{
          toast.error(response.data.message);
        }
       } catch (error) {
        console.log(error.message);
        toast.error(error.message);
       }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backend_url + '/api/product/remove',{id},{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);


  console.log(list);
  

  return (
  <>
  <p className='mb-2'>All Product List</p>
  <div className='flex flex-col gap-2'>
     {/* List Table Titles */}
     <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 text-sm bg-gray-100 border'>
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b className='text-center'>Action</b>
     </div>

     {/* List Products */}
     {
      list.map((item,index) => (
        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
          <img src={item.image[0] ? item.image[0] : assets.upload_area} alt="img" className='w-12' />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{currency}{item.price}</p>
          <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
        </div>
      ))
     }
  </div>
  </>
  )
}

export default List
