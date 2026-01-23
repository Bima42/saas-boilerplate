# LLM Context & Technical Documentation

## 1. Project Overview
**Type:** SaaS Boilerplate / Full Stack Application
**Core Framework:** Next.js 15 (App Router)
**Language:** TypeScript (Strict Mode)
**Architecture:** Unified Monolith. Custom Admin Dashboard, Blog, and App logic all run within a single Next.js instance using a shared database and type-safe API.

## 2. Technology Stack

| Category | Technology | Key Details                                        |
| :--- |:--- |:---------------------------------------------------|
| **Framework** | Next.js 15 | App Router, Server Actions, React 19 (RC).         |
| **API Layer** | tRPC v11 | Type-safe client-server communication.             |
| **Database** | PostgreSQL | Single source of truth for App, Auth, and Content. |
| **ORM** | Drizzle ORM | Manages all schemas (`src/server/db`).             |
| **Auth** | Better-Auth | Middleware-based auth, integrated with Drizzle.    |
| **Editor** | PlateJS | Headless rich-text editor. Stores content as JSON. |
| **Storage** | S3 Compatible | AWS S3 / R2 for media uploads.                     |
| **Styling** | Tailwind CSS V4 | Utility-first.                                     |
| **UI Library** | Shadcn/UI | Radix UI primitives.                               |
| **I18n** | next-intl | Internationalization.                              |

---

## 3. Directory Structure & Logic

```text
src/
├── app/
│   ├── (admin)/            # Internal Admin Dashboard (CMS replacement)
│   │   └── admin/          # Post management, analytics, etc.
│   ├── (app)/              # Main SaaS Application (Dashboard, Login)
│   ├── api/                # Next.js API Routes (tRPC, Webhooks, Auth)
│   └── blog/               # Public Blog Routes (SEO optimized)
├── components/
│   ├── admin/              # Admin-specific UI (Tables, Editors)
│   ├── blog/               # Public blog UI (Cards, Viewers)
│   └── editor/             # PlateJS configuration & plugins
├── config/                 # Env vars, locale config
├── lib/                    # Singleton clients (S3, Stripe, Auth, tRPC)
├── server/                 # Backend Logic (Server-Only)
│   ├── api/                # tRPC Routers & Root
│   ├── db/                 # Drizzle Schema & Connection
│   └── services/           # Business Logic (DB interactions)
└── types/                  # Shared Zod schemas and TS types
```

---

## 4. Architecture & Patterns

### A. The "Service Layer" Pattern
**Rule:** API Routers (Controllers) should **never** write raw DB queries.
*   **Bad:** `db.select().from(post)...` inside `post-router.ts`.
*   **Good:** Call `postService.getBySlug(slug)` from `src/server/services/post.ts`.

### B. Content Management (Custom CMS)
We do not use an external CMS. Content is managed via the `(admin)` route group.
*   **Rich Text:** Stored as `jsonb` in Postgres.
*   **Editor:** Uses **PlateJS**.
*   **Rendering:** Use `<PlateViewer value={post.content} />` for display.
*   **Media:** Uploaded to S3 via Presigned URLs or Server Actions, URL stored in DB.

### C. tRPC (API Layer)
*   **Public:** `publicProcedure` (No auth required).
*   **Protected:** `protectedProcedure` (Checks `ctx.session`).
*   **Context:** `ctx` contains `session`, `user`, and `headers`.
*   **Client Usage:** `api.routerName.procedureName.useQuery()` or `.useMutation()`.


### D. Database (Unified)
*   All tables (Auth, App, Blog) live in `src/server/db/schema`.
*   Migrations are handled solely by `drizzle-kit`.

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


### Task: Add a new Blog Feature (e.g., Comments)
1.  **Schema:** Update `src/server/db/schema/blog-schema.ts` to add a `comments` table.
2.  **Migrate:** Run `npm run db:generate` && `npm run db:migrate`.
3.  **Service:** Create `src/server/services/comment.ts` (create, delete, getByPostId).
4.  **Router:** Create `src/server/api/routers/comment-router.ts`.
5.  **UI:** Create components in `src/components/blog/comments/`.

---

## 6. Coding Rules for LLM Generation

1.  **Strict Typing:** No `any`. Use Zod for validation.
2.  **Rich Text Typing:** When handling PlateJS content, cast DB `jsonb` to `Value` (from `platejs`) or `unknown` before passing to components.
3.  **Server/Client Split:**
    *   `'use client'` for interactive components (Forms, Editor, Viewers).
    *   Server Components for fetching data via `trpc.caller`.
4.  **Styling:** Use Tailwind classes. Avoid custom CSS files unless absolutely necessary.
5.  **Environment:** Access env vars via `src/config/env.ts`.
