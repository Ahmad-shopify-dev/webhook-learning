# Webhook Basic (Producer + Consumer)

Simple webhook learning project with two services:

- `webhook-producer`: registers webhook endpoints and sends event payloads.
- `webhook-consumer`: receives webhook payloads and processes them.

## Project Structure

```text
webhook-basic/
|- webhook-consumer/
|- webhook-producer/
|- package.json
```

## Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm

## Install Dependencies

From the project root:

```bash
npm install
npm install --prefix webhook-consumer
npm install --prefix webhook-producer
```

## Environment Variables

### `webhook-consumer/.env`

```env
PORT=3000
BASE_URL=http://localhost:3000
PRODUCER_URL=http://localhost:3001
WEBHOOK_SECRET=somewebhooksecret
```

### `webhook-producer/.env`

```env
PORT=3001
BASE_URL=http://localhost:3001
CONSUMER_URL=http://localhost:3000
WEBHOOK_SECRET=somewebhooksecret
```

Make sure `WEBHOOK_SECRET` is exactly the same in both files.

## Run Both Servers with Concurrently

From the root folder:

```bash
npm run dev
```

This runs:

- consumer on `http://localhost:3000`
- producer on `http://localhost:3001`

## API Flow

1. Register consumer webhook in producer:
   - `POST /api/webhook-register`
2. Trigger event in producer:
   - `POST /api/user-register`
3. Producer sends payload to consumer:
   - `POST /api/webhook`

## Sample Requests

### 1) Register webhook (Producer)

`POST http://localhost:3001/api/webhook-register`

```json
{
  "token": "my-token",
  "path": "http://localhost:3000/api/webhook",
  "eventtype": "user-register"
}
```

### 2) Fire event (Producer)

`POST http://localhost:3001/api/user-register`

```json
{
  "name": "Smith",
  "email": "smith@gmail.com",
  "designation": "Software Engineer"
}
```

If successful, consumer console will print received user data.

