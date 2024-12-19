import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = () => {
  const {currency, backend_url, token} = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const fetchOrders = async () => {
    if(!token){
      return null;
    }
    try {
      const response = await axios.post(backend_url + '/api/order/userOrders',{},{headers:{token}});
      
      if(response.data.success){
        let allOrdersData = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersData.push(item);
          })
        })
        setOrderData(allOrdersData.reverse());
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchOrders();
  },[token])
  return (
    <div className='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={"YOUR"} text2={"ORDERS"}/>
      </div>
      <div>
        {
          orderData.slice(1,4).map((item , index) => (
          <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className="flex items-start gap-6 text-sm">
            <img src={item.image[0]} alt="img" className='w-16 sm:w-20' />
            <div>
              <p className="sm:text-base font-medium">{item.name}</p>
              <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                <p>{currency} {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
              <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
              <p className='mt-1'>Payment Method: <span className='text-gray-400'>{item.paymentMethod}</span></p>
            </div>
          </div>
          <div className="flex justify-between md:w-1/2">
          <div className="flex items-center gap-2">
            <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
            <div className="text-sm md:text-base">{item.status}</div>
          </div>
          <button onClick={fetchOrders} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
          </div>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders