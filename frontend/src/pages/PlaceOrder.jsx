import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title.jsx';
import CartTotal from '../components/CartTotal.jsx';
import { assets } from '../assets/frontend_assets/assets.js';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {navigate, backend_url, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [checkout, setCheckout] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    city:'',
    street:'',
    state:'',
    zipcode: '',
    country: '',
    phone: '',
  })
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({...data,[name]:value})); 
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        items:orderItems,
        amount:getCartAmount(),
        address:formData
      }

      switch(method){
        // API Calls For COD
        case 'cod':
          const response = await axios.post(backend_url + '/api/order/place',orderData,{headers:{token}});
          if(response.data.success){
            setCartItems({});
            navigate('/orders')
            toast.success(response.data.message);
          }else{
            toast.error(response.data.message);
          }
          console.log(response.data);
          break;

          case 'stripe':
          const responseStripe = await axios.post(backend_url + '/api/order/stripe', orderData, {headers: {token}});
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data;
            window.location.replace(session_url);
          }else{
            toast.error(responseStripe.data.message);
          }
          break;

          default:
            break;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* -------- Left Side ---------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input required name='firstName' value={formData.firstName} onChange={onChangeHandler} type="text" placeholder='First Name' className='w-full px-3.5 py-1.5 border-gray-300 border' />
          <input required name='lastName' value={formData.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name' className='w-full px-3.5 py-1.5 border-gray-300 border' />
        </div>
        <input required name='email' value={formData.email} onChange={onChangeHandler} type="email" placeholder='Email Address' className='w-full px-3.5 py-1.5 border-gray-300 border' />
        <input required name='street' value={formData.street} onChange={onChangeHandler} type="text" placeholder='Street' className='w-full px-3.5 py-1.5 border-gray-300 border' />
        <div className="flex gap-3">
          <input required name='city' value={formData.city} onChange={onChangeHandler} type="text" placeholder='City' className='w-full px-3.5 py-1.5 border-gray-300 border' />
          <input required name='state' value={formData.state} onChange={onChangeHandler} type="text" placeholder='State' className='w-full px-3.5 py-1.5 border-gray-300 border' />
        </div>
        <div className="flex gap-3">
          <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler} type="number" placeholder='Zip Code' className='w-full px-3.5 py-1.5 border-gray-300 border' />
          <input required name='country' value={formData.country} onChange={onChangeHandler} type="text" placeholder='Country' className='w-full px-3.5 py-1.5 border-gray-300 border' />
        </div>
        <input required name='phone' value={formData.phone} onChange={onChangeHandler} type="number" placeholder='Phone' className='w-full px-3.5 py-1.5 border-gray-300 border' />
      </div>

      {/* --------- Right Side ------------ */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p onClick={() => setMethod('stripe')} className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.stripe_logo} alt="stripe" className='h-5 mx-4' />
            </div>
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p onClick={() => setMethod('razorpay')} className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="razorpay" className='h-5 mx-4' />
            </div>
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p onClick={() => setMethod('cod')} className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className="font-medium text-sm mx-4 text-gray-500">CASH ON DELIVERY</p>
            </div>
             
          </div>
          <div className="text-end mt-8 w-full">
            <button onClick={() => setCheckout(true)} type='submit' className='px-16 py-3 bg-black text-white text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder