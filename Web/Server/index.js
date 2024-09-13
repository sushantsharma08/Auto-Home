import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";



import { HomePartnerRouter } from "./src/routes/homePartner.js";
import { relay } from "./src/routes/relay.js";

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());
// Connect to MongoDB

const PORT = process.env.PORT || 9000;

console.log(process.env);


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@relaycontrol.mtqs8.mongodb.net/?retryWrites=true&w=majority&appName=RelayControl`);

// Define routes and middleware
app.use("/auth",HomePartnerRouter);
app.use("/relay",relay);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});