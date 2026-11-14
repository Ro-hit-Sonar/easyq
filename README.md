# EasyQ

**Digital queue management that replaces physical queues with QR check-in and live position tracking.**

[**Live demo**](https://easyq-psi.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

<!-- Add a screenshot or GIF of the dashboard and a customer's queue page here, e.g. ![Dashboard](docs/dashboard.png) -->

## What it does

Businesses create a queue, display its QR code, and customers join from their own phones, so nobody has to stand in a line or wait for a paper token.

**For the business (dashboard)**
- Create and manage queues
- Show a QR code that customers scan to join
- Serve the next customer, remove someone, or delete a queue

**For the customer**
- Join by scanning the QR code and entering a name
- See their live position in the queue, refreshed every 5 seconds

## Tech stack

- **Framework:** Next.js 14 (App Router), React, TypeScript
- **UI:** Tailwind CSS, shadcn/ui (Radix UI), Framer Motion, Recharts
- **QR codes:** `qrcode`
- **Data:** REST API routes in Next.js with real-time updates by polling
- **Hosting:** Vercel

## API

All routes live under `app/api/queue/`:

| Method | Route | Purpose |
|---|---|---|
| `POST` | `/api/queue/create` | Create a new queue |
| `GET` | `/api/queue/all` | List all queues |
| `GET` | `/api/queue/[id]` | Get a queue and its customers |
| `POST` | `/api/queue/[id]/join` | Join a queue |
| `POST` | `/api/queue/[id]/serve` | Serve the next customer |
| `DELETE` | `/api/queue/[id]/remove` | Remove a customer |
| `DELETE` | `/api/queue/[id]/delete` | Delete a queue |

## Getting started

Requires Node.js 18+ and [pnpm](https://pnpm.io/). No environment variables are needed.

```bash
git clone https://github.com/Ro-hit-Sonar/easyq.git
cd easyq
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  dashboard/            Business dashboard
  queue/[queueId]/      Customer queue page
  api/queue/            REST API routes
components/
  qr-code-display.tsx   QR code for joining a queue
lib/
  queue-store.ts        Queue data store
```

## Known limitations

- Queues are stored **in server memory** (`lib/queue-store.ts`), so they reset when the server restarts and are not shared across serverless instances. Swapping in a database such as PostgreSQL or Redis is the natural next step for production use.
- The business login is a front-end demo with hardcoded credentials in the source, so it does not provide real authentication. Add proper auth before using this for a real business.

## Author

Built by [Rohit Sonar](https://github.com/Ro-hit-Sonar).
