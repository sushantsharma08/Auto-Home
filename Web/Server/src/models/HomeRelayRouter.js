import mongoose from "mongoose";

const HomeRelaySchema = new mongoose.Schema({
    relayStatus : {type:Array,required:true},
    relayDevices : {type:Array,required:true},
    home_id : {type:String, required:true}
});

export const HomeRelayModel =mongoose.model("HomeRelay",HomeRelaySchema);