import express from "express";

import { HomeRelayModel } from "../models/HomeRelayRouter.js";

const router = express.Router();


router.post("/add_relay", async (req, res) => {
    const {
        relayStatus
    } = req.body;

    const RelayModule = await HomeRelayModel.findOne({ relayStatus });
    if (RelayModule) {
        return res.json({ status: 400, message: "Relay already exists" });
    }

    const newRelayModule = new HomeRelayModel({
        relayStatus
    });

    await newRelayModule.save()
        .then(() => res.json({ status: 201, message: 'client added' }))
        .catch(err => res.json(err));
});

router.post("/add_relayDevice", async (req, res) => {
    const {
        relayDevices
    } = req.body;

    const RelayDeviceModule = await HomeRelayModel.findOne({ relayDevices });
    if (RelayDeviceModule) {
        return res.json({ status: 400, message: "Relay already exists" });
    }

    const newRelayDeviceModule = new HomeRelayModel({
        relayDevices
    });

    await newRelayDeviceModule.save()
        .then(() => res.json({ status: 201, message: 'client added' }))
        .catch(err => res.json(err));
});

router.get("/relayStatus", async (req,res)=>{
    try {
        const relay = await HomeRelayModel.find({});
        res.json(relay[0])
    } catch (error) {
        res.json(error);
    
    }
})

router.patch("/updateRelay", async (req, res) => {
    // const { relayStatus } = req.body;
    try {
        const relayModule = await HomeRelayModel.findOneAndUpdate({_id: '66f652045e49e46330c4f0b9'}, req.body
        );
        res.json({ status: 202, message: "Updated Relay Successfully", module: relayModule })
    } catch (error) {
        res.json({ status: 400, message: error.message })
    }
})

export { router as relay }