const mongoose = require('mongoose');
let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    info:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});
let Product=mongoose.model('products',productSchema);
module.exports=Product;
