import express from "express";

import { HomeRelayModel } from "../models/HomeRelayRouter.js";

const router = express.Router();


router.post("/add_relay", async (req, res) => {
    const {
     ownerUsername,  relayStatus, relayDevices
    } = req.body;

    const RelayModule = await HomeRelayModel.findOne({ ownerUsername });

    if (RelayModule) {
        return res.json({ status: 400, message: "Relay already exists" });
    }

    const newRelayModule = new HomeRelayModel({
        ownerUsername, relayStatus, relayDevices
    });

    await newRelayModule.save()
        .then(() => res.json({ status: 201, message: 'client added', id:newRelayModule._id}))
        .catch(err => res.json(err));
});

// router.post("/add_relayDevice", async (req, res) => {
//     const {
//         relayDevices
//     } = req.body;

//     const RelayDeviceModule = await HomeRelayModel.findOne({ relayDevices });
//     if (RelayDeviceModule) {
//         return res.json({ status: 400, message: "Relay already exists" });
//     }

//     const newRelayDeviceModule = new HomeRelayModel({
//         relayDevices
//     });

//     await newRelayDeviceModule.save()
//         .then(() => res.json({ status: 201, message: 'client added' }))
//         .catch(err => res.json(err));
// });

router.get("/relayStatus/:home_id", async (req,res)=>{
    try {
        const relay = await HomeRelayModel.find({_id: req.params.home_id});
        res.json(relay[0])
    } catch (error) {
        res.json(error);
    
    }
})

router.patch("/updateRelay/:home_id", async (req, res) => {
    // const { relayStatus } = req.body;
    try {
        const relayModule = await HomeRelayModel.findOneAndUpdate({_id: req.params.home_id}, req.body
        );
        res.json({ status: 202, message: "Updated Relay Successfully", module: relayModule })
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
});

router.patch("/updateDeviceNames/:home_id",async (req,res)=>{
    try {
        const relayModule = await HomeRelayModel.findOneAndUpdate({_id: req.params.home_id}, req.body
        );
        res.json({ status: 202, message: "Updated Relay Successfully", module: relayModule })
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
})

export { router as relay }