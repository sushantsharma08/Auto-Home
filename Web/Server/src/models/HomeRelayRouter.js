import mongoose from "mongoose";

const HomeRelaySchema = new mongoose.Schema({
    relayStatus : {type:Array,required:true},
    relayDevices : {type:Array,required:true}
});

export const HomeRelayModel =mongoose.model("HomeRelay",HomeRelaySchema);