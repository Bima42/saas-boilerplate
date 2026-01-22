
# LLM Context & Technical Documentation

## 1. Project Overview
**Type:** SaaS Boilerplate / Full Stack Application
**Core Framework:** Next.js 15 (App Router)
**Language:** TypeScript (Strict Mode)
**Architecture:** Monorepo-style structure within a single Next.js app, integrating a Headless CMS (Payload) and a custom Backend (tRPC).

## 2. Technology Stack

| Category | Technology      | Key Details |
| :--- |:----------------| :--- |
| **Framework** | Next.js 15      | App Router, Server Actions, React 19 (RC) |
| **API Layer** | tRPC v11        | Type-safe client-server communication. No REST/GraphQL endpoints manually defined. |
| **Database** | PostgreSQL      | Single instance shared by App and CMS. |
| **ORM** | Drizzle ORM     | Used for App logic (`src/server/db`). |
| **CMS** | Payload CMS 3.0 | Native Next.js integration. Manages its own tables (`src/payload.config.ts`). |
| **Auth** | Better-Auth     | Middleware-based auth. Integrated with Drizzle. |
| **Styling** | Tailwind CSS V4 | Utility-first. |
| **UI Library** | Shadcn/UI       | Radix UI primitives. |
| **Payments** | Stripe          | Webhooks and Checkout Sessions. |
| **I18n** | next-intl       | Internationalization. |

---

## 3. Directory Structure & Logic

```text
src/
├── app/
│   ├── (frontend)/         # Public facing pages & Dashboard
│   │   ├── (app)/          # Main application routes (dashboard, etc.)
│   │   └── (payload)/      # Payload CMS Admin UI routes
│   └── api/                # Next.js API Routes (tRPC, Webhooks, Auth)
├── components/             # Shared UI components (Shadcn)
├── config/                 # Env vars, locale config
├── lib/                    # Singleton clients (Stripe, Auth, tRPC Client)
├── payload_collections/    # Payload CMS Content Definitions
├── server/                 # Backend Logic (Server-Only)
│   ├── api/                # tRPC Routers & Root
│   ├── db/                 # Drizzle Schema & Connection
│   └── services/           # Business Logic (DB interactions)
└── payload.config.ts       # Main CMS Configuration
```

---

## 4. Architecture & Patterns

### A. The "Service Layer" Pattern
**Rule:** API Routers (Controllers) should **never** write raw DB queries.
*   **Bad:** `db.select().from(user)...` inside `router.ts`.
*   **Good:** Call `getUserById(id)` from `src/server/services/user.ts`.

### B. tRPC (API Layer)
*   **Public:** `publicProcedure` (No auth required).
*   **Protected:** `protectedProcedure` (Checks `ctx.session`).
*   **Context:** `ctx` contains `session`, `user`, and `headers`.
*   **Client Usage:** `api.routerName.procedureName.useQuery()` or `.useMutation()`.

### C. Database (Dual Management)
The database is managed by two separate entities:
1.  **App Data (Drizzle):** Tables defined in `src/server/db/schema`. Managed via `drizzle-kit`.
2.  **CMS Data (Payload):** Collections defined in `src/payload_collections`. Managed via Payload's internal migration system.

---

## 5. Development Workflows

### Task: Add a new API Endpoint
1.  **Service:** Write the business logic in `src/server/services/<domain>.ts`.
2.  **Router:** Define the procedure in `src/server/api/routers/<domain>-router.ts`.
    *   Use `zod` for input validation.
    *   Use `protectedProcedure` if user context is needed.
3.  **Register:** Add the router to `src/server/api/root.ts`.
4.  **Frontend:** Call it using `api.<domain>.<procedure>.useQuery()`.

### Task: Modify Database Schema (App)
1.  Edit `src/server/db/schema/<file>.ts`.
2.  Run `npm run db:generate` (Creates SQL migration).
3.  Run `npm run db:migrate` (Applies to DB).
    *   *Dev Shortcut:* `npm run db:push` (Syncs directly, useful for prototyping).

### Task: Add CMS Collection
1.  Create `src/payload_collections/<CollectionName>.ts`.
2.  Define fields (slug, access control, fields).
3.  Import and add to `collections` array in `src/payload.config.ts`.
4.  Payload auto-generates types into `src/payload-types.ts`.

---

## 6. Coding Rules for LLM Generation

1.  **Strict Typing:** No `any`. Use Zod for validation. Use generated types from Drizzle and Payload.
2.  **Server/Client Split:**
    *   Files in `src/server/*` must be imported only by Server Components or API routes.
    *   Use `'use client'` at the top of components using Hooks (React Query, State).
3.  **Styling:** Use Tailwind classes. Avoid custom CSS files unless absolutely necessary.
4.  **Async/Await:** Always handle Promises properly.
5.  **Environment:** Access env vars via `src/config/env.ts`, not `process.env`.

## 7. Key File References
*   **Router Example:** `src/server/api/routers/stripe-router.ts`
*   **Schema Example:** `src/server/db/schema/auth-schema.ts`
*   **Service Example:** `src/server/services/purchase.ts`
