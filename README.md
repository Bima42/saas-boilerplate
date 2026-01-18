# The SaaS Boilerplate

Welcome! This is a robust, full-stack SaaS boilerplate built around **Next.js**.

I built this because I love shipping products, but I hate configuring the same infrastructure over and over again. It’s not "the ultimate" boilerplate, it’s just a really solid foundation standing on the shoulders of giants. It combines a strictly typed backend with a headless CMS in a single monorepo-style application.

---

## Quick Start

We use Docker to keep the environment consistent.

### 1. Setup Environment
Copy the example environment file and fill in your secrets.
```bash
cp .env.example .env
```

### 2. Fire it up
Start the application and the database.
```bash
docker compose up -d --build
```

### 3. ⚠️ Important: Run Migrations
Payload CMS is configured with `push: false` to prevent accidental schema changes in production. **You must run this manually after the container starts:**

```bash
docker compose exec app npx payload migrate
```

### 4. You are live
*   **App:** [http://localhost:3000](http://localhost:3000)
*   **CMS Admin:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Documentation (For Humans & LLMs)

I have written detailed documentation to help you (or your AI assistant) understand the architecture.

**If you are using an LLM (Cursor, Windsurf, ChatGPT) to help you code, feed it `docs/LLM.md` first.**

*   **[docs/LLM.md](./docs/LLM.md)**: **Start here.** The master context file containing architecture, patterns, and coding rules.
*   **[docs/API.md](./docs/API.md)**: How tRPC works, how to add endpoints, and authentication logic.
*   **[docs/DB.md](./docs/DB.md)**: Database schema, Drizzle ORM usage, and migration workflows.
*   **[docs/PAYLOAD.md](./docs/PAYLOAD.md)**: How to manage the CMS, create collections, and handle Payload-specific migrations.

---

## Project Structure

A quick look at where things live:

```text
src/
├── app/                  # Next.js App Router
├── components/           # Shared UI (Shadcn)
├── lib/                  # Singleton clients (Stripe, Auth)
├── payload_collections/  # CMS Content Definitions
├── server/               # Backend Logic
│   ├── api/              # tRPC Routers
│   ├── db/               # Drizzle Schema
│   └── services/         # Business Logic (The "Service Layer")
└── payload.config.ts     # CMS Configuration
```

## Common Commands

| Command | Description |
| :--- | :--- |
| `npm run db:generate` | Generate SQL migrations from Drizzle schema changes. |
| `npm run db:push` | Push schema changes directly to DB (Dev only). |
| `docker compose exec app npx payload migrate:create` | Create a new CMS migration file. |
| `docker compose exec app npx payload migrate` | Apply pending CMS migrations. |

---

## Standing on the Shoulders of Giants ♥️

This project wouldn't exist without the incredible open-source community. A huge shout-out and thanks to the maintainers of these packages. If you use this boilerplate, please consider starring their repos:

*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
*   **API Layer:** [tRPC v11](https://trpc.io/) (End-to-end type safety)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) & [Drizzle ORM](https://orm.drizzle.team/)
*   **CMS:** [Payload CMS 3.0](https://payloadcms.com/) (Headless, code-first)
*   **Auth:** [Better-Auth](https://www.better-auth.com/)
*   **UI/UX:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
*   **Payments:** [Stripe](https://stripe.com/)
*   **Deployment:** Ready for [Dokploy](https://dokploy.com/)


---

If you like this boilerplate, please consider giving it a star ⭐ on GitHub. It helps me know that this work is valuable to the community!

---

Made with many 🥜
