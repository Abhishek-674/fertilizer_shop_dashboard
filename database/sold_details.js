const mongoose=require("mongoose");
const productschema= new mongoose.Schema({
    customer:String,
    father_name:String,
    address:String,
    product:String,
    cus_quantity:Number,
    amount:Number,
    date:String

})

module.exports=mongoose.model("sold_details",productschema);