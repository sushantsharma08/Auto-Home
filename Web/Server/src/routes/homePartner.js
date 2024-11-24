import express from "express";
import bcrypt from "bcryptjs";
// import * as dotenv from "dotenv";
import { verifyToken } from "../middlewares/authMiddleware.js";
import jwt from 'jsonwebtoken';
const { sign } = jwt

import { HomePartnerModel } from "../models/HomieRouter.js";
const router = express.Router();

// creating homePartner
router.post("/register/as_owner", async (req, res) => {
    const { name, username, email, password, phone, home_id } = req.body;

    const user = await HomePartnerModel.findOne(
        { name }
    );
    if (user) {
        return res.json({ status: 400, message: "Home Parter Already Exists!" });
    }
    // need to get hash no. from env file.
    const hashedPassword = await bcrypt.hash(password, Number(process.env.HASH));
    const newuser = new HomePartnerModel({ name, username, email, password: hashedPassword, phone, home_id, isOwner: "true", role: "owner", verified: true });
    await newuser.save();
    res.json({ status: 201, message: "user registered", id: newuser._id });
});


router.post("/register/as_partner", async (req, res) => {
    const { name, username, email, password, phone, home_id } = req.body;

    const user = await HomePartnerModel.findOne(
        { name }
    );
    if (user) {
        return res.json({ status: 400, message: "Home Parter Already Exists!" });
    }
    // need to get hash no. from env file.
    const hashedPassword = await bcrypt.hash(password, Number(process.env.HASH));
    const newuser = new HomePartnerModel({ name, username, email, password: hashedPassword, phone, home_id, role: "partner" });
    await newuser.save();
    res.json({ status: 201, message: "user registered" });
});


// login api's

// login as partner
router.post("/login/as_partner", async (req, res) => {
    const { username, password } = req.body;

    const user = await HomePartnerModel.findOne({ username });

    if (!user) {
        return res
            .status(404)
            .json({ message: "User Doesn't Exist!" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ status: 403, message: "User Password not valid!!!" })
    }

    const token = jwt.sign(
        { id: user._id, role: user.role,home_id:user.home_id },
        "secret",
        // { expiresIn: '12h' }
    );

    const decode = jwt.verify(token, "secret");

    res.json({ token,decode });
});


router.post("/login/as_owner", async (req, res) => {
    const { username, password } = req.body;

    const user = await HomePartnerModel.findOne({ username });

    if (!user) {
        return res.json({ status: 404, message: "User Doesn't Exist!" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ status: 403, message: "User Password not valid!!!" })
    }
    if (!user.isOwner) {
        return res.json({ status: 403, message: "User is not an owner!!!" })
    }
    // const token = jwt.sign({ id: user._id }, "secret");
    res.json({ message: "login success!!!" });
});

export { router as HomePartnerRouter };