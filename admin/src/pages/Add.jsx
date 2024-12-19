import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backend_url } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const handleSubmitFormData = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      formData.append('name',name);
      formData.append('description',description)
      formData.append('price',price);
      formData.append('category',category);
      formData.append('subCategory',subCategory);
      formData.append('bestSeller',bestseller);
      formData.append('sizes',JSON.stringify(sizes));

      image1 && formData.append('image1',image1);
      image2 && formData.append('image2',image2);
      image3 && formData.append('image3',image3);
      image4 && formData.append('image4',image4);

      const response = await axios.post(backend_url + '/api/product/add',formData,{headers:{token}});
      console.log(response);
      

      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setDescription('')
        setPrice('');
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }else{
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <form onSubmit={handleSubmitFormData} className='flex flex-col items-start w-full gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2 mb-2'>
         <label htmlFor="image1">
          <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="img" />
          <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" className='hidden' />
         </label>
         <label htmlFor="image2">
          <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="img" />
          <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" className='hidden' />
         </label>
         <label htmlFor="image3">
          <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="img" />
          <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" className='hidden' />
         </label>
         <label htmlFor="image4">
          <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="img" />
          <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" className='hidden' />
         </label>
        </div>

        <div className='w-full mb-2'>
          <p className='mb-2'><label htmlFor="name">Product name</label></p>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Type here' className='w-full max-w-[500px] px-3 py-2' required />
        </div>
        <div className='w-full mb-2'>
          <p className='mb-2'><label htmlFor="name">Product description</label></p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Type content here' className='w-full max-w-[500px] px-3 py-2' required />
        </div>

    <div className='w-full flex flex-col sm:flex-row gap-2 sm:gap-8'>
      <div>
        <p className='mb-2'>Product category</p>
        <select onChange={(e) => setCategory(e.target.value)} className='px-3 py-2 w-full' required>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Sub category</p>
        <select onChange={(e) => setSubCategory(e.target.value)} className='px-3 py-2 w-full' required>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      <div>
        <p className='mb-2'><label htmlFor="price">Product price</label></p>
        <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full sm:w-[120px] px-3 py-2' type="number" id="price" placeholder='25' required />
      </div>
      </div>

      <div className='m-2'>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => setSizes((prev) => prev.includes("S") ? prev.filter(item => item !== 'S') : [...prev,'S'])}>
            <p className={`bg-slate-200 px-3 py-1 cursor-pointer ${sizes.includes("S") ? 'bg-pink-200 text-pink-800' : ''}`}>S</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("M") ? prev.filter(item => item !== 'M') : [...prev,'M'])}>
            <p className={`bg-slate-200 px-3 py-1 cursor-pointer ${sizes.includes("M") ? 'bg-pink-200 text-pink-800' : ''}`}>M</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("L") ? prev.filter(item => item !== 'L') : [...prev,'L'])}>
            <p className={`bg-slate-200 px-3 py-1 cursor-pointer ${sizes.includes("L") ? 'bg-pink-200 text-pink-800' : ''}`}>L</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("XL") ? prev.filter(item => item !== 'XL') : [...prev,'XL'])}>
            <p className={`bg-slate-200 px-3 py-1 cursor-pointer ${sizes.includes("XL") ? 'bg-pink-200 text-pink-800' : ''}`}>XL</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("XXL") ? prev.filter(item => item !== 'XXL') : [...prev,'XXL'])}>
            <p className={`bg-slate-200 px-3 py-1 cursor-pointer ${sizes.includes("XXL") ? 'bg-pink-200 text-pink-800' : ''}`}>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller(!bestseller)} value={bestseller} className='accent-pink-800' type="checkbox" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <div>
        <button className='w-28 px-3 py-2 bg-black text-white mt-4' type="submit">ADD</button>
      </div>

      </div>
    </form>
  )
}

export default Add
