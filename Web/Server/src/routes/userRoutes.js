import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { HomePartnerModel } from "../models/HomieRouter.js";

const router = express.Router();

router.get('/admin', verifyToken, authorizeRoles("owner"), async (req, res) => {

    const userName = await HomePartnerModel.find({ home_id: req.homepartner.home_id })

    res.json({ message: "welcome admin", id: req.homepartner.id, userName })
});

router.get('/partner', verifyToken, authorizeRoles("owner", "partner"), (req, res) => {
    res.json({id: req.homepartner.id})
});


router.get('/homeid', verifyToken, authorizeRoles("owner", "partner"), (req, res) => {
    res.json({ home_id: req.homepartner.home_id, user_id : req.homepartner.id  })
});

router.get('/userid', verifyToken, authorizeRoles("owner", "partner"), (req, res) => {
    res.json({ id: req.homepartner.id })
});

export { router as userRouter };