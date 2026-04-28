# 🔥 Practical Guide: Build Your First Webhook (Complete)

---

## Day 1-2: Setup

### Step 1: Install Node.js
```bash
# Download from: https://nodejs.org/
# Then verify
node --version
npm --version
```

### Step 2: Create Folder Structure
```bash
# In terminal/CMD:
mkdir my-first-webhook
cd my-first-webhook

# You'll have:
# my-first-webhook/
#   ├── package.json
#   ├── server.js
#   └── test.js
```

### Step 3: Initialize NPM
```bash
npm init -y

# This creates package.json
```

### Step 4: Install Express
```bash
npm install express body-parser
```

---

## Day 2-3: Create First Webhook

### Create server.js

**This is super simple:**

```javascript
// server.js
const express = require('express');
const app = express();

// Understand JSON
app.use(express.json());

// When webhook arrives
app.post('/webhook', (req, res) => {
  console.log('🎉 Data received!');
  console.log('This is:', req.body);
  
  // Send back response
  res.status(200).send('OK');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
```

### Run It

```bash
node server.js

# Output:
# ✅ Server running: http://localhost:3000
```

**Perfect! Server is running!** 🎉

---

## Day 3: Test the Webhook

### Method 1: Using Postman (Easiest)

```
1. Download Postman: https://www.postman.com/
2. Create new Request
3. Select Method: POST
4. URL: http://localhost:3000/webhook
5. Go to "Body" tab
6. Select "raw"
7. Paste this:

{
  "name": "Ahmed",
  "age": 25,
  "city": "Karachi"
}

8. Click "Send"
9. You'll see data in your terminal!
```

### Method 2: Using Terminal (Linux/Mac)

```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{"name":"Ahmed","age":25}'
```

### Method 3: Create test.js File

**Create test.js:**

```javascript
// test.js
fetch('http://localhost:3000/webhook', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Ahmed",
    age: 25,
    city: "Karachi"
  })
})
.then(response => response.json())
.then(data => console.log('Response:', data));
```

**Run it:**
```bash
node test.js
```

---

## Day 4-5: Save Data to Database

### Install MongoDB

```bash
npm install mongoose
```

**Update server.js:**

```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my-webhook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create Schema (Data structure)
const dataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
  time: {
    type: Date,
    default: Date.now
  }
});

// Create Model
const Data = mongoose.model('Data', dataSchema);

// Receive webhook
app.post('/webhook', async (req, res) => {
  try {
    // Create new data
    const newData = new Data(req.body);
    
    // Save it
    await newData.save();
    
    console.log('✅ Data saved!');
    res.status(200).send('OK');
    
  } catch (error) {
    console.log('❌ Error:', error);
    res.status(500).send('Error');
  }
});

// Start server
app.listen(3000, () => {
  console.log('✅ Server running');
});
```

---

## Day 5-6: Connect to Shopify

### Create Shopify Store

```
1. Go to: https://www.shopify.com
2. Click "Start free trial"
3. Enter your information
4. Create your store
5. Confirm email
```

### Get API Token

```
1. Log into Admin panel
2. Settings → Apps and integrations
3. Go to "Develop apps"
4. Click "Create an app"
5. Name: "My Webhook App"
6. Go to "Configuration"
7. In "Admin API access scopes" select:
   - read_orders
   - write_orders
   
8. Click "Save"
9. Click "Reveal token"
10. Save token somewhere safe (VERY IMPORTANT!)
```

### Register Shopify Webhook

**Create register-webhook.js:**

```javascript
// register-webhook.js
const STORE = 'your-store.myshopify.com';
const ACCESS_TOKEN = 'your_token_here';

async function registerWebhook() {
  const response = await fetch(
    `https://${STORE}/admin/api/2024-01/webhooks.json`,
    {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        webhook: {
          topic: 'orders/create',
          address: 'https://your-domain.com/webhook/shopify',
          format: 'json'
        }
      })
    }
  );
  
  const data = await response.json();
  console.log('Webhook created:', data);
}

registerWebhook();
```

**Run it:**
```bash
node register-webhook.js
```

---

## Day 6-7: Receive Shopify Webhook

### Add HMAC Verification

```javascript
// server.js - Update
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const WEBHOOK_SECRET = 'your_webhook_secret_from_shopify';

// Verify webhook
function verifyWebhook(req) {
  const hmacHeader = req.get('x-shopify-hmac-sha256');
  const body = req.rawBody; // raw string
  
  const hmac = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');
  
  return hmac === hmacHeader;
}

// Receive Shopify webhook
app.post('/webhook/shopify', (req, res) => {
  if (!verifyWebhook(req)) {
    console.log('❌ Webhook not valid!');
    return res.status(401).send('Unauthorized');
  }
  
  const order = req.body;
  
  console.log('✅ Order received from Shopify!');
  console.log('Order number:', order.number);
  console.log('Customer:', order.customer.first_name);
  console.log('Total:', order.total_price);
  
  // Do your work here:
  // - Send email
  // - Save to database
  // - Call another service
  
  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('✅ Server running');
});
```

---

## Day 7-8: Send Email

### Install Nodemailer

```bash
npm install nodemailer
```

### Gmail Setup

```
1. Go to: https://myaccount.google.com/apppasswords
2. Use your Gmail password
3. Create App password
4. You'll get a 16-character password
```

### Email Code

```javascript
// server.js - Add this
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password' // Use this!
  }
});

// In Shopify webhook
app.post('/webhook/shopify', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = req.body;
  
  // Send email
  const mailOptions = {
    from: 'noreply@myshop.com',
    to: order.customer.email,
    subject: `Thank you! Your order #${order.number} received`,
    html: `
      <h2>Hello ${order.customer.first_name}!</h2>
      <p>Your order has been received successfully.</p>
      
      <h3>Order Details:</h3>
      <ul>
        <li><strong>Order Number:</strong> #${order.number}</li>
        <li><strong>Total:</strong> ${order.currency} ${order.total_price}</li>
        <li><strong>Date:</strong> ${order.created_at}</li>
      </ul>
      
      <h3>You ordered:</h3>
      <ul>
        ${order.line_items.map(item => `
          <li>${item.title} - ${item.quantity} × ${item.price} ${order.currency}</li>
        `).join('')}
      </ul>
      
      <p>Thank you for your order! 🙏</p>
    `
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('❌ Email error:', error);
    } else {
      console.log('✅ Email sent!');
    }
  });
  
  res.status(200).send('OK');
});
```

---

## Day 8-9: Expose localhost to the World

### Use Ngrok

```bash
# Download: https://ngrok.com/

# Run it
ngrok http 3000

# Output:
# Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

**Now tell Shopify this URL:**
```
https://abc123.ngrok.io/webhook/shopify
```

---

## Day 9-10: Add to Theme (Optional)

### Add JavaScript to Theme

```javascript
// Add to your Shopify theme (Product page)
<script>
  // When customer adds to cart
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: [{
        id: variantId,
        quantity: 1
      }]
    })
  })
  .then(response => response.json())
  .then(data => {
    // Send to your server
    fetch('https://your-domain.com/webhook/cart-updated', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: productName,
        variant: variantName,
        quantity: quantity,
        timestamp: new Date()
      })
    });
  });
</script>
```

---

## Complete Working Example

### Full server.js

```javascript
// server.js - Complete
const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Keep raw body for verification
app.use(express.raw({ type: 'application/json' }));
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/webhooks');

// Webhook Schema
const webhookSchema = new mongoose.Schema({
  type: String,
  orderId: String,
  data: mongoose.Schema.Types.Mixed,
  receivedAt: { type: Date, default: Date.now }
});

const Webhook = mongoose.model('Webhook', webhookSchema);

// Email Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify Webhook
function verifyWebhook(request) {
  const hmacHeader = request.get('x-shopify-hmac-sha256');
  const body = request.rawBody;
  
  const hmac = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');
  
  return hmac === hmacHeader;
}

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Shopify Order Webhook
app.post('/webhook/shopify', async (req, res) => {
  console.log('📥 Webhook received');
  
  // Verify
  if (!verifyWebhook(req)) {
    console.log('❌ Verification failed');
    return res.status(401).send('Unauthorized');
  }
  
  try {
    const order = JSON.parse(req.rawBody);
    
    console.log(`✅ New order #${order.number}`);
    
    // Save to MongoDB
    await Webhook.create({
      type: 'order_created',
      orderId: order.id,
      data: order
    });
    
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.customer.email,
      subject: `Thank you! Your order #${order.number}`,
      html: `
        <h2>Hello ${order.customer.first_name}!</h2>
        <p>Total: <strong>${order.total_price}</strong></p>
      `
    });
    
    console.log('✉️ Email sent');
    
    res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running: ${PORT}`);
});
```

### .env File

```
MONGO_URI=mongodb://localhost/webhooks
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
WEBHOOK_SECRET=your_shopify_webhook_secret
PORT=3000
```

---

## Checklist - What You Learned

- [ ] Installed Node.js
- [ ] Created Express server
- [ ] Received webhooks
- [ ] Saved to MongoDB
- [ ] Connected to Shopify
- [ ] Verified HMAC
- [ ] Sent emails
- [ ] Exposed localhost with Ngrok
- [ ] Added theme code

---

## Next Steps

### Now Do This:

1. Add more Webhooks:
   - products/create
   - orders/updated
   - customers/create

2. Build Dashboard:
   - View all webhooks
   - See statistics

3. Create Mobile App:
   - React Native
   - Flutter

---

## Troubleshooting

### Problem 1: "Cannot find module 'express'"
```bash
npm install express
```

### Problem 2: "MongoDB connection refused"
```bash
# Install MongoDB
# Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas
```

### Problem 3: "HMAC verification failed"
```
✅ Using correct WEBHOOK_SECRET?
✅ Using raw body?
```

### Problem 4: "Ngrok not working"
```bash
# Open new terminal
# Update webhook URL in Shopify
```

---

## Resources

- **Node.js Docs**: https://nodejs.org/docs/
- **Express Guide**: https://expressjs.com/
- **Shopify API**: https://shopify.dev/docs/api
- **Mongoose**: https://mongoosejs.com/
- **Nodemailer**: https://nodemailer.com/

---

**Got everything? Now learn Advanced!** 🚀
