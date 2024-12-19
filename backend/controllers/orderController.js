import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const deliveryCharge = 10;
const currency = 'USD';

// Placing orders using COD Method
export const placeOrder = async (req, res) => {
   try {
    const {userId, items, amount, address} = req.body;

    const orderData = {
        userId,
        items,
        amount: Number(amount),
        address,
        paymentMethod: 'COD',
        payment: false,
        date: Date.now(),
    }

    const newOrder = orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId,{cartData:{}});

    return res.json({success:true, message:"Order Placed"});
   } catch (error) {
    console.log(error.message);
    return res.json({success:false, message:error.message});
   }
}

// Placing orders using Stripe Method
export const placeOrderStripe = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const {origin} = req.headers;
    
        const orderData = {
            userId,
            items,
            amount: Number(amount),
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now(),
        }
    
        const newOrder = orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity,
        }))

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:"Shipping Charges",
                },
                unit_amount:deliveryCharge*100
            },
            quantity:1, 
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({success:true, session_url:session.url});

       } catch (error) {
        console.log(error.message);
        return res.json({success:false, message:error.message});
       }
}

export const verifyStripe = async (req, res) => {
    try {
        const {userId, orderId, success} = req.body;
        if(success){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            return res.json({success:true, message:"Payment Successful"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            return res.json({success:false});
        }
    } catch (error) {
        console.log(error.message);
        return res.json({success:false, message:error.message});
    }
}

// Placing orders using Razorpay Method
export const placeOrderRazorpay = async (req, res) => {

}

// All orders data for admin panel
export const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        return res.json({success:true, orders});
    } catch (error) {
        console.log(error.message);
        return res.json({success:false, message:error.message});
    }
}

// User orders data for frontend
export const userOrders = async (req, res) => {
try {
    const {userId} = req.body;
    const orders = await orderModel.find({userId});
    return res.json({success:true, orders});
} catch (error) {
    console.log(error.message);
    return res.json({success:false, message:error.message});
}
}

// update order status from admin panel
export const updateStatus = async (req, res) => {
try {
    const { orderId, status} = req.body;
    await orderModel.findByIdAndUpdate(orderId, {status});
    return res.json({success:true, message:"Status Updated"});
} catch (error) {
    console.log(error.message);
    return res.json({success:false, message:error.message});
}
}


// Placing orders using Paypal Method
export const placeOrderPaypal = async (req, res) => {
  
}


