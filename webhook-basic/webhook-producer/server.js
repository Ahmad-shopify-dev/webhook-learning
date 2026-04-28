// THIS IS THE PRODUCER SERVER
// THIS WILL GET THE WEBHOOK REGISTRATION FROM THE CONSUMER SERVER
// THIS WILL STORE THE WEBHOOK REGISTRATION IN THE DATABASE
// THIS WILL SEND DATA WHEN THE ENENT IS FIRED REGISTERED BY THE CONSUMER SERVER

// ENV PATH CONFIGURATION
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// CREATE EXPRESS APP
const app = express();

// BASIC CONFIGURATIONS
app.use(cors({
    origin: process.env.CONSUMER_URL,
    methods: ["POST", "GET"]
}));
app.use(bodyParser.json());

// FAKE DB TO STORE DATA
// IN PORDUCTION YOU CAN STORE THIS TO ANY DB LIKE MONGODB, SQL OR ANY OTHER
const database = [];

// REGISTER WEBHOOK ENDPOINT
// DATA TO REGISTER
// {
//     "token": "your_secret_token",
//     "path": "http://example.com:3000/api/webhook",
//     "eventtype": "user-register"
// }
app.post("/api/webhook-register", async(req, res) => {
    const {token, path, eventtype} = req.body;
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Token retuqired to register and event"
        })
    } 
    const webhook = {
        id: Date.now().toString(),
        token,
        path,
        eventtype
    }
    database.push(webhook);
    console.log("Producer -> webhook saved: ", webhook.path);
    return res.status(200).json({
        success: true,
        message: "Webhook registered",
        data: {
            path: webhook.path,
            event: webhook.eventtype
        } 
    });
});


// SENDING DATA TO WEBHOOK FOR CONSUMER WHEN EVENT IS FIRED
// WHEN NEW USER REGISTER WE WILL SEND DATA TO CONSUMER
// DATA TO REGISTER
// {
//     "name": "smith",
//     "email": "smith@gmail.com",
//     "designation": "some role"
// }
app.post("/api/user-register", async(req, res) => {
    const { name, email, designation } = req.body;

    // DO SOME DATABASE OPERATIONS TO STORE YOUR USER

    // CREATING PAYLOAD TO SEND TO THE WEBHOOK
    const userpayload = {
        id: Date.now().toString(),
        name,
        email,
        designation 
    }
    // FIND WEBHOOKS FOR THIS EVENT
    const webhooks = database.filter(webhook => webhook.eventtype === 'user-register');
    // LET THE SERVER HANDLE THE REST
    simulateWebhookToSend(webhooks, userpayload).then(response => {
        console.log("WEBHOOK SENT.")
    });

    // YOU NEED TO ALLOW USER TO FINISH HIS/HER WORK  
    res.status(200).json({
        success: true,
        message: "Registered successfully.",
        data: {
            name,
            email,
            designation
        }
    })
});

// FUNCTION TO HANDLE WEBHOOK DATA OPERATIONS
async function simulateWebhookToSend(webhooks, payload) {
    // HERE YOU CAN PROPERLY CONTROL THE ERROR AND ADD SOME OTHER FUNTIOANLITIES AS WELL
    for(const webhook of webhooks) {
        await fetch(webhook.path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-webhook-token': `${process.env.WEBHOOK_SECRET}`
            },
            body: JSON.stringify(payload)
        })
    }
}


// BASIC PATH
app.get("/api/home", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Producer server is running",
        data: null
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Producer server: http://localhost:${PORT}`);
})

