import mongoose from "mongoose";

const HomePartnerSchema = new mongoose.Schema({
    name :{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true,minLength:8},
    phone:{type:Number,required:true},
    role: {type:String,required:true, enum:["owner","partner"]},
    verified : {type:Boolean,required:false,default:false},
    home_id : {type:String, required:true},
    isOwner : {type:Boolean,required:false,default:false},
    
},
{
    timestamps:true
}
);

export const HomePartnerModel = mongoose.model("HomePartners", HomePartnerSchema);