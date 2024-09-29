import express from "express";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

import { HomePartnerModel } from "../models/HomieRouter.js";
const router = express.Router();

// dotenv.config();

// creating homePartner
router.post("/register",async (req,res)=>{
    const{name,username,password}=req.body;

    const user = await HomePartnerModel.findOne({
        name
    });
    if(user){
        return res.json({status:400,message:"Home Parter Already Exists!"});
    }
    // need to get hash no. from env file.
    const hashedPassword = await bcrypt.hash(password,10);
    const newuser = new HomePartnerModel({name,username,password:hashedPassword});
    await newuser.save();
    res.json({status:201,message:"user registered"});
})



router.post("/login",async (req,res)=>{
    const {username,password}= req.body;

    const user = await HomePartnerModel.findOne({username});

    if(!user){
        return res.json({status:404, message: "User Doesn't Exist!" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({status:403, message: "User Password not valid!!!" })
    }

    // const token = jwt.sign({ id: user._id }, "secret");
    res.json({ message:"login success!!!"});
});

export {router as HomePartnerRouter};