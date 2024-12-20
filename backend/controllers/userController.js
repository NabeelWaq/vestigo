import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

// Route of user login
export const userLogin = async (req,res) => {
       try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User does'nt exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id);
            return res.json({success:true,token})
        }else{
            return res.json({success:false, message:"Invalid credentials"});
        }
       } catch (error) {
        console.log(error);
        return res.json({success:false, message:error.message});
       }
}

// Route of user register
export const userRegister = async (req,res) => {
 try {
    const {name, email, password} = req.body;

    const exist = await userModel.findOne({email});
    if(exist){
      return res.json({success:false, message:"User already exists"});
    }
  
    if(!validator.isEmail(email)){
      return res.json({success:false, message:"Please enter a valid email."});
    }
    if(password.length < 8){
      return res.json({success:false, message:"Please enter a strong password."});
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
  
    const newUser = new userModel({
      name,
      email,
      password:hashedPassword
    })
  
    const user = newUser.save();
  
    const token = createToken(user._id);
  
    return res.json({success:true,token});
 } catch (error) {
    console.log(error);
    return res.json({success:false, message:error.message});
 }

}

// Route of admin login
export const adminLogin = async (req,res) => {
       try {
        const {email, password} = req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
          const token = jwt.sign(email+password,process.env.JWT_SECRET);
          return res.json({success:true, token});
        }else{
          return res.json({success:false, message:"Invalid Credentials"});
        }
       } catch (error) {
        console.log(error);
    return res.json({success:false, message:error.message});
       }
}