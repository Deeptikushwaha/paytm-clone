const express = require('express')

const userRouter = express.Router();
const zod = require("zod");
const JWT_SECRET = require('../config');

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

userRouter.post("/signup", async(req,res)=>{
    const body = req.body;
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })  
    }

    const user = User.findOne({
        username: body.username
    })

    if(user._id){
        return res.status(411).json({
            message:"Email exists"
        })
    }

   const dbUser= await User.create(body);
   const token = jwt.sign({
    userId: dbUser._id
   },JWT_SECRET);

   res.json({
    message: "user created",
    token: token
   })
})