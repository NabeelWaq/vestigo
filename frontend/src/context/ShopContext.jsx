import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets.js";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';



export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const deliveryFee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const addToCart = async (itemId,size) => {

        if(!size){
            toast.error("Please select a size");
            return;
        }

        let cartData = structuredClone(cartItems);
        
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        
        setCartItems(cartData);

        if(token){
            try {
                const response = await axios.post(backend_url + '/api/cart/add',{itemId,size},{headers:{token}});
                if(response.data.success){
                    toast.success(response.data.message);
                } else{
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                totalCount += cartItems[items][item];
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if(token){
            try {
                const response = await axios.post(backend_url + '/api/cart/update',{itemId,size,quantity},{headers:{token}});
                if(response.data.success){
                    toast.success(response.data.message);
                } else{
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]){
               try {
                if(cartItems[items][item] > 0){
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
               } catch (error) {
                
               }
            }
        }
        return totalAmount;
    }

    const getProductData = async () => {
        try {
            const response = await axios.get(backend_url + '/api/product/list');
            if(response.data.success){
                setProducts(response.data.products);
            } else{
                toast.error(response.data.message);
            }
            console.log(response.data.products);
            
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserCartData = async (token) => {
        try {
            const response = await axios.post(backend_url + '/api/cart/get',{},{headers:{token}});
            console.log("cartData",response);
            
            if(response.data.success){
                setCartItems(response.data.cartData);
            } else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getProductData();
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCartData(localStorage.getItem('token'));
        }
    },[])

    const value = {
          products, currency, deliveryFee, showSearch, setShowSearch, search, setSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backend_url, token, setToken,
          setCartItems
    }

    return (
        <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
    )
}

export default ShopContextProvider;