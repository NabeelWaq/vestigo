import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';
// function for adding product
export const addProduct = async (req,res) => {
  try {
    const {name, price, description, category, subCategory, bestSeller, sizes} = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1,image2,image3,image4].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
        images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
            return result.secure_url; 
        })
    )

    const productData = {
        name,
        price: Number(price),
        description,
        category,
        subCategory,
        bestSeller: bestSeller === 'true' ? true : false,
        sizes: JSON.parse(sizes),
        image: imagesUrl,
        date: Date.now()
    }

    const product = new productModel(productData);
    await product.save();

    return res.json({success:true, message:"Product Added Successfully"});


  } catch (error) {
    console.log(error);
    return res.json({success:false, message:error.message});
  }
}

// function for list products
export const listProducts = async (req,res) => {
try {
    const products = await productModel.find({});
    return res.json({success:true, products});
} catch (error) {
    console.log(error);
    return res.json({success:false, message:error.message});
}
}

// function for removing product
export const removeProduct = async (req,res) => {
 try {
    await productModel.findByIdAndDelete(req.body.id);
    return res.json({success:true, message:"Product Removed Successfully"});
 } catch (error) {
    console.log(error);
    return res.json({success:false, message:error.message});
 }
}

// function for single product info
export const singleProduct = async (req,res) => {
    try {
        const product = await productModel.findById(req.body.productId);
        return res.json({success:true, product});
     } catch (error) {
        console.log(error);
        return res.json({success:false, message:error.message});
     }
}