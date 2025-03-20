const express = require("express");
const mongoose = require('mongoose');

const userRouter = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {User, Account} = require('../db');
const JWT_SECRET = require('../config');
const {authmware} = require('../middleware');

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

userRouter.post("/signup", async(req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })  
    }

    const existinguser = await User.findOne({
        username: req.body.username
    });

    if(existinguser){
        return res.status(411).json({
            message:"Email exists"
        })
    }

    const dbUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    // Creating account with initial balance
    const account = await Account.create({
        userId: dbUser._id,
        balance: 1 + Math.random()*10000
    })

    // Generate token with full user object for debugging
    const token = jwt.sign({
        userId: dbUser._id.toString() // Convert ObjectId to string
    }, JWT_SECRET);

    console.log("User created:", dbUser);
    console.log("Token payload:", { userId: dbUser._id.toString() });
    console.log("Generated token:", token);

    res.json({
        message: "User created successfully",
        token: token,
        balance: account.balance
    })
})

const signinbody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

userRouter.post("/signin", async (req,res)=>{
    const {success} = signinbody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "email already taken/incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id.toString()  // Convert to string here too
        }, JWT_SECRET);

        console.log("Signin - User:", user);
        console.log("Signin - Token payload:", { userId: user._id.toString() });
        
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updatebody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

userRouter.put("/", authmware, async(req,res)=>{
    const {success} = updatebody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

userRouter.get("/get", async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex": filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user: users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})

module.exports = userRouter;