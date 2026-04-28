# 🚀 Complete Shopify Webhook Roadmap for JavaScript Developers
## From Zero Knowledge to Advanced Level

---

## 📊 Learning Path Overview

```
LEVEL 0: Fundamentals (2-3 days)
    ↓
LEVEL 1: JavaScript Basics (3-4 days)
    ↓
LEVEL 2: HTTP & APIs Understanding (2-3 days)
    ↓
LEVEL 3: Webhooks Concept (2-3 days)
    ↓
LEVEL 4: First Simple Webhook (3-4 days)
    ↓
LEVEL 5: Shopify Basics (4-5 days)
    ↓
LEVEL 6: Shopify Webhooks Deep Dive (5-6 days)
    ↓
LEVEL 7: Practical Shopify Webhooks (7-10 days)
    ↓
LEVEL 8: Advanced Patterns (7-10 days)
    ↓
LEVEL 9: Production Ready Setup (5-7 days)
    ↓
LEVEL 10: Building Shopify Apps (15-20 days)

Total Time: 6-8 weeks
```

---

# 🎯 LEVEL 0: Fundamentals (2-3 days)

## What You'll Learn
- What is a Server
- What is a Client
- Request and Response basics
- Understanding APIs
- JSON data format

## 📖 Learning Resources

### 1️⃣ Server-Client Concept (15 min)
```
Your Phone = Client
A computer somewhere = Server

When you search on Google:
1. Your phone = Sends a request
2. Google's server = Sends back an answer
3. You get results = This is the response
```

### 2️⃣ JSON - Simple Data Format (20 min)
```javascript
// This is JSON - a way to organize data
{
  "name": "Ahmed",
  "age": 25,
  "city": "Karachi",
  "skills": ["JavaScript", "React", "Node.js"]
}
```

**Why use JSON:**
- Easy to read
- Computers understand it easily
- Used everywhere

### 3️⃣ API Concept (25 min)
```
You want to drink tea

Without API:
You → Go outside → Shop → Make tea
Yourself → Come back home
Takes time

With API:
You → Call → Shopkeeper
Shopkeeper → Makes tea
Shopkeeper → Delivers
Easy and fast!
```

**4 Things in an API:**
```javascript
// 1. URL (where to send)
https://api.example.com/products

// 2. Method (what to do)
GET - Get information
POST - Send information
PUT - Change information
DELETE - Delete information

// 3. Data (what to send)
{
  "product_name": "Laptop",
  "price": 50000
}

// 4. Headers (extra information)
{
  "Content-Type": "application/json",
  "Authorization": "Bearer token123"
}
```

## ✅ Checklist
- [ ] Understand Server-Client concept
- [ ] Understand JSON format
- [ ] Understand what APIs are
- [ ] Can differentiate Request and Response

---

# 🎯 LEVEL 1: JavaScript Fundamentals (3-4 days)

## Essential Topics

### 1️⃣ Variables and Data Types
```javascript
// Store a name
let name = "Ahmed";
const age = 25;
var city = "Karachi";

// Different types
let text = "Text"; // String
let number = 25; // Number
let isTrue = true; // Boolean
let something = undefined; // Undefined
let empty = null; // Null
```

### 2️⃣ Objects - Organize Data
```javascript
// Information about a book
const book = {
  title: "Allama Iqbal",
  author: "Allama Iqbal",
  year: 1934,
  subjects: ["Poetry", "Philosophy"]
};

// Usage
console.log(book.title);
console.log(book["author"]);
```

### 3️⃣ Arrays - List of Data
```javascript
// List of vegetables
const vegetables = ["Onion", "Tomato", "Potato", "Cabbage"];

// Usage
console.log(vegetables[0]); // "Onion"
console.log(vegetables.length); // 4

// Add to list
vegetables.push("Chili");

// Loop through
vegetables.forEach((vegetable) => {
  console.log(vegetable);
});
```

### 4️⃣ Functions - Reuse Code
```javascript
// Simple function
function greet(name) {
  return "Hello " + name;
}

console.log(greet("Ahmed")); // Hello Ahmed

// Modern way (Arrow Function)
const add = (a, b) => a + b;
console.log(add(5, 3)); // 8
```

### 5️⃣ Async and Await - Wait for Something
```javascript
// Wait for something to complete
async function getData() {
  console.log("Getting data...");
  
  // Wait 2 seconds
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
  
  console.log("Data received!");
}

getData();
```

## ✅ Practice Exercise
```javascript
// Create a simple Object
const person = {
  name: "Ali",
  age: 30,
  skills: ["JavaScript", "HTML", "CSS"]
};

// Print it
console.log(person);

// Add to Object
person.city = "Islamabad";
```

## ✅ Checklist
- [ ] Understand variables and types
- [ ] Work with Objects and Arrays
- [ ] Write Functions
- [ ] Understand Async/Await

---

# 🎯 LEVEL 2: HTTP and APIs (2-3 days)

## HTTP Methods Explained

### GET - Fetch Information
```javascript
// Get information from a website
fetch('https://api.example.com/products')
  .then(response => response.json())
  .then(data => console.log(data));
```

### POST - Send Data
```javascript
// Send new data to server
fetch('https://api.example.com/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "Laptop",
    price: 50000
  })
})
.then(response => response.json())
.then(data => console.log("Response:", data));
```

### PUT - Update Information
```javascript
// Update existing data
fetch('https://api.example.com/products/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "New Name",
    price: 60000
  })
})
.then(response => response.json())
.then(data => console.log("Updated"));
```

### DELETE - Delete Information
```javascript
// Delete something
fetch('https://api.example.com/products/1', {
  method: 'DELETE'
})
.then(response => console.log("Deleted"));
```

## HTTP Status Codes
```
200 = OK ✅
201 = Created ✅
400 = Bad Request ❌
401 = Unauthorized ❌
404 = Not Found ❌
500 = Server Error ❌
```

## Error Handling
```javascript
async function safeWay() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Data:", data);
    
  } catch (error) {
    console.log("Problem:", error.message);
  }
}

safeWay();
```

## ✅ Checklist
- [ ] Understand GET, POST, PUT, DELETE differences
- [ ] Fetch data from APIs
- [ ] Handle Errors properly

---

# 🎯 LEVEL 3: Webhooks Concept (2-3 days)

## What is a Webhook?

### Simple Analogy
```
Regular API:
You → Ask a question → Get answer
You → Ask a question → Get answer
(You have to ask repeatedly)

Webhook:
Something happened
→ You automatically get notified
(You don't have to ask)
```

### Real Example
```
Imagine:
- Someone orders from your shop
- Shopify automatically tells you:
  "Order #123 received!"
  
This is a Webhook - automatic notification
```

## How Webhooks Work

```
Step 1: You tell Shopify
"When someone places an order, send me the data at this address"

Step 2: Someone places an order
Shopify immediately sends data to your address

Step 3: Your server receives the data
"Order received! Now I can handle it"
```

## Basic Webhook Structure
```javascript
// This is webhook data
{
  "type": "orders/create",
  "id": "123456789",
  "order": {
    "id": 987654321,
    "customer_name": "Ahmed",
    "total_price": "5000.00",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

## Webhook Benefits
```
✅ Get data instantly
✅ Process automatically
✅ Less server load
✅ Real-time updates
```

## ✅ Checklist
- [ ] Understand what a Webhook is
- [ ] Know difference between API and Webhook
- [ ] Understand Webhook benefits

---

# 🎯 LEVEL 4: First Simple Webhook (3-4 days)

## Build a Server (Node.js + Express)

### Setup
```bash
# Create folder
mkdir my-webhook
cd my-webhook

# Create files
npm init -y

# Install Express
npm install express
```

### Create Server
```javascript
// server.js
const express = require('express');
const app = express();

// Understand JSON data
app.use(express.json());

// Receive webhook
app.post('/webhook', (req, res) => {
  console.log("Data received!");
  console.log(req.body);
  
  // Response: everything is OK
  res.status(200).send('OK');
});

// Start server
app.listen(3000, () => {
  console.log("Server running: http://localhost:3000");
});
```

### Run It
```bash
node server.js
```

## Test the Webhook

### Method 1: Using cURL
```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed",
    "age": 25,
    "city": "Karachi"
  }'
```

### Method 2: Using Postman
```
1. Open Postman
2. Create new Request
3. Method: POST
4. URL: http://localhost:3000/webhook
5. Body → raw → JSON:
{
  "name": "Ahmed",
  "age": 25
}
6. Send
```

### Method 3: Using JavaScript
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
.then(data => console.log("Response:", data));
```

```bash
node test.js
```

## Validate Data
```javascript
app.post('/webhook', (req, res) => {
  const data = req.body;
  
  // Check if name exists
  if (!data.name) {
    return res.status(400).send('Name is required');
  }
  
  // Check if age is valid
  if (data.age < 0 || data.age > 120) {
    return res.status(400).send('Age is invalid');
  }
  
  console.log("Data is valid!");
  res.status(200).send('Accepted');
});
```

## ✅ Checklist
- [ ] Can build a server
- [ ] Can receive webhooks
- [ ] Understand the data
- [ ] Can validate data

---

# 🎯 LEVEL 5: Shopify Basics (4-5 days)

## What is Shopify?

```
Shopify = Platform to build online stores

Like:
- We opened a shop
- Customers placed orders
- Shopify handles everything:
  - Payments
  - Inventory
  - Shipping
```

## Setup Shopify Store

### 1. Create Development Store
```
1. Go to: https://www.shopify.com
2. Click "Start free trial"
3. Enter your information
4. Create your store
```

### 2. Get API Credentials
```
In Admin Dashboard:
Settings → Apps and integrations → Develop apps

Create Custom app:
- Name: "My Webhook App"
- Admin API access scopes:
  - read_orders
  - write_orders
  - read_products
  
Generate and save Access Token (VERY IMPORTANT!)
```

## Shopify API Basics

### Shopify API Endpoint
```
https://your-store.myshopify.com/admin/api/2024-01/orders.json
```

### Example: Get Orders
```javascript
const store = "your-store";
const accessToken = "your_access_token";

async function getOrders() {
  try {
    const response = await fetch(
      `https://${store}.myshopify.com/admin/api/2024-01/orders.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken
        }
      }
    );
    
    const data = await response.json();
    console.log("Orders:", data.orders);
    
  } catch (error) {
    console.log("Error:", error);
  }
}

getOrders();
```

## Shopify Data Structure

### Order Structure
```javascript
{
  "order": {
    "id": 1234567890,
    "email": "customer@example.com",
    "created_at": "2024-01-15T10:30:00Z",
    "total_price": "99.99",
    "currency": "USD",
    "customer": {
      "id": 9876543210,
      "first_name": "Ahmed",
      "last_name": "Ali"
    },
    "line_items": [
      {
        "id": 111111,
        "title": "Laptop",
        "quantity": 1,
        "price": "99.99"
      }
    ]
  }
}
```

### Product Structure
```javascript
{
  "product": {
    "id": 1234567890,
    "title": "Laptop Pro",
    "handle": "laptop-pro",
    "description": "High performance laptop",
    "variants": [
      {
        "id": 111111,
        "title": "Silver",
        "price": "99999",
        "sku": "LAPTOP-SILVER"
      }
    ]
  }
}
```

## ✅ Checklist
- [ ] Create Shopify store
- [ ] Get API credentials
- [ ] Understand Shopify API data

---

# 🎯 LEVEL 6: Shopify Webhooks Deep Dive (5-6 days)

## Shopify Webhook Events

### Order Events
```
orders/create     → New order placed
orders/updated    → Order changed
orders/deleted    → Order deleted
orders/fulfilled  → Order shipped
orders/cancelled  → Order cancelled
orders/paid       → Payment received
```

### Product Events
```
products/create   → New product
products/updated  → Product changed
products/delete   → Product deleted
```

### Customer Events
```
customers/create  → New customer
customers/update  → Customer updated
```

## Register a Webhook

### From Dashboard
```
1. Settings → Notifications
2. Click "Create webhook"
3. Select Event (e.g., "Order created")
4. Enter your URL
5. Save
```

### Programmatically
```javascript
const store = "your-store";
const accessToken = "your_access_token";

async function registerWebhook() {
  const response = await fetch(
    `https://${store}.myshopify.com/admin/api/2024-01/webhooks.json`,
    {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        webhook: {
          topic: "orders/create",
          address: "https://your-domain.com/webhook/order-created",
          format: "json"
        }
      })
    }
  );
  
  const data = await response.json();
  console.log("Webhook created:", data);
}

registerWebhook();
```

## Verify Webhook (VERY IMPORTANT!)

Shopify sends HMAC to confirm it's really from Shopify.

```javascript
const crypto = require('crypto');

function isWebhookValid(request, secret) {
  const hmacHeader = request.headers['x-shopify-hmac-sha256'];
  const body = request.rawBody; // raw string
  
  // Create HMAC
  const hmac = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('base64');
  
  // Compare
  return hmac === hmacHeader;
}

app.post('/webhook/order', (req, res) => {
  if (!isWebhookValid(req, 'your_webhook_secret')) {
    return res.status(401).send('Unauthorized');
  }
  
  console.log("Webhook is valid!");
  res.status(200).send('OK');
});
```

## ✅ Checklist
- [ ] Know all Webhook events
- [ ] Register webhooks
- [ ] Verify HMAC properly
- [ ] Understand Shopify data

---

# 🎯 LEVEL 7: Practical Shopify Webhooks (7-10 days)

## Complete Server

```javascript
// server.js
const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

// Keep raw body for webhook verification
app.use(bodyParser.raw({ type: 'application/json' }));

// Verify webhook
function verifyWebhook(request) {
  const hmacHeader = request.get('x-shopify-hmac-sha256');
  const body = request.rawBody;
  
  const hmac = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');
  
  return hmac === hmacHeader;
}

// New order
app.post('/webhooks/orders/create', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  
  console.log('New Order:', {
    number: order.number,
    customer: order.customer.first_name,
    price: order.total_price,
    time: order.created_at
  });
  
  // Here do your work:
  // - Send email
  // - Save to database
  // - Call another service
  
  res.status(200).send('OK');
});

// Order updated
app.post('/webhooks/orders/updated', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  
  console.log('Order Updated:', {
    number: order.number,
    status: order.fulfillment_status
  });
  
  res.status(200).send('OK');
});

// Product created
app.post('/webhooks/products/create', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const product = JSON.parse(req.rawBody);
  
  console.log('New Product:', {
    title: product.title,
    handle: product.handle,
    price: product.variants[0]?.price
  });
  
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running: ${PORT}`);
});
```

## Send Email (Nodemailer)

```bash
npm install nodemailer
```

```javascript
const nodemailer = require('nodemailer');

// Configure email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password'
  }
});

// In webhook
app.post('/webhooks/orders/create', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  
  // Send email
  const mailOptions = {
    from: 'noreply@myshop.com',
    to: order.customer.email,
    subject: `Thank you! Your order #${order.number} received`,
    html: `
      <h2>Hello ${order.customer.first_name}!</h2>
      <p>Your order has been received.</p>
      <p><strong>Order Number:</strong> ${order.number}</p>
      <p><strong>Total:</strong> ${order.total_price} ${order.currency}</p>
      <p>Thank you!</p>
    `
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Email error:', error);
    } else {
      console.log('Email sent');
    }
  });
  
  res.status(200).send('OK');
});
```

## Save to Database (MongoDB)

```bash
npm install mongoose
```

```javascript
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/shopify_webhooks');

// Create schema
const orderSchema = new mongoose.Schema({
  shopifyOrderId: Number,
  orderNumber: Number,
  customerEmail: String,
  customerName: String,
  totalPrice: String,
  currency: String,
  createdAt: Date,
  items: Array
});

const Order = mongoose.model('Order', orderSchema);

// In webhook
app.post('/webhooks/orders/create', async (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  
  try {
    const newOrder = new Order({
      shopifyOrderId: order.id,
      orderNumber: order.number,
      customerEmail: order.customer.email,
      customerName: `${order.customer.first_name} ${order.customer.last_name}`,
      totalPrice: order.total_price,
      currency: order.currency,
      createdAt: order.created_at,
      items: order.line_items
    });
    
    await newOrder.save();
    console.log('Order saved');
    
  } catch (error) {
    console.log('Database error:', error);
  }
  
  res.status(200).send('OK');
});
```

## ✅ Checklist
- [ ] Build complete server
- [ ] Send emails
- [ ] Save to database
- [ ] Handle errors

---

# 🎯 LEVEL 8: Advanced Patterns (7-10 days)

## 1. Idempotency - Same Result Every Time

Webhooks can arrive multiple times if your server doesn't respond.
Make sure the same work doesn't happen twice.

```javascript
const processedWebhooks = new Set();

app.post('/webhooks/orders/create', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  const webhookId = req.get('x-shopify-webhook-id');
  
  // Check if already processed
  if (processedWebhooks.has(webhookId)) {
    console.log('Already processed');
    return res.status(200).send('OK');
  }
  
  // First time - do work
  console.log('Processing for first time');
  processedWebhooks.add(webhookId);
  
  // ... do work ...
  
  res.status(200).send('OK');
});

// Better: Save to database
const webhookSchema = new mongoose.Schema({
  webhookId: { type: String, unique: true },
  topic: String,
  processedAt: Date
});

const Webhook = mongoose.model('Webhook', webhookSchema);

app.post('/webhooks/orders/create', async (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  const webhookId = req.get('x-shopify-webhook-id');
  
  try {
    // Try to save first
    await Webhook.create({
      webhookId,
      topic: 'orders/create',
      processedAt: new Date()
    });
    
    // Now do work
    console.log('Processing...');
    
  } catch (error) {
    // If unique constraint fails, already exists
    if (error.code === 11000) {
      console.log('Already processed');
      return res.status(200).send('OK');
    }
    
    throw error;
  }
  
  res.status(200).send('OK');
});
```

## 2. Filtering - Process Only Important Webhooks

```javascript
app.post('/webhooks/orders/create', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  
  // Only process paid orders
  if (order.financial_status !== 'paid') {
    console.log('Not paid yet');
    return res.status(200).send('OK');
  }
  
  // Only process high value orders
  if (order.total_price < 100) {
    console.log('Low value order - ignore');
    return res.status(200).send('OK');
  }
  
  console.log('Important order - process');
  
  res.status(200).send('OK');
});
```

## 3. Event Batching - Collect and Process

```javascript
const eventBatch = [];
const BATCH_SIZE = 10;
const BATCH_TIMEOUT = 5000; // 5 seconds

async function processBatch() {
  if (eventBatch.length === 0) return;
  
  const batch = eventBatch.splice(0);
  
  console.log(`Processing ${batch.length} events`);
  
  try {
    await Order.insertMany(batch);
    console.log('Batch saved');
  } catch (error) {
    console.log('Batch error:', error);
  }
}

// Process periodically
setInterval(processBatch, BATCH_TIMEOUT);

app.post('/webhooks/orders/create', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  
  // Add to batch
  eventBatch.push({
    shopifyOrderId: order.id,
    orderNumber: order.number,
    customerEmail: order.customer.email,
    totalPrice: order.total_price
  });
  
  // Process if batch is full
  if (eventBatch.length >= BATCH_SIZE) {
    processBatch();
  }
  
  res.status(200).send('OK');
});
```

## 4. Transform and Forward Data

```javascript
app.post('/webhooks/orders/create', async (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  
  // Transform data
  const transformedData = {
    orderId: order.id,
    customerName: `${order.customer.first_name} ${order.customer.last_name}`,
    email: order.customer.email,
    items: order.line_items.map(item => ({
      name: item.title,
      quantity: item.quantity,
      price: item.price
    })),
    total: order.total_price,
    timestamp: new Date()
  };
  
  // Send to another service
  try {
    await fetch('https://analytics.example.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer analytics_token'
      },
      body: JSON.stringify(transformedData)
    });
  } catch (error) {
    console.log('Analytics error:', error);
  }
  
  res.status(200).send('OK');
});
```

## 5. Monitoring and Logging

```javascript
const logger = (event, level = 'info') => {
  const log = {
    timestamp: new Date().toISOString(),
    level,
    topic: event.topic,
    orderId: event.orderId,
    message: event.message
  };
  
  console.log(JSON.stringify(log));
};

app.post('/webhooks/orders/create', (req, res) => {
  const startTime = Date.now();
  
  if (!verifyWebhook(req)) {
    logger({
      topic: 'orders/create',
      message: 'Webhook verification failed',
      level: 'error'
    });
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  
  try {
    // Do work
    logger({
      topic: 'orders/create',
      orderId: order.id,
      message: 'Order processed successfully'
    });
    
  } catch (error) {
    logger({
      topic: 'orders/create',
      orderId: order.id,
      message: `Error: ${error.message}`,
      level: 'error'
    });
  }
  
  const duration = Date.now() - startTime;
  console.log(`Processing time: ${duration}ms`);
  
  res.status(200).send('OK');
});
```

## ✅ Checklist
- [ ] Implement Idempotency
- [ ] Filter events properly
- [ ] Do Event batching
- [ ] Transform data
- [ ] Add logging

---

# 🎯 LEVEL 9: Production Ready Setup (5-7 days)

## Environment Variables

```bash
# .env file
SHOPIFY_STORE=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your_token
WEBHOOK_SECRET=your_secret
DATABASE_URL=mongodb://localhost/shopify
PORT=3000
NODE_ENV=production
```

```javascript
require('dotenv').config();

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
```

## Error Handling and Validation

```bash
npm install joi
```

```javascript
const Joi = require('joi');

// Validation schema
const orderSchema = Joi.object({
  id: Joi.number().required(),
  number: Joi.number().required(),
  email: Joi.string().email().required(),
  total_price: Joi.string().required(),
  customer: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required()
  }).required()
});

app.post('/webhooks/orders/create', async (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  
  // Validate
  const { error, value } = orderSchema.validate(order);
  
  if (error) {
    logger({
      topic: 'orders/create',
      message: `Validation error: ${error.details[0].message}`,
      level: 'error'
    });
    return res.status(400).send('Invalid data');
  }
  
  try {
    // ... do work ...
    res.status(200).send('OK');
    
  } catch (error) {
    logger({
      topic: 'orders/create',
      message: error.message,
      level: 'error'
    });
    res.status(500).send('Server error');
  }
});
```

## Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests
  message: 'Too many requests'
});

app.post('/webhooks/orders/create', webhookLimiter, (req, res) => {
  // ... rest of code ...
});
```

## Timeout Handling

```javascript
const TIMEOUT = 30000; // 30 seconds

app.post('/webhooks/orders/create', async (req, res) => {
  const timeout = setTimeout(() => {
    res.status(408).send('Request timeout');
  }, TIMEOUT);
  
  try {
    if (!verifyWebhook(req)) {
      clearTimeout(timeout);
      return res.status(401).send('Unauthorized');
    }
    
    const order = JSON.parse(req.rawBody);
    
    // ... do work (within 30 seconds) ...
    
    clearTimeout(timeout);
    res.status(200).send('OK');
    
  } catch (error) {
    clearTimeout(timeout);
    res.status(500).send('Error');
  }
});
```

## HTTPS and Security

```javascript
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');

// Add security headers
app.use(helmet());

// For HTTPS
if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync('/path/to/private-key.pem'),
    cert: fs.readFileSync('/path/to/certificate.pem')
  };
  
  https.createServer(options, app).listen(443);
} else {
  app.listen(3000);
}
```

## Docker Deployment

```dockerfile
# Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```bash
# Build
docker build -t shopify-webhook-app .

# Run
docker run -p 3000:3000 \
  -e SHOPIFY_STORE=your-store \
  -e WEBHOOK_SECRET=your_secret \
  shopify-webhook-app
```

## Health Check Endpoint

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});
```

## ✅ Checklist
- [ ] Use environment variables
- [ ] Implement validation
- [ ] Add rate limiting
- [ ] Handle timeouts
- [ ] Deploy with Docker

---

# 🎯 LEVEL 10: Building Shopify Apps (15-20 days)

## What is a Shopify App?

```
Shopify App = An extension that runs in Shopify store

Examples:
- Email sender app
- Inventory manager
- Analytics app
- Shipping calculator
```

## Shopify App Setup

### 1. Create App Scaffold
```bash
npm init @shopify/app -- my-shopify-app
cd my-shopify-app
npm install
npm run dev
```

### 2. Connect with Shopify CLI
```bash
shopify app build
shopify app deploy
```

## Use Shopify React Components

```javascript
// pages/index.js
import {
  Card,
  Button,
  TextField,
  Layout,
  Page
} from '@shopify/polaris';

export default function HomePage() {
  return (
    <Page title="Welcome!">
      <Layout>
        <Layout.Section>
          <Card title="Information">
            <Card.Section>
              Your app is here
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
```

## Create Backend API

```javascript
// api/webhooks/orders-create.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }
  
  const { body } = req;
  
  console.log('New order:', body);
  
  // Do work here
  
  res.status(200).send({ success: true });
}
```

## Use Admin GraphQL

```javascript
async function getOrders(accessToken, shop) {
  const query = `
    {
      orders(first: 10) {
        edges {
          node {
            id
            number
            createdAt
            totalPriceSet {
              shopMoney {
                amount
              }
            }
            customer {
              firstName
              lastName
              email
            }
          }
        }
      }
    }
  `;
  
  const response = await fetch(
    `https://${shop}/admin/api/2024-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    }
  );
  
  const data = await response.json();
  return data.data.orders.edges;
}
```

## Register Webhooks in App

```javascript
async function registerWebhook(shop, accessToken) {
  const mutation = `
    mutation {
      webhookSubscriptionCreate(
        topic: ORDERS_CREATE
        webhookSubscription: {
          format: JSON
          address: "https://your-app.com/webhooks/orders-create"
        }
      ) {
        userErrors {
          field
          message
        }
        webhookSubscription {
          id
          topic
        }
      }
    }
  `;
  
  const response = await fetch(
    `https://${shop}/admin/api/2024-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: mutation })
    }
  );
  
  const data = await response.json();
  console.log('Webhook registered:', data);
}
```

## Complete Shopify App Example

```javascript
// app.js
import React, { useState, useEffect } from 'react';
import {
  Page,
  Layout,
  Card,
  DataTable,
  Button,
  Badge
} from '@shopify/polaris';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  async function fetchOrders() {
    setLoading(true);
    
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      
      // Prepare data
      const rows = data.orders.map(order => [
        order.number,
        order.customer.firstName + ' ' + order.customer.lastName,
        order.customer.email,
        order.totalPrice,
        <Badge>{order.financial_status}</Badge>
      ]);
      
      setOrders(rows);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Page title="Orders">
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section title="All Orders">
              <DataTable
                columnContentTypes={[
                  'numeric',
                  'text',
                  'text',
                  'numeric',
                  'text'
                ]}
                headings={[
                  'Number',
                  'Customer',
                  'Email',
                  'Amount',
                  'Status'
                ]}
                rows={orders}
              />
            </Card.Section>
            <Card.Section>
              <Button onClick={fetchOrders} loading={loading}>
                Refresh
              </Button>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
```

## ✅ Checklist
- [ ] Create Shopify App
- [ ] Use Polaris components
- [ ] Fetch data with GraphQL
- [ ] Register webhooks
- [ ] Deploy app

---

# 📚 Complete Learning Resources

## Free Resources

### 1. Official Documentation
- **Shopify Webhooks**: https://shopify.dev/docs/api/admin-rest/latest/resources/webhook
- **Shopify GraphQL**: https://shopify.dev/docs/api/admin-graphql/latest/objects/Order
- **Express.js**: https://expressjs.com/

### 2. Video Tutorials
- JavaScript Basics: YouTube
- Webhooks: YouTube - "Learn Webhooks"
- Shopify API: Shopify YouTube Channel

### 3. Tools
- **Postman**: https://www.postman.com/ (API testing)
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas (free database)
- **Railway**: https://railway.app/ (free hosting)
- **Ngrok**: https://ngrok.com/ (expose localhost)

## Practice Projects

### Project 1: Simple Webhook
```
Goal: Send email when order arrives
Time: 3-4 days
Level: Beginner
```

### Project 2: Orders Dashboard
```
Goal: Display all orders in UI
Time: 5-7 days
Level: Intermediate
```

### Project 3: Inventory Sync
```
Goal: Sync Shopify inventory to database
Time: 7-10 days
Level: Intermediate
```

### Project 4: Complete Shopify App
```
Goal: Full working Shopify App
Time: 15-20 days
Level: Advanced
```

---

# 🎓 Summary and Next Steps

## What You Can Do Now

✅ Build webhooks with JavaScript
✅ Work with Shopify
✅ Process real-time data
✅ Build production apps
✅ Understand Shopify webhooks

## Next Steps

1. Build your first simple webhook
2. Connect to Shopify
3. Create email sending app
4. Work with database
5. Build your first Shopify App

## Important Points to Remember

```
1. Think of webhooks this way:
   "Something happened → I got notified → I did work"

2. Always verify HMAC
   (Security is very important)

3. Keep it idempotent
   (Don't do the same work twice)

4. Handle errors
   (Something can always fail)

5. Log everything
   (Helps find problems)
```

---

## Need Help?

1. Ask questions - any question is valid
2. Share errors - give complete error message
3. Share code - what's not working?
4. Give examples - what do you want to do?

---

## Happy Coding! 🚀

**Remember:**
- Celebrate small wins
- Learn from mistakes
- Never give up
- Always ask questions

**You can do this!** 💪

---

*Last Updated: January 2024*
*Level-based Learning System*
*From Zero to Advanced*
