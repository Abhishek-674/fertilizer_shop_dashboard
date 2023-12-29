const express=require('express');
require('./database/connection')
const User=require("./database/user");
const products=require("./database/products")
const sold_details=require("./database/sold_details")
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());//for inserting data from register to mongodb
app.post('/sign_up',async(req,res)=>{   //post is used when we want to send data to server or databases this is called api making and we fill use this api in frontend to store data in database
    let users= new User(req.body);
    let result= await users.save();
    res.send(result);
})

app.post('/login', async(req,res)=>{
    if(req.body.password&& req.body.email)
    {
        let user= await User.findOne(req.body).select("-password");
        if(user)
        res.send(user)
        else
        res.send({result:"user not found"})

    }
    else
    {
        res.send({result:"Please enter both field correctly"})
    }
    // res.send("welcome")
   

})


app.post('/add',(req,res)=>{
    let product=new products(req.body);
    let result=product.save();
    res.send(result);

})

app.get("/product_list",async (req,res)=>{
   let product=await products.find();
   if(product.length>0)
   res.send(product)
   else
   res.send({result:"no products found"});
})


app.delete("/product_list/:id", async (req,res)=>{
   const result=await products.deleteOne({_id:req.params.id})
   res.send(result);
})

app.get("/product_list/:id",async (req,res)=>{
    let result=await products.findOne({_id:req.params.id});
    if(result)
    {
        res.send(result);
    }
    else
    {
        res.send({result:"No record found"})
    }
})

app.put("/product_list/:id",async(req,res)=>{
    let result=await products.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    res.send(result);
    
})


app.get("/search/:key",async (req,res)=>{
    
    let result=await products.find({
        "$or":[{name:{$regex:req.params.key}},
            // {price:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
            //   {quantity:{$regex:req.params.key}}

        ]
    });
    res.send(result);

})


app.post('/sell/:id',async(req,res)=>{
     let sell_details=new sold_details(req.body);
     let result= await sell_details.save();
     res.send(result);
})

app.put("/sell/:id",async(req,res)=>{
    let result=await products.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    res.send(result);
    
})


app.get("/sell_details",async (req,res)=>{
    let sell_details=await sold_details.find();
    if(sell_details.length>0)
    res.send(sell_details)
    else
    res.send({result:"no details found"});
 })

 
app.get("/search_sell/:key",async (req,res)=>{
    
    let result=await sold_details.find({
        "$or":[{product:{$regex:req.params.key}},
            {customer:{$regex:req.params.key}},
            {father_name:{$regex:req.params.key}},
              {address:{$regex:req.params.key}},
              {date:{$regex:req.params.key}}

        ]
    });
    res.send(result);

})


 
app.listen(80);