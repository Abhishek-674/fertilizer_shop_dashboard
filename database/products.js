const mongoose=require("mongoose");
const productschema= new mongoose.Schema({
    name:String,
    price:String,
    company:String,
    quantity:Number
})

module.exports=mongoose.model("products",productschema);