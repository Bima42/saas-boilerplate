# The SaaS Boilerplate

Welcome! This is a robust, full-stack SaaS boilerplate built around **Next.js**.

I built this because I love shipping products, but I hate configuring the same infrastructure over and over again. It’s not "the ultimate" boilerplate, it’s just a really solid foundation standing on the shoulders of giants. It combines a strictly typed backend with a **fully integrated Admin Dashboard and Blog system** in a single application.

Want to see what it looks like? Click on [this link!](https://boilerplate.tanguypauvret.me)
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

### 3. You are live
*   **App:** [http://localhost:3000](http://localhost:3000)
*   **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Documentation (For Humans & LLMs)

I have written detailed documentation to help you (or your AI assistant) understand the architecture.

**If you are using an LLM (Cursor, Windsurf, ChatGPT) to help you code, feed it `docs/LLM.md` first.**

*   **[docs/LLM.md](./docs/LLM.md)**: **Start here.** The master context file containing architecture, patterns, and coding rules.
*   **[docs/API.md](./docs/API.md)**: How tRPC works, how to add endpoints, and authentication logic.
*   **[docs/DB.md](./docs/DB.md)**: Database schema, Drizzle ORM usage, and migration workflows.

---

## Project Structure

A quick look at where things live:

```text
src/
├── app/                  # Next.js App Router
│   ├── (admin)/          # Internal Admin Dashboard
│   ├── (app)/            # Main SaaS Application
│   └── blog/             # Public Blog Routes
├── components/           # Shared UI (Shadcn)
├── lib/                  # Singleton clients (Stripe, Auth)
├── server/               # Backend Logic
│   ├── api/              # tRPC Routers
│   ├── db/               # Drizzle Schema
│   └── services/         # Business Logic (The "Service Layer")
```

---

## Deploy in Production

Since this project is fully Dockerized, you can technically host it anywhere (AWS, VPS, DigitalOcean). However, I have strong preferences when it comes to shipping without headaches.

### The "Self-Hosted" Choice: Dokploy
I personally use and love **[Dokploy](https://dokploy.com/)**. It gives you the Heroku/Vercel experience on your own VPS (Hetzner, AWS, etc.), giving you full control over your infrastructure and costs.

If you are not comfortable with setting this up, I wrote a simple, bite-sized article to guide you through it:
👉 **[How to deploy a Compose stack with Dokploy](https://tanguypauvret.me/blog/deploy-a-compose-with-dokploy)**

You can also check the [official Dokploy documentation](https://docs.dokploy.com/), which is crystal clear.

### The "Managed" Choice: Railway
Before switching to self-hosting, I was a heavy user of **[Railway](https://railway.app/)**. It is a good platform that handles everything for you.

While I prefer the full control Dokploy offers today, Railway is a fantastic alternative if you don't want to manage a server at all.
*A tutorial to deploy this boilerplate on Railway is coming soon.*

---

## Standing on the Shoulders of Giants ♥️

This project wouldn't exist without the incredible open-source community. A huge shout-out and thanks to the maintainers of these packages. If you use this boilerplate, please consider starring their repos:

*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
*   **API Layer:** [tRPC v11](https://trpc.io/) (End-to-end type safety)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) & [Drizzle ORM](https://orm.drizzle.team/)
*   **Auth:** [Better-Auth](https://www.better-auth.com/)
*   **Editor:** [PlateJS](https://platejs.org/) (Headless Rich Text)
*   **UI/UX:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
*   **Payments:** [Stripe](https://stripe.com/)
*   **Deployment:** Ready for [Dokploy](https://dokploy.com/)


---

If you like this boilerplate, please consider giving it a star ⭐. It helps me know that this work is valuable to the community!

---

Made with many 🥜
