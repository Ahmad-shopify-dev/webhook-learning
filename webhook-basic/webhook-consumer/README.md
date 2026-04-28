# Webhook Consumer

This service receives webhook events from the producer.

## Default Port

- `3000`

## Environment File

Create `webhook-consumer/.env`:

```env
PORT=3000
BASE_URL=http://localhost:3000
PRODUCER_URL=http://localhost:3001
WEBHOOK_SECRET=somewebhooksecret
```

`WEBHOOK_SECRET` must match the producer value.

## Install

From project root:

```bash
npm install --prefix webhook-consumer
```

## Run Only Consumer

```bash
npm run start --prefix webhook-consumer
```

## Webhook Endpoint

- `POST /api/webhook`
  - validates `x-webhook-token` header
  - receives user payload (`name`, `email`, `designation`)

## Health Endpoint

- `GET /api/home`

## Run with Producer (Concurrently)

From root:

```bash
npm run dev
```

