import React from 'react'
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Collection from './pages/Collection.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Orders from './pages/Orders.jsx';
import Cart from './pages/Cart.jsx';
import Product from './pages/Product.jsx';
import Footer from './components/Footer.jsx';
import SearchBar from './components/SearchBar.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify.jsx';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-l-orange-200'>
      <ToastContainer />
      <NavBar />
      <SearchBar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/collection' element={<Collection/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/place-order' element={<PlaceOrder/>} />
      <Route path='/orders' element={<Orders/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/product/:productId' element={<Product/>} />
      <Route path='/verify' element={<Verify/>} />
    </Routes>
    <Footer/>
  </div>
  )
}

export default App