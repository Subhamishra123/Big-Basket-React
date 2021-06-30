const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Product=require('../models/Product');
router.get('/products',async (request,response)=>{
    try
    {
        let products=await Product.find();
        response.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            error:error.message
        })
    }
});
router.get('/product/:id',async (request,response)=>{
    let prodId=request.params.id;
    try {
        let product=await Product.findById(prodId);
        if(!product)
        {
            return response.status(500).json({
                message:"Product Doesn't Exists"
            })
        }
        response.status(200).json(product);
    }
    catch (error) {
      //  console.error(error);
        response.status(500).json({
            error:error.message
        })
    }
});
router.post('/product',async (request,response)=>{
    let newUser={
      name:request.body.name,
      image:request.body.image,
      price:request.body.price,
      qty:request.body.qty,
      info:request.body.info
    };
    try {
        let product=await Product.findOne({name:newUser.name});
        if(product)
        {
            return response.status(400).json({
                message:"Product Already Exists"
            })
        }
        product=new Product(newUser);
        product=await product.save();
        response.status(200).json({
            message:"Product Creation Success",
            product:product
        })
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            error:error.message
        })
    }
});
router.put('/product/:id',async (request,response)=>{
    let prodId=request.params.id;
    let updatedProduct={
        id:prodId,
        name:request.body.name,
        image:request.body.image,
        price:request.body.price,
        qty:request.body.qty,
        info:request.body.info
    };
    try {
        let product=await Product.findById(prodId);
        if(!product){
            return response.status(500).json({
                message:"Product Doesn't Exists"
            })
        }
        product=await Product.findByIdAndUpdate(prodId,{$set:updatedProduct},{new:true});
        //product=await Product.findOneAndUpdate(prodId,{$set:updatedProduct},{new:true});
        response.status(200).json({
            message:"Product Update Success",
            product:updatedProduct
        })
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            error:error.message
        })
    }
});
router.delete('/product/:id',async (request,response)=>{
    let prodId=request.params.id;
    try
    {
        let product=await Product.findById(prodId);
        if(!product)
        {
            return response.status(500).json({
                message:"Product Doesn't Exists"
            })
        }
        await Product.findOneAndDelete({_id:prodId},(err, res) => {
            if(err) throw err;
            else{
                console.log(`Deleted User : ${res}`);
            }
        });
        response.status(200).json({
            message:'Product Deleted Succesfully',
            id:prodId
        })
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            error:error.message
        })
    }
});
module.exports=router;
