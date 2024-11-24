import mongoose from "mongoose";

const HomeRelaySchema = new mongoose.Schema({
    ownerUsername:{type:String,required:true},
    relayStatus : {type:Array,required:true},
    relayDevices : {type:Array,required:true},
    owners:{type:Array,required:false},
    partners:{type:Array,required:false}
    // home_id : {type:String, required:true}
});

export const HomeRelayModel =mongoose.model("HomeRelay",HomeRelaySchema);