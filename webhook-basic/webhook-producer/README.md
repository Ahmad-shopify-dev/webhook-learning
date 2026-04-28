# Webhook Producer

This service registers webhook URLs and sends payloads when an event is triggered.

## Default Port

- `3001`

## Environment File

Create `webhook-producer/.env`:

```env
PORT=3001
BASE_URL=http://localhost:3001
CONSUMER_URL=http://localhost:3000
WEBHOOK_SECRET=somewebhooksecret
```

`WEBHOOK_SECRET` must match the consumer value.

## Install

From project root:

```bash
npm install --prefix webhook-producer
```

## Run Only Producer

```bash
npm run start --prefix webhook-producer
```

## Main Endpoints

- `POST /api/webhook-register`
  - stores webhook registration (`token`, `path`, `eventtype`)
- `POST /api/user-register`
  - simulates user registration
  - triggers webhook send for `user-register` event

## Health Endpoint

- `GET /api/home`

## Run with Consumer (Concurrently)

From root:

```bash
npm run dev
```

