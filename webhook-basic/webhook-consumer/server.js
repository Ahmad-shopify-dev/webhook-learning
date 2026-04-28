// THIS IS THE CONSUMER SERVER
// THIS WILL REGISTER THE WEBHOOK TO THE PRODUCER SERVER
// PRODUCER SERVER WILL SEND THE WEBHOOK DATA TO THIS WHEN AN EVENT IS FIRED REGISTERED BY THE CONSUMER SERVER IN PRODUCER SERVER

// ENV CONFIGURATION OF PATH
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


// CREATE EXPRESS APP
const app = express();

// IMPORTANT CONFIGURATIONS
app.use(cors({
    origin: process.env.PRODUCER_URL,
    methods: ["POST", "GET"]
}));
app.use(bodyParser.json());


// GETTING WEBHOOK DATA RECEIVED FROM PRODUCER
app.post("/api/webhook", async(req, res) => {
    const webhookToken = req.headers["x-webhook-token"];
    if(!webhookToken || webhookToken !== process.env.WEBHOOK_SECRET) {
        return res.status(401).json({
            success: false,
            message: "User not authorized",
            data: null
        }) 
    }
    const { name, email, designation } = req.body;

    // HERE YOU CAN DO ANY PROCESS TO DO WITH DATA
    console.log("Producer get data: ", name, email);
    res.status(200).json({
        success: true,
        message: "Data recieved from producer",
        data: {
            name,
            email,
            designation
        }
    })
})


app.get("/api/home", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Consumer server is running",
        data: null
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Consumer server: http://localhost:${PORT}`);
})

