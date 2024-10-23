import mongoose from "mongoose";

const HomePartnerSchema = new mongoose.Schema({
    name :{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true,minLength:8},
    verfied : {type:Boolean,required:false,default:false},
    home_id : {type:String, required:true}
});

export const HomePartnerModel = mongoose.model("HomePartners", HomePartnerSchema);