const e = require('express');
const express=require('express');
const z= require('zod');

const app=express();

const arraySchema=z.array(z.string());
const obj=z.object({
    name:z.string(),
    age:z.number(),
    gender:z.literal("male").or(z.literal("femle"))

});

// Middleware to parse the request body
app.use(express.json());

app.post('/api/employees',(req,res)=>{
    console.log(req.body);
    res.send('Employee added successfully');
});

app.post('/api/employees/:id',(req,res,next)=>{
    const {email}=req.body;
    //withod Zod
    // if(!email){
    //     next({
    //         message:'Email is required',
    //         status:400
    //     });
    // }
    // with Zod

    // const schema=z.object({
    //     email:z.string().email()
    // });


    try{
        obj.parse(req.body);
        res.send('Employee updated successfully');
    }catch(err){
        next({
            message:err.message,
            status:400
        });
    }
        
});





// Middleware to handle errors

app.use((err,req,res,next)=>{
    res.status(err.status||500).send(err.message);
});

app.listen(3001,()=>{
    console.log('Server started on port 3001');
});