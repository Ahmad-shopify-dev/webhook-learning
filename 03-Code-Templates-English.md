# 📋 Code Templates - Copy and Paste Ready

---

## Template 1: Simple Webhook Server

### File: `server-simple.js`

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Receive webhook
app.post('/webhook', (req, res) => {
  const data = req.body;
  
  console.log('Data received:');
  console.log(JSON.stringify(data, null, 2));
  
  res.status(200).send({ message: 'OK' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
```

**Usage:**
```bash
npm install express
node server-simple.js
```

---

## Template 2: Shopify Webhook (HMAC Verification)

### File: `server-shopify.js`

```javascript
const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const WEBHOOK_SECRET = 'your_webhook_secret';

// Keep raw body
app.use(bodyParser.raw({ type: 'application/json' }));

// Verify HMAC
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
  console.log('Order webhook received');
  
  if (!verifyWebhook(req)) {
    console.log('Verification failed!');
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  
  console.log('✅ Order #' + order.number);
  console.log('Customer: ' + order.customer.first_name);
  console.log('Amount: ' + order.total_price);
  
  res.status(200).send('OK');
});

// Order updated
app.post('/webhooks/orders/updated', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  console.log('Order updated #' + order.number);
  
  res.status(200).send('OK');
});

// Product created
app.post('/webhooks/products/create', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const product = JSON.parse(req.rawBody);
  console.log('New product: ' + product.title);
  
  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Server running');
});
```

**Usage:**
```bash
npm install express crypto body-parser
node server-shopify.js
```

---

## Template 3: Webhook + Email

### File: `server-with-email.js`

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const WEBHOOK_SECRET = 'your_webhook_secret';

app.use(bodyParser.raw({ type: 'application/json' }));

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password'
  }
});

// Verify
function verifyWebhook(request) {
  const hmacHeader = request.get('x-shopify-hmac-sha256');
  const body = request.rawBody;
  const hmac = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');
  return hmac === hmacHeader;
}

// Webhook
app.post('/webhooks/orders/create', async (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const order = JSON.parse(req.rawBody);
  
  console.log('Order received #' + order.number);
  
  // Send email
  try {
    const mailOptions = {
      from: 'noreply@myshop.com',
      to: order.customer.email,
      subject: 'Thank you! Your order #' + order.number,
      html: `
        <h2>Hello ${order.customer.first_name}!</h2>
        <p>Your order has been received</p>
        <p><strong>Order Number:</strong> #${order.number}</p>
        <p><strong>Total:</strong> ${order.total_price} ${order.currency}</p>
        <p>Thank you! 🙏</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
    
  } catch (error) {
    console.log('Email error:', error);
  }
  
  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Server running');
});
```

**Usage:**
```bash
npm install express nodemailer crypto body-parser
node server-with-email.js
```

---

## Template 4: Webhook + MongoDB

### File: `server-with-db.js`

```javascript
const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const WEBHOOK_SECRET = 'your_webhook_secret';

app.use(bodyParser.raw({ type: 'application/json' }));

// Connect MongoDB
mongoose.connect('mongodb://localhost/webhooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema
const orderSchema = new mongoose.Schema({
  shopifyOrderId: Number,
  orderNumber: Number,
  customerEmail: String,
  customerName: String,
  totalPrice: String,
  currency: String,
  status: String,
  items: Array,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Verify
function verifyWebhook(request) {
  const hmacHeader = request.get('x-shopify-hmac-sha256');
  const body = request.rawBody;
  const hmac = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');
  return hmac === hmacHeader;
}

// Webhook
app.post('/webhooks/orders/create', async (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  try {
    const order = JSON.parse(req.rawBody);
    
    // Save to database
    const newOrder = new Order({
      shopifyOrderId: order.id,
      orderNumber: order.number,
      customerEmail: order.customer.email,
      customerName: order.customer.first_name + ' ' + order.customer.last_name,
      totalPrice: order.total_price,
      currency: order.currency,
      status: order.financial_status,
      items: order.line_items
    });
    
    await newOrder.save();
    
    console.log('Order saved #' + order.number);
    res.status(200).send('OK');
    
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Error');
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).send('Error');
  }
});

app.listen(3000, () => {
  console.log('Server running');
});
```

**Usage:**
```bash
npm install express mongoose crypto body-parser
node server-with-db.js
```

---

## Template 5: Complete Production Setup

### File: `server-production.js`

```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

// Security
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});
app.use(limiter);

// Body parser
app.use(bodyParser.raw({ type: 'application/json' }));

// MongoDB
mongoose.connect(process.env.MONGO_URI);

// Schema
const webhookSchema = new mongoose.Schema({
  webhookId: { type: String, unique: true },
  topic: String,
  orderId: String,
  data: mongoose.Schema.Types.Mixed,
  status: String,
  processedAt: { type: Date, default: Date.now }
});

const Webhook = mongoose.model('Webhook', webhookSchema);

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Logger
function log(message, type = 'info') {
  console.log(`[${new Date().toISOString()}] ${type.toUpperCase()}: ${message}`);
}

// Verify webhook
function verifyWebhook(request) {
  const hmacHeader = request.get('x-shopify-hmac-sha256');
  const body = request.rawBody;
  
  if (!hmacHeader || !body) {
    return false;
  }
  
  const hmac = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');
  
  return hmac === hmacHeader;
}

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Webhook
app.post('/webhooks/orders/create', async (req, res) => {
  const startTime = Date.now();
  const webhookId = req.get('x-shopify-webhook-id');
  
  log(`Webhook received: ${webhookId}`);
  
  try {
    // Verify
    if (!verifyWebhook(req)) {
      log('Verification failed', 'error');
      return res.status(401).send('Unauthorized');
    }
    
    const order = JSON.parse(req.rawBody);
    
    // Check for duplicate
    try {
      await Webhook.create({
        webhookId,
        topic: 'orders/create',
        orderId: order.id,
        data: order,
        status: 'processed'
      });
    } catch (error) {
      if (error.code === 11000) {
        log(`Duplicate webhook: ${webhookId}`);
        return res.status(200).send('OK');
      }
      throw error;
    }
    
    log(`Order #${order.number} received`);
    
    // Send email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: order.customer.email,
        subject: `Thank you! Your order #${order.number}`,
        html: `
          <h2>Hello ${order.customer.first_name}!</h2>
          <p>Amount: ${order.total_price}</p>
        `
      });
      log('Email sent');
    } catch (error) {
      log(`Email error: ${error.message}`, 'error');
    }
    
    const duration = Date.now() - startTime;
    log(`Completed in ${duration}ms`);
    
    res.status(200).send('OK');
    
  } catch (error) {
    log(`Error: ${error.message}`, 'error');
    res.status(500).send('Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  log(`Server started: port ${PORT}`);
});
```

### `.env` File

```
MONGO_URI=mongodb://localhost/webhooks
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
WEBHOOK_SECRET=your_shopify_webhook_secret
PORT=3000
NODE_ENV=production
```

---

## Template 6: Webhook Test Script

### File: `test-webhook.js`

```javascript
// Method 1: Using Fetch API
async function testWebhook() {
  const data = {
    name: "Ahmed",
    age: 25,
    city: "Karachi"
  };
  
  try {
    const response = await fetch('http://localhost:3000/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    console.log('Response:', result);
    
  } catch (error) {
    console.log('Error:', error);
  }
}

testWebhook();

// Method 2: cURL (in Terminal)
// curl -X POST http://localhost:3000/webhook \
//   -H "Content-Type: application/json" \
//   -d '{"name":"Ahmed","age":25}'

// Method 3: Postman
// 1. Create new Request
// 2. Method: POST
// 3. URL: http://localhost:3000/webhook
// 4. Body → raw → JSON:
// {
//   "name": "Ahmed",
//   "age": 25
// }
// 5. Send
```

---

## Template 7: Email Templates

### File: `email-templates.js`

```javascript
// 1. Order Created
function orderCreatedEmail(order) {
  return `
    <div style="font-family: Arial; text-align: left;">
      <h1>Thank you for your order!</h1>
      
      <p>Hello ${order.customer.first_name},</p>
      
      <p>Your order has been received successfully.</p>
      
      <h2>Order Details:</h2>
      <table style="width: 100%; border: 1px solid #ddd;">
        <tr style="background: #f0f0f0;">
          <td style="padding: 10px;"><strong>Order Number</strong></td>
          <td style="padding: 10px;">#${order.number}</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>Date</strong></td>
          <td style="padding: 10px;">${new Date(order.created_at).toLocaleDateString()}</td>
        </tr>
        <tr style="background: #f0f0f0;">
          <td style="padding: 10px;"><strong>Total</strong></td>
          <td style="padding: 10px;">${order.total_price} ${order.currency}</td>
        </tr>
      </table>
      
      <h2>You ordered:</h2>
      <ul>
        ${order.line_items.map(item => `
          <li>
            ${item.title}
            <br/>
            Quantity: ${item.quantity} × ${item.price} ${order.currency}
          </li>
        `).join('')}
      </ul>
      
      <h2>Shipping Info:</h2>
      <p>
        ${order.shipping_lines[0]?.title || 'Standard Shipping'}<br/>
        Estimated time: 3-5 business days
      </p>
      
      <p>Contact us if you have any questions!</p>
      <p>Thank you! 🙏</p>
    </div>
  `;
}

// 2. Order Shipped
function orderShippedEmail(order, trackingNumber) {
  return `
    <div style="font-family: Arial;">
      <h1>Your order has shipped!</h1>
      
      <p>Hello ${order.customer.first_name},</p>
      
      <p>Great news! Your order #${order.number} has been shipped.</p>
      
      <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
      
      <p>You can track your order now.</p>
      
      <p>Thank you! 🙏</p>
    </div>
  `;
}

// 3. Order Cancelled
function orderCancelledEmail(order, reason) {
  return `
    <div style="font-family: Arial;">
      <h1>Your order has been cancelled</h1>
      
      <p>Hello ${order.customer.first_name},</p>
      
      <p>Your order #${order.number} has been cancelled.</p>
      
      <p><strong>Reason:</strong> ${reason}</p>
      
      <p><strong>Refund:</strong> ${order.total_price} ${order.currency}</p>
      
      <p>This will be refunded within 3-5 business days.</p>
      
      <p>Thank you! 🙏</p>
    </div>
  `;
}

module.exports = {
  orderCreatedEmail,
  orderShippedEmail,
  orderCancelledEmail
};
```

---

## Template 8: Multiple Webhooks Handler

### File: `multi-webhooks.js`

```javascript
const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const WEBHOOK_SECRET = 'your_webhook_secret';

app.use(bodyParser.raw({ type: 'application/json' }));

// Verify
function verify(request) {
  const hmacHeader = request.get('x-shopify-hmac-sha256');
  const body = request.rawBody;
  const hmac = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');
  return hmac === hmacHeader;
}

// Handler functions
const handlers = {
  'orders/create': (order) => {
    console.log('New order #' + order.number);
    // Do work here
  },
  'orders/updated': (order) => {
    console.log('Order updated #' + order.number);
  },
  'orders/cancelled': (order) => {
    console.log('Order cancelled #' + order.number);
  },
  'products/create': (product) => {
    console.log('New product: ' + product.title);
  },
  'products/updated': (product) => {
    console.log('Product updated: ' + product.title);
  },
  'customers/create': (customer) => {
    console.log('New customer: ' + customer.first_name);
  }
};

// Webhook router
app.post('/webhooks/:topic', (req, res) => {
  if (!verify(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  const topic = req.params.topic;
  const data = JSON.parse(req.rawBody);
  
  if (handlers[topic]) {
    handlers[topic](data);
  }
  
  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Server running');
});
```

---

## Template 9: Environment Setup

### File: `package.json`

```json
{
  "name": "shopify-webhook-app",
  "version": "1.0.0",
  "description": "Shopify Webhook Handler",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "node test-webhook.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "nodemailer": "^6.9.0",
    "dotenv": "^16.0.0",
    "body-parser": "^1.20.0",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.7.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0"
  }
}
```

**Install:**
```bash
npm install
```

---

## Template 10: Docker Setup

### File: `Dockerfile`

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "server.js"]
```

### File: `docker-compose.yml`

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/webhooks
      - WEBHOOK_SECRET=${WEBHOOK_SECRET}
      - EMAIL_USER=${EMAIL_USER}
      - EMAIL_PASS=${EMAIL_PASS}
    depends_on:
      - mongo

  mongo:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

**Run:**
```bash
docker-compose up
```

---

## Quick Start

1. Pick a Template
2. Get your credentials (.env)
3. Install dependencies
4. Update the code with your info
5. Start the server
6. Test it

**Done!** ✅

---

## Common Dependencies

```bash
# Basic
npm install express body-parser

# With Database
npm install mongoose

# With Email
npm install nodemailer

# Production
npm install helmet express-rate-limit

# All at once
npm install express mongoose nodemailer dotenv body-parser helmet express-rate-limit
```

---

**Pick a template and start building!** 🚀
